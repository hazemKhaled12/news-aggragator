import { DEFAULT_PARAMS } from '../constants';
import { StandardNewsFilters } from '../types';
import { GuardianArticle } from './types';

export const guardianApiAdapter = (article: GuardianArticle) => {
  return {
    id: article.id,
    title: article.webTitle,
    summary: article.fields?.trailText || null,
    imageUrl: article.fields?.thumbnail || null,
    url: article.webUrl,

    author: article.fields?.byline || null,
    categories: article.sectionName ? [article.sectionName] : [],
    publishedAt: article.webPublicationDate,
    source: 'The Guardian' as const,
  };
};

export const guardianApiFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
) => {
  const { keyword, startDate, endDate, category } = filters;

  const params: Record<string, string | number> = {
    'page-size': DEFAULT_PARAMS.pageSize,
    'show-fields': 'all',
    'order-by': 'newest',
    page,
  };

  if (keyword) params.q = keyword;
  if (category) params.section = category;
  if (startDate) params['from-date'] = startDate;
  if (endDate) params['to-date'] = endDate;

  return params;
};
