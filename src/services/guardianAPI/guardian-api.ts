import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from '../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from '../types';
import { DEFAULT_PARAMS } from '../constants';
import { handleAPIError } from '../api-error';
import { GuardianResponse } from './types';
import { guardianApiAdapter, guardianApiFiltersAdapter } from './adapters';

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
    const params = guardianApiFiltersAdapter(filters, page);

    const response = await guardianApiClient.get<GuardianResponse>('/search', {
      params,
    });
    const { results, total, currentPage } = response.data.response;
    const articles = results.map(guardianApiAdapter);

    return {
      articles,
      totalResults: total,
      currentPage,
    };
  } catch (error) {
    throw handleAPIError(error, 'Guardian API');
  }
};
