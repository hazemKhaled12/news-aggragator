import { useQueries } from '@tanstack/react-query';
import { NewsFilters } from '../../../services/newsAPI/types';
import { StandardArticle } from '../../../services/types';
import {
  fetchNewsArticles,
  fetchNewsHeadLines,
} from '../../../services/newsAPI/news-api';
import { fetchNYTArticles } from '../../../services/nytAPI/nyt-api';
import { fetchGuardianArticles } from '../../../services/guardianAPI/guardian-api';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const useNewsFeeds = (filters: NewsFilters, currentPage: number) => {
  // Source filters
  const allSources = filters.sources.length === 0;
  const NewsAPISource = filters.sources.includes('NewsAPI');
  const NYTSource = filters.sources.includes('The New York Times');
  const GuardianSource = filters.sources.includes('The Guardian');

  // Keyword and Category filters

  const hasCategory = filters.categories && filters.categories.length > 0;

  const isMinStartDateLessThanOneMonthAgo =
    filters.startDate &&
    new Date(filters.startDate) >=
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Enabled queries
  const enabledNewsApi = !!(
    (allSources || NewsAPISource) &&
    !hasCategory &&
    (isMinStartDateLessThanOneMonthAgo || !filters.startDate)
  );
  const enabledNYT = !!((allSources || NYTSource) && !hasCategory);
  const enabledGuardian = !!(allSources || GuardianSource);

  const results = useQueries({
    queries: [
      {
        queryKey: ['newsApi', filters, currentPage],
        queryFn: () => fetchNewsHeadLines(filters, currentPage),
        enabled: enabledNewsApi,
        staleTime: STALE_TIME,
      },
      {
        queryKey: ['nyt', filters, currentPage],
        queryFn: () => fetchNYTArticles(filters, currentPage),
        enabled: enabledNYT,
        staleTime: STALE_TIME,
      },
      {
        queryKey: ['guardian', filters, currentPage],
        queryFn: () => fetchGuardianArticles(filters, currentPage),
        enabled: enabledGuardian,
        staleTime: STALE_TIME,
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const error = results.find((result) => result.error)?.error;

  const articles = results.reduce<StandardArticle[]>((acc, result) => {
    if (result.data?.articles) {
      return [...acc, ...result.data.articles];
    }
    return acc;
  }, []);

  const totalResults = results.reduce((acc, result) => {
    return acc + (result.data?.totalResults || 0);
  }, 0);

  return {
    articles,
    totalResults,
    isLoading,
    error,
    isError: !!error,
  };
};
