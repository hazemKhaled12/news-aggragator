import { DEFAULT_PARAMS, NEWS_SOURCES } from '../constants';
import { StandardNewsFilters } from '../types';
import { GuardianArticle } from './types';

const mapCategoriesToGuardian = (categories: string[]): string[] => {
  const categoryMap: Record<string, string> = {
    business: 'business',
    entertainment: 'culture',
    general: 'news',
    health: 'society',
    science: 'science',
    sports: 'sport',
    technology: 'technology',
  };

  return categories.map(
    (category) => categoryMap[category.toLowerCase()] || category
  );
};

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
    source: NEWS_SOURCES[1],
  };
};

export const guardianApiFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
) => {
  const { keyword, startDate, endDate, categories } = filters;
  const guardianCategories = mapCategoriesToGuardian(categories);

  const params: Record<string, string | number> = {
    'page-size': DEFAULT_PARAMS.pageSize,
    'show-fields': 'all',
    'order-by': 'newest',
    page,
  };

  if (keyword) params.q = keyword;
  if (guardianCategories.length > 0) params.section = guardianCategories[0];
  if (startDate) params['from-date'] = startDate;
  if (endDate) params['to-date'] = endDate;

  return params;
};
