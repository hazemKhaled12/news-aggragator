import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from '../types';
import { NYTResponse } from './types';
import { DEFAULT_PARAMS, NEWS_SOURCES } from '../constants';
import { handleAPIError } from '../api-error';
import { nytApiAdapter, nytApiFiltersAdapter } from './adapters';

const nytApiClient = axios.create({
  baseURL: API_ENDPOINTS.NYT_API,
});

export const fetchNYTArticles = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  try {
    const params = nytApiFiltersAdapter(filters, page);

    const { data } = await nytApiClient.get<NYTResponse>(
      '/articlesearch.json',
      { params }
    );
    const articles = data.response.docs.map(nytApiAdapter);

    return {
      articles,
      totalResults: data.response.meta.hits,
      currentPage: page,
    };
  } catch (error) {
    throw handleAPIError(error, NEWS_SOURCES[0]);
  }
};
