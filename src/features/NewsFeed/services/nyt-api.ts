import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from '../../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from './types';
import { DEFAULT_PARAMS } from '../constants';
import { handleAPIError } from './api-error';

const nytApiClient = axios.create({
  baseURL: API_ENDPOINTS.NYT_API,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
});

export const fetchNYTArticles = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  try {
    const { keyword, startDate, endDate, category } = filters;

    const params = {
      'api-key': API_KEYS.NYT_API,
      q: keyword,
      fq: category ? `news_desk:(${category})` : undefined,
      begin_date: startDate?.replace(/-/g, ''),
      end_date: endDate?.replace(/-/g, ''),
      page: page - 1, // NYT API is 0-based
    };

    const response = await nytApiClient.get('/articlesearch.json', { params });
    const docs = response.data.response.docs;

    const articles = docs.map((article: any) => ({
      id: article._id,
      title: article.headline.main,
      summary: article.abstract,
      url: article.web_url,
      imageUrl: article.multimedia[0]?.url
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : null,
      author: article.byline?.original || null,
      categories: [article.news_desk].filter(Boolean),
      publishedAt: article.pub_date,
      source: 'The New York Times',
    }));

    return {
      articles,
      totalResults: response.data.response.meta.hits,
      currentPage: page,
    };
  } catch (error) {
    throw handleAPIError(error, 'NYT API');
  }
};
