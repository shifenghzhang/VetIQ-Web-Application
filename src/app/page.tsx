// pages/app/home/page.tsx
"use client"
import React from 'react';
import HeroSection from "~/app/_components/hero-section";
import {Article} from "~/types/type";
import ArticleArea from "~/app/_components/articleArea";
import Testimonial from './_components/testimonial';


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
    return (
        <main>
          <HeroSection />
          <ArticleArea articles={articles}/>
          <Testimonial />
        </main>
    );

}