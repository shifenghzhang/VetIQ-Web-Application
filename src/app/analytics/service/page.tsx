"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Select from 'react-select';
import { clinicOptions, yearOptions, handleClinicChange, handleYearChange } from '../../_components/DropdownOptions';
import { type Option } from '../../_components/DropdownOptions';
import { LoadDonutChart_DataPoint1, LoadBarChart_DataPoint2, LoadPieChart_DataPoint3, 
          LoadServiceRevenue, LoadServiceRevenueWOConsultation, LoadTopServices } from './LoadData'; // Import charts or other data
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
  const [selectedClinic, setSelectedClinic] = useState<number[]>([]); 
  const [selectedYear, setSelectedYear] = useState<number[]>([]);
    
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

  //Dropdown menu
  return (
    <div className="dashboard-container">
      <div className="flex items-center mb-4 w-full max-w-xl"> 
        <Select //Create dropdown menu for selecting clinic
          isMulti
          options={clinicOptions}
          className="mr-3.5 w-full"
          placeholder="Select Clinic"
          onChange={(selectedOptions) => setSelectedClinic(handleClinicChange(selectedOptions as Option[]))}
          value={selectedClinic.map(value => clinicOptions.find(option => option.value === value))}
        />
        <Select //Create dropdown menu for selecting year
          isMulti
          options={yearOptions}
          className="mr-3.5 w-full"
          placeholder="Select Year"
          onChange={(selectedOptions) => setSelectedYear(handleYearChange(selectedOptions as Option[]))}
          value={selectedYear.map(value => yearOptions.find(option => option.value === value))}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4.75}>
          <Box sx={{ height: '125px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Total Revenue From Services
            </Typography>
            <LoadServiceRevenue selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4.75}>
          <Box sx={{ height: '125px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Revenue From Services (Excluding Consultation)
            </Typography>
            <LoadServiceRevenueWOConsultation selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9.5}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Revenue from Services
                </Typography>
                <LoadBarChart_DataPoint2 selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Top Services Contribution
                </Typography>
                <LoadTopServices selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '420px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Percentage of services contributed to the revenue
            </Typography>
            <LoadPieChart_DataPoint3 selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '420px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Percentage of services used
            </Typography>
            <LoadDonutChart_DataPoint1 selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
      </Grid>
    </div>
    <div>
      {user &&
        <AnalyticsModal 
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={(answers) => handleModalSubmit(answers)}
        />
      }      
    </div>
  );
}

export default Page;