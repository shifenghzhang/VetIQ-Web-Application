"use client"
import React from 'react';
import HeroSection from "~/app/_components/hero-section";
import {Article} from "~/types/type";
import ArticleArea from "~/app/_components/articleArea";
import CTA from './_components/CTA';
import Testimonial from './_components/testimonial';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from './_components/customModal';


const articles: Article[] = [
  {
    id: 1,
    title: 'Leveraging Intelligent Data Analysis for Veterinary Excellence with VetIQ',
    summary: 'VetIQ by Curious Cat transforms veterinary practice management with smart data analysis, providing actionable insights for growth and operational excellence. Make informed decisions to improve clinical services and client satisfaction.',
  },
  {
    id: 2,
    title: 'Advanced Analytics Transcending Traditional Approaches',
    summary: 'VetIQ streamlines data analysis in veterinary practices, replacing manual efforts with a cutting-edge analytics engine. Veterinarians gain intuitive insights, enabling a shift from reactive to proactive strategies for growth and efficiency.',
  },
    {
      id: 3,
      title: 'Client Engagement',
      summary: 'VetIQ enhances client understanding by offering insights into loyalty, acquisition, and retention. Identify opportunities for better engagement and satisfaction.',
    },
    {
      id: 4,
      title: 'Empowering Veterinarians with Data-Driven Decisions',
      summary: 'VetIQ empowers veterinarians with actionable insights for informed business decisions. Its advanced analytics identify opportunities and areas for improvement, from drug inventories to pricing and patient care protocols.',
    },
    {
      id: 5,
      title: 'Business Performance',
      summary: 'VetIQ optimizes business performance with insights on finances, operations, and growth. Identify opportunities for improvement and achieve your goals.',
    }
];
export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (answer: string) => {

    setIsModalOpen(false);
  };
  
    return (
        <main>
          <HeroSection />
          <ArticleArea articles={articles}/>
          <CTA />
          <Testimonial />
          <CustomModal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />
        </main>
    );

}
