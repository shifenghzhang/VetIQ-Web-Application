"use client"
import React from 'react'
import AnalyticsModal from '~/app/_components/analyticsModal';
import { useAuth } from '~/app/_contexts/authProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface MongoUsers {
  consulting_vet: boolean;
  email: string | null;
  password: string;
  site_id: number;
  user_id: number;
  user_name: string | null;
  analytics_service_survey?: string; // Optional property
}
interface PostResponse {
  message: string;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasCheckedSurveyStatus, setHasCheckedSurveyStatus] = useState(false);
  const {user} = useAuth();


  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const checkSurveyStatus = async () => {
      try {
        if (!user) {
          return;
        }        
        const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users');
        const currentUser = response.data.find(mongo_user => mongo_user.user_id === user.user_id);
        
        if (currentUser && !currentUser.analytics_service_survey) {
          console.log("Survey not taken yet. Setting timer to show modal.");
          const timer = setTimeout(() => {
            setIsModalOpen(true);
          }, 2000);

          return () => clearTimeout(timer);
        } else {
        }
      } catch (error) {
        console.error("Error checking survey status:", error);
      } finally {
        setHasCheckedSurveyStatus(true);
      }
    };

    if (user && !hasCheckedSurveyStatus) {
      void checkSurveyStatus();
    }
  }, [user, hasCheckedSurveyStatus]);

  useEffect(() => {
    if (user) {
      setHasCheckedSurveyStatus(false);
    }
  }, [user]);

  const handleModalSubmit = async (answers: string) => {
    console.log("Submitting survey data:", answers);

    try {
      const postResponse = await axios.post<PostResponse>('http://127.0.0.1:5000/api/add_analytics_service_survey', {
        user_id: user?.user_id,
        new_data: answers
      });

      if (postResponse.status === 200) {
        console.log("Survey data submitted successfully: ", postResponse.data)
      }
      else {
        console.log("Failed to submit survey data");
      }      
    }
    catch(error) {
      console.error("Error submitting survey data:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      {user &&
        <AnalyticsModal 
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={(answers) => handleModalSubmit(answers)}
        />
      }
      
    </div>
  )
}

export default Page;