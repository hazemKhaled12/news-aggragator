import { StandardNewsFilters, StandardNewsResponse } from '../types';

export type { StandardNewsFilters, StandardNewsResponse };

export interface NYTArticle {
  _id: string;
  headline: {
    main: string;
  };
  abstract: string;
  web_url: string;
  multimedia: Array<{
    url: string;
    type: string;
  }>;
  byline?: {
    original: string;
  };
  news_desk: string;
  pub_date: string;
}

export interface NYTResponse {
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
    };
  };
}
