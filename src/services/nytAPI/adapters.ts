import { API_KEYS } from '../../config/api';
import { NEWS_SOURCES } from '../constants';
import { StandardNewsFilters } from '../types';
import { NYTArticle } from './types';

const mapCategoriesToNYT = (categories: string[]): string[] => {
  const categoryMap: Record<string, string> = {
    business: 'Business',
    entertainment: 'Arts',
    general: 'General',
    health: 'Health',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technology',
  };

  return categories.map((category) => categoryMap[category] || category);
};

export const nytApiAdapter = (article: NYTArticle) => ({
  id: article._id,
  title: article.headline.main,
  summary: article.abstract,
  url: article.web_url,
  imageUrl: article.multimedia?.[0]?.url
    ? `https://www.nytimes.com/${article.multimedia[0].url}`
    : null,
  author: article.byline?.original || null,
  categories: [article.news_desk].filter(Boolean),
  publishedAt: article.pub_date,
  source: NEWS_SOURCES[0],
});

export const nytApiFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
) => {
  const { keyword, startDate, endDate, categories } = filters;
  const nytCategories = mapCategoriesToNYT(categories);

  return {
    'api-key': API_KEYS.NYT_API,
    ...(keyword && { q: keyword }),
    ...(nytCategories.length > 0 && {
      fq: `news_desk:(${nytCategories.join(' OR ')})`,
    }),
    ...(startDate && { begin_date: startDate.replace(/-/g, '') }),
    ...(endDate && { end_date: endDate.replace(/-/g, '') }),
    page: page - 1,
  };
};
