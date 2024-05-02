// pages/app/home/page.tsx
import React from 'react';
import {Article} from "~/types/type";
import ArticleArea from "~/app/_components/articleArea";


const articles: Article[] = [
  {
    id: 1,
    title: 'Leveraging Intelligent Data Analysis for Veterinary Excellence with VetIQ',
    summary: [
    'VetIQ, powered by Curious Cat, revolutionizes veterinary practice management',
    'Transforms complex data into intelligent, actionable insights',
    'Goes beyond traditional data analysis, focusing on delivering precise information',
    'Fosters tangible growth and operational excellence',
    'Embrace VetIQ data-driven solutions to make informed decisions',
    'Enhances both clinical services and client satisfaction',
    ],
  },
  {
    id: 2,
    title: 'Advanced Analytics Transcending Traditional Approaches',
    summary: [
    'Traditional data analysis in veterinary practices often involves manual sifting through extensive reports',
    'Struggles to derive meaningful insights',
    'VetIQ transforms this process with its state-of-the-art analytics engine',
    'Provides veterinarians with intuitive and actionable insights',
    'Enables a proactive approach focused on strategic growth and operational efficiency',
    ],
  },
    {
      id: 3,
      title: 'Client Engagement',
      summary: [
      'VetIQ helps you understand your clients better',
      'Provides insights into client loyalty, client acquisition, and client retention',
      'Helps you identify opportunities to improve client engagement and satisfaction',
      ],
    },
    {
      id: 4,
      title: 'Empowering Veterinarians with Data-Driven Decisions',
      summary: [
      'VetIQ is about empowering veterinarians with the knowledge they need to make enlightened business decisions',
      'The platform\'s sophisticated analytics cut through the noise',
      'Highlights opportunities and pinpoints areas in need of attention',
      'Provides insights for optimizing drug inventories, adjusting pricing strategies, or enhancing patient care protocols',
      'Enables well-informed decision making',
      ],
    },
    {
      id: 5,
      title: 'Business Performance',
      summary: [
      'VetIQ helps you optimize your business performance',
      'Provides insights into your financial performance, operational efficiency, and strategic growth',
      'Helps you identify opportunities to improve your business and achieve your goals',
      ],
    }
];
export default function Home() {
    return (
        <main>
        <ArticleArea articles={articles}/>
        </main>
    );

}




