import React from 'react';
import { StandardArticle } from '../services/types';

interface NewsCardProps {
  article: StandardArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden shadow-lg transition-colors">
      <div className="bg-gray-600 font-bold text-white p-2 flex justify-between items-center text-sm">
        <div>
          <span title={`Source: ${article.source}`}>{article.source}</span>
        </div>
        <div className=" max-w-2/3 truncate">
          {article.author && (
            <span title={`Author: ${article.author}`}>By {article.author}</span>
          )}
        </div>
      </div>

      {article && (
        <img
          src={article.imageUrl || ''}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {article.title}
        </h2>
        {article.summary && (
          <p className="text-gray-600 dark:text-gray-300">{article.summary}</p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary-light dark:bg-primary-dark text-black rounded hover:opacity-90 transition-opacity"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};
