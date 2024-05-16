"use client";
import React from 'react';
import type { Article } from "~/types/type";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ArticleAreaProps {
  articles: Article[];
}

const ArticleArea: React.FC<ArticleAreaProps> = ({ articles }) => {
  return (
    <div className="container mx-auto px-5">
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
        </div>
      </div>
    </div>
  );
};

export default ArticleArea;