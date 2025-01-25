import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from '../../../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from '../types';
import { DEFAULT_PARAMS } from '../../constants';
import { handleAPIError } from '../api-error';
import { NewsResponse } from './types';

const newsApiClient = axios.create({
  baseURL: API_ENDPOINTS.NEWS_API,
  params: {
    apiKey: API_KEYS.NEWS_API,
  },
});

export const fetchNewsArticles = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  const { keyword, startDate, endDate, category } = filters;

  const params = {
    q: keyword,
    category,
    from: startDate,
    to: endDate,
    page,
    pageSize: DEFAULT_PARAMS.pageSize,
    language: 'en',
  };

  const response = await newsApiClient.get<NewsResponse>('/everything', {
    params,
  });

  const articles = response.data.articles.map((article) => ({
    id: article.url, // NewsAPI doesn't provide unique IDs, using URL as fallback
    title: article.title,
    summary: article.description,
    imageUrl: article.urlToImage,
    url: article.url,
    author: article.author,
    categories: article.source.name ? [article.source.name] : [],
    publishedAt: article.publishedAt,
    source: 'NewsAPI',
  }));

  return {
    articles,
    totalResults: response.data.totalResults,
    currentPage: page,
  };
};
