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
    <div className="container mx-auto">
      <div style={{ position: 'relative' }}>
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={4000}
          renderArrowPrev={(clickHandler: () => void, hasPrev: boolean, labelPrev: string) =>
            hasPrev && (
              <button
                type="button"
                onClick={clickHandler}
                title={labelPrev}
                className="custom-arrow custom-arrow-prev"
              >
                <span className="arrow-icon">{"<"}</span>
              </button>
            )
          }
          renderArrowNext={(clickHandler: () => void, hasNext: boolean, labelNext: string) =>
            hasNext && (
              <button
                type="button"
                onClick={clickHandler}
                title={labelNext}
                className="custom-arrow custom-arrow-next"
              >
                <span className="arrow-icon">{">"}</span>
              </button>
            )
          }
          renderIndicator={(onClickHandler: (e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void, isSelected: boolean, index: number) => (
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
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Slide ${index + 1}`}
            />
          )}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg p-6"
              style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px 40px', // Adjust padding for consistent spacing
                margin: '0 30px',     // Adjust margin for consistent spacing
              }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h3>
              {Array.isArray(article.summary) ? (
                <ul className="text-gray-600">
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
      </div>
    </div>
  );
};

export default ArticleArea;
