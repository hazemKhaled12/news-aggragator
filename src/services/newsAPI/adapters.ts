import { DEFAULT_PARAMS } from '../constants';
import { StandardArticle, StandardNewsFilters } from '../types';
import { NewsResponse, HeadlineFilters } from './types';

export const newsApiAdapter = (
  article: NewsResponse['articles'][0]
): StandardArticle => {
  return {
    id: article.url, // NewsAPI doesn't provide unique IDs, using URL as fallback
    title: article.title,
    summary: article.description,
    imageUrl: article.urlToImage,
    url: article.url,

    author: article.author,
    categories: article.source.name ? [article.source.name] : [],
    publishedAt: article.publishedAt,
    source: 'NewsAPI',
  };
};

export const newsApiFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
) => {
  const { keyword, startDate, endDate, category } = filters;

  const params: Record<string, string | number> = {
    page,
    pageSize: DEFAULT_PARAMS.pageSize,
    language: 'en',
  };

  if (keyword) params.q = keyword;
  if (category) params.category = category;
  if (startDate) params.from = startDate;
  if (endDate) params.to = endDate;

  return params;
};

export const newsApiHeadlinesFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
): HeadlineFilters & { page: number; pageSize: number } => {
  const { keyword, category } = filters;

  const params: HeadlineFilters & { page: number; pageSize: number } = {
    page,
    pageSize: DEFAULT_PARAMS.pageSize,
  };

  // For headlines, we default to 'us' if no specific country is set
  params.country = 'us';

  if (keyword) params.q = keyword;
  if (category) params.category = category.toLowerCase();

  return params;
};
