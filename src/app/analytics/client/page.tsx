"use client"
import React from 'react'
import AnalyticsModal from '~/app/_components/analyticsModal';
import { useAuth } from '~/app/_contexts/authProvider';
import { useEffect, useState } from 'react';

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (answers: string) => {
    console.log("Submitting survey data:", answers);    
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);
  return (
    <div>
      <AnalyticsModal 
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onSubmit={(answers) => handleModalSubmit(answers)}
      />
    </div>
  )
}

export default Page;