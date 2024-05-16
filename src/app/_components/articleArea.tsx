"use client"
import React from 'react';
import type { Article } from "~/types/type";

interface ArticleAreaProps {
  articles: Article[];
}

const ArticleArea: React.FC<ArticleAreaProps> = ({ articles }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(0,2).map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h3>
            {Array.isArray(article.summary) ? (
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {article.summary.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{article.summary}</p>
            )}
          </div>
        ))}
      </div>

      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.slice(2).map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h3>
            {Array.isArray(article.summary) ? (
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {article.summary.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{article.summary}</p>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ArticleArea;