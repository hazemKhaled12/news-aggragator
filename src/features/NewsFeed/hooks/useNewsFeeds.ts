import { useQueries } from '@tanstack/react-query';
import { preferencesService } from '../services/preferences';
import { Article, NewsFilters, NewsResponse } from '../services/newsAPI/types';
import { StandardArticle } from '../services/types';
import { fetchNewsArticles } from '../services/newsAPI/news-api';
import { fetchNYTArticles } from '../services/nyt-api';
import { fetchGuardianArticles } from '../services/guardianAPI/guardian-api';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const RETRY_DELAY = 1000; // 1 second

export const useNewsFeeds = (filters: NewsFilters, currentPage: number) => {
  const preferences = preferencesService.getPreferences();
  const { keyword, source } = filters;
  console.log(keyword, source);
  const results = useQueries({
    queries: [
      {
        queryKey: ['newsApi', filters, currentPage],
        queryFn: () => fetchNewsArticles(filters, currentPage),
        enabled:
          (filters.source === 'NewsAPI' || !filters.source) &&
          !!filters.keyword &&
          filters.keyword !== '',
        staleTime: STALE_TIME,
        retryDelay: RETRY_DELAY,
      },
      // {
      //   queryKey: ['nyt', filters, currentPage],
      //   queryFn: () => fetchNYTArticles(filters, currentPage),
      //   enabled: !filters.source || filters.source === 'The New York Times',
      //   staleTime: STALE_TIME,
      //   retryDelay: RETRY_DELAY,
      // },
      {
        queryKey: ['guardian', filters, currentPage],
        queryFn: () => fetchGuardianArticles(filters, currentPage),
        enabled: !filters.source || filters.source === 'The Guardian',
        staleTime: STALE_TIME,
        retryDelay: RETRY_DELAY,
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

  // Apply user preferences filtering
  const filteredArticles = articles.filter((article) => {
    const { preferredSources, preferredAuthors } = preferences;

    const matchesSource =
      preferredSources.length === 0 ||
      preferredSources.includes(article.source);

    const matchesAuthor =
      preferredAuthors.length === 0 ||
      (article.author && preferredAuthors.includes(article.author));

    return matchesSource && matchesAuthor;
  });

  const totalResults = results.reduce((acc, result) => {
    return acc + (result.data?.totalResults || 0);
  }, 0);

  return {
    articles: filteredArticles,
    totalResults,
    isLoading,
    error,
    isError: !!error,
  };
};
