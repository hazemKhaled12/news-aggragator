import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from '../../../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from '../types';
import { DEFAULT_PARAMS } from '../../constants';
import { handleAPIError } from '../api-error';

const guardianApiClient = axios.create({
  baseURL: API_ENDPOINTS.GUARDIAN_API,
  params: {
    'api-key': API_KEYS.GUARDIAN_API,
  },
});

export const fetchGuardianArticles = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  try {
    const { keyword, startDate, endDate, category } = filters;

    const params = {
      q: keyword,
      section: category,
      'from-date': startDate,
      'to-date': endDate,
      page,
      'page-size': DEFAULT_PARAMS.pageSize,
      'show-fields': 'all',
      'order-by': 'newest',
    };

    const response = await guardianApiClient.get('/search', { params });
    const { results, total, currentPage } = response.data.response;

    const articles = results.map((article: any) => ({
      id: article.id,
      title: article.webTitle,
      summary: article.fields?.trailText || null,
      imageUrl: article.fields?.thumbnail || null,
      url: article.webUrl,
      author: article.fields?.byline || null,
      categories: [article.sectionName],
      publishedAt: article.webPublicationDate,
      source: 'The Guardian',
    }));

    return {
      articles,
      totalResults: total,
      currentPage,
    };
  } catch (error) {
    throw handleAPIError(error, 'Guardian API');
  }
};
