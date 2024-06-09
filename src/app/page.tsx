"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from './_components/customModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (answer: string) => {


    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Users</h1>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />


    </div>
  );
};

export default Home;
