import React from 'react';
import { useNewsFeeds } from './hooks/useNewsSearch';
import { useNewsFilters } from './hooks/useNewsFilters';
import { NewsFilters } from './components/NewsFilters';
import { Pagination } from '../../components/common/CPagination';
import { NewsCardSkeletonGrid } from '../../components/blocks/NewsCardSkeleton';

import { DEFAULT_PARAMS } from './constants';
import { NewsList } from './components/NewsList';
import { EmptyView } from '../../components/common/CEmptyView/CEmptyView';

export const NewsSearch: React.FC = () => {
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

      {!filters?.keyword && SearchFieldRequired()}
      {isLoading && <NewsCardSkeletonGrid />}
      {error && <div className="text-red-500 p-4">Error loading news</div>}

      {!isLoading && !error && filters?.keyword && (
        <>
          {articles.length === 0 && (
            <EmptyView
              title="No articles found"
              description="Try adjusting your filters"
            />
          )}

          <NewsList articles={articles} />
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

function SearchFieldRequired(): React.ReactNode {
  return (
    <div className="text-center text-gray-500 py-8">
      Enter Keyworkd to start seeing data
    </div>
  );
}
