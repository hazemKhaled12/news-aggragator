import { API_KEYS } from '../../config/api';
import { NEWS_SOURCES } from '../constants';
import { StandardNewsFilters } from '../types';
import { NYTArticle } from './types';

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
  source: NEWS_SOURCES.NYT,
});

export const nytApiFiltersAdapter = (
  filters: StandardNewsFilters,
  page: number
) => {
  const { keyword, startDate, endDate, category } = filters;

  return {
    'api-key': API_KEYS.NYT_API,
    q: keyword || '',
    fq: category ? `news_desk:(${category})` : undefined,
    begin_date: startDate?.replace(/-/g, ''),
    end_date: endDate?.replace(/-/g, ''),
    page: page - 1, // NYT API is 0-based
  };
};
