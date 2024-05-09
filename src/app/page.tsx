// pages/app/home/page.tsx
"use client"
import React from 'react';
import HeroSection from "~/app/_components/hero-section";
import Image from 'public/images/iStock-1224227548.jpg';
import {Article} from "~/types/type";
import ArticleArea from "~/app/_components/articleArea";


const articles: Article[] = [
  {
    id: 1,
    title: 'Leveraging Intelligent Data Analysis for Veterinary Excellence with VetIQ',
    summary: [
    'VetIQ, powered by Curious Cat, revolutionizes veterinary practice management\n',
    'Transforms complex data into intelligent, actionable insights\n',
    'Goes beyond traditional data analysis, focusing on delivering precise information\n',
    'Fosters tangible growth and operational excellence\n',
    'Embrace VetIQ data-driven solutions to make informed decisions\n',
    'Enhances both clinical services and client satisfaction\n',
    ],
  },
  {
    id: 2,
    title: 'Advanced Analytics Transcending Traditional Approaches',
    summary: [
    'Traditional data analysis in veterinary practices often involves manual sifting through extensive reports\n',
    'Struggles to derive meaningful insights\n',
    'VetIQ transforms this process with its state-of-the-art analytics engine\n',
    'Provides veterinarians with intuitive and actionable insights\n',
    'Enables a proactive approach focused on strategic growth and operational efficiency\n',
    ],
  },
    {
      id: 3,
      title: 'Client Engagement',
      summary: [
      'VetIQ helps you understand your clients better\n',
      'Provides insights into client loyalty, client acquisition, and client retention\n',
      'Helps you identify opportunities to improve client engagement and satisfaction\n',
      ],
    },
    {
      id: 4,
      title: 'Empowering Veterinarians with Data-Driven Decisions',
      summary: [
      'VetIQ is about empowering veterinarians with the knowledge they need to make enlightened business decisions\n',
      'The platform\'s sophisticated analytics cut through the noise\n',
      'Highlights opportunities and pinpoints areas in need of attention\n',
      'Provides insights for optimizing drug inventories, adjusting pricing strategies, or enhancing patient care protocols\n',
      'Enables well-informed decision making\n',
      ],
    },
    {
      id: 5,
      title: 'Business Performance',
      summary: [
      'VetIQ helps you optimize your business performance\n',
      'Provides insights into your financial performance, operational efficiency, and strategic growth\n',
      'Helps you identify opportunities to improve your business and achieve your goals\n',
      ],
    }
];
export default function Home() {
    return (
        <main>
         <HeroSection />
        <ArticleArea articles={articles}/>
        </main>
    );

}




