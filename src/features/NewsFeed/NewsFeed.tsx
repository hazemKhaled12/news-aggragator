import React from 'react';
import { useNewsFeeds } from './hooks/useNewsFeeds';
import { useNewsFilters } from './hooks/useNewsFilters';
import { NewsFilters } from './components/NewsFilters';
import { NewsCard } from './components/NewsCard';
import { Pagination } from './components/Pagination';
import { NewsCardSkeletonGrid } from './components/NewsCardSkeleton';

import { UserPreferences } from './components/UserPreferences';
import { DEFAULT_PARAMS } from './constants';

export const NewsFeed: React.FC = () => {
  const { filters, currentPage, setCurrentPage, updateFilters, resetFilters } =
    useNewsFilters();

  const { articles, totalResults, isLoading, error } = useNewsFeeds(
    filters,
    currentPage
  );

  return (
    <div className="container mx-auto px-4">
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
      {/* <div className="lg:col-span-3"> */}
      <div className="mb-6">
        <NewsFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onReset={resetFilters}
        />
      </div>

      {!filters?.keyword && (
        <div className="text-center text-gray-500 py-8">
          Enter Keyworkd to start seeing data
        </div>
      )}
      {isLoading && <NewsCardSkeletonGrid />}
      {error && <div className="text-red-500 p-4">Error loading news</div>}

      {!isLoading && !error && filters?.keyword && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No articles found. Try adjusting your filters.
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            pageSize={DEFAULT_PARAMS.pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
    /* <div className="lg:col-span-1">
          <UserPreferences />
        </div> */
    //   </div>
    // </div>
  );
};
