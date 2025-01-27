import React from 'react';
import { useNewsFeeds } from './hooks/useNewsFeed';
import { useNewsFilters } from './hooks/useNewsFilters';
import { Pagination } from '../../components/common/CPagination';
import { EmptyView } from '../../components/common/CEmptyView/CEmptyView';
import { NewsCardSkeletonGrid } from '../../components/blocks/NewsCardSkeleton';
import { DEFAULT_PARAMS } from '../../services/constants';
import { NewsList } from './components/NewsList';

export const NewsFeed: React.FC = () => {
  const { filters, currentPage, setCurrentPage } = useNewsFilters();
  const { articles, totalResults, isLoading, error } = useNewsFeeds(
    filters,
    currentPage
  );

  return (
    <div className="container mx-auto px-4">
      {isLoading && <NewsCardSkeletonGrid />}
      {error && <div className="text-red-500 p-4">Error loading news</div>}

      {!isLoading && !error && (
        <>
          {articles.length === 0 && (
            <EmptyView
              title="No articles found"
              description="Try adjusting your Preferences"
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
  );
};
