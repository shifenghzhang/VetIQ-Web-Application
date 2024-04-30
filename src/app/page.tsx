// pages/app/home/page.tsx
import React from 'react';
import {Article} from "~/types/type";
import ArticleArea from "~/app/_components/articleArea";


const articles: Article[] = [
  {
    id: 1,
    title: 'Leveraging Intelligent Data Analysis for Veterinary Excellence with VetIQ',
    summary: 'VetIQ, powered by Curious Cat, revolutionizes veterinary practice management by transforming complex data into intelligent, actionable insights. This advanced platform goes beyond traditional data analysis, focusing on delivering precise information that fosters tangible growth and operational excellence. Embrace VetIQ data-driven solutions to make informed decisions that enhance both clinical services and client satisfaction.',
  },
  {
    id: 2,
    title: 'Advanced Analytics Transcending Traditional Approaches',
    summary: 'Traditional data analysis in veterinary practices often involves manually sifting through extensive reports and struggling to derive meaningful insights. VetIQ transforms this process with its state-of-the-art analytics engine, providing veterinarians with intuitive and actionable insights. This shift means that veterinary businesses can move away from reactive measures and embrace a proactive approach focused on strategic growth and operational efficiency.',
  },
    {
      id: 3,
      title: 'Client Engagement',
      summary: 'VetIQ helps you understand your clients better. Our platform provides insights into client loyalty, client acquisition, and client retention. We help you identify opportunities to improve client engagement and satisfaction.',
    },
    {
      id: 4,
      title: 'Empowering Veterinarians with Data-Driven Decisions',
      summary: 'At its core, VetIQ is about empowering veterinarians with the knowledge they need to make enlightened business decisions. The platform\'s sophisticated analytics cut through the noise, highlighting opportunities and pinpointing areas in need of attention. Whether it\'s optimizing drug inventories, adjusting pricing strategies, or enhancing patient care protocols, VetIQ provides the insights needed to make well-informed decisions.',
    },
    {
      id: 5,
      title: 'Business Performance',
      summary: 'VetIQ helps you optimize your business performance. Our platform provides insights into your financial performance, operational efficiency, and strategic growth. We help you identify opportunities to improve your business and achieve your goals.',
    }
];

const HomePage: React.FC = () => {
  return (
      <main>
          <ArticleArea articles={articles} />
      </main>
  )
}


