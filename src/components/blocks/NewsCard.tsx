import React from 'react';
import { StandardArticle } from '../services/types';
import newsPlaceholder from '@/assets/newsPlaceholder.jpg';

interface NewsCardProps {
  article: StandardArticle;
}

const CardHeader = ({ article }: { article: StandardArticle }) => {
  return (
    <div className="bg-gray-600 font-bold p-2 flex flex-col items-start text-sm gap-1">
      <div className="whitespace-nowrap truncate text-xs text-gray-200 px-2 py-1 rounded-md bg-gray-700">
        <span title={`Source: ${article.source}`}>{article.source}</span>
      </div>
    </div>
  );
};

const CardContent: React.FC<{ article: StandardArticle }> = ({ article }) => {
  const byline = article.author
    ? `${article.source !== 'The New York Times' ? 'By' : ''} ${article.author}`
    : '';
  return (
    <>
      <img
        src={article.imageUrl || newsPlaceholder}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {article.author && (
          <div className="max-w-2/3 whitespace-nowrap truncate text-xs text-gray-400 ">
            <span title={`Author: ${article.author}`}>{byline}</span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h2>
        {article.summary && (
          <p className="text-gray-600 dark:text-gray-300 max-h-42 overflow-hidden">
            {article.summary}
          </p>
        )}
      </div>
    </>
  );
};

const CardFooter: React.FC<{ url: string | undefined }> = ({ url }) => {
  if (!url) return null;

  return (
    <div className="pb-4 py-4 pt-0 flex justify-end">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 bg-primary-light dark:bg-primary-dark text-blue-800 rounded hover:opacity-90 transition-opacity"
      >
        Read more →
      </a>
    </div>
  );
};

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-colors">
      <div className="">
        <CardHeader article={article} />
        <CardContent article={article} />
      </div>
      <CardFooter url={article.url} />
    </div>
  );
};
