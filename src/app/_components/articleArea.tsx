"use client"
import React from 'react';
import type { Article } from "~/types/type";

interface ArticleAreaProps {
  articles: Article[];
}

const ArticleArea: React.FC<ArticleAreaProps> = ({ articles }) => {

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(0,2).map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg p-6">
=======
    <div style={{ position: 'relative' }}>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={false}
        interval={5000}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li
              style={{
                backgroundColor: isSelected ? '#000' : '#ccc',
                width: '30px',
                height: '4px',
                borderRadius: '2px',
                margin: '0 4px',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Slide ${index + 1}`}
            />
          );
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-lg rounded-lg p-6"
            style={{
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
>>>>>>> parent of 0b60f9e (fixed carousel to fit width)
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
<<<<<<< HEAD
=======
      </Carousel>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={true}
          infiniteLoop={true}
          selectedItem={0}
          onChange={() => {}}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            return (
              <li
                style={{
                  backgroundColor: isSelected ? '#000' : '#ccc',
                  width: '30px',
                  height: '4px',
                  borderRadius: '2px',
                  margin: '0 4px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`Slide ${index + 1}`}
              />
            );
          }}
        >
          {articles.map((_, index) => (
            <div key={index}></div>
          ))}
        </Carousel>
>>>>>>> parent of 0b60f9e (fixed carousel to fit width)
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