import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from '../../config/api';
import { StandardNewsFilters, StandardNewsResponse } from '../types';
import { DEFAULT_PARAMS } from '../constants';
import { NewsResponse, NewsHeadlineResponse } from './types';
import {
  newsApiAdapter,
  newsApiFiltersAdapter,
  newsApiHeadlinesFiltersAdapter,
} from './adapters';

export const newsApiClient = axios.create({
  baseURL: API_ENDPOINTS.NEWS_API,
  params: {
    apiKey: API_KEYS.NEWS_API,
  },
});

export const fetchNewsArticles = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  //Transform the filters to the API format
  const params = newsApiFiltersAdapter(filters, page);
  //Fetch the data from the API
  const response = await newsApiClient.get<NewsResponse>('/everything', {
    params,
  });

  //Transform the response to the standard format
  const articles = response.data.articles.map(newsApiAdapter);

  return {
    articles,
    totalResults: response.data.totalResults,
    currentPage: page,
  };
};

export const fetchNewsHeadLines = async (
  filters: StandardNewsFilters,
  page = DEFAULT_PARAMS.page
): Promise<StandardNewsResponse> => {
  //Transform the filters to the API format
  const params = newsApiHeadlinesFiltersAdapter(filters, page);
  //Fetch the data from the API
  const response = await newsApiClient.get<NewsHeadlineResponse>(
    '/top-headlines',
    {
      params,
    }
  );

  //Transform the response to the standard format
  const articles = response.data.articles.map(newsApiAdapter);

  return {
    articles,
    totalResults: response.data.totalResults,
    currentPage: page,
  };
};
