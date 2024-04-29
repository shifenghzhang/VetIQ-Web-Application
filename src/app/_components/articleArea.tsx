// components/articleArea.tsx
import React from 'react';
import type {Article} from "~/types/type";

interface ArticleAreaProps {
    articles: Article[];
}

const ArticleArea: React.FC<ArticleAreaProps> = ({ articles }) => {
    return (
        <div className="space-y-8">
            {articles.map((article) => (
                <div key={article.id} className="bg-white shadow-lg rounded-lg p-6 m-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h3>
                    <p className="text-gray-600">{article.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default ArticleArea;
