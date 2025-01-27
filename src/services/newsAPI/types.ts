import { z } from 'zod';

export const ArticleSchema = z.object({
  author: z.string().nullable(),
  content: z.string().nullable(),
  description: z.string().nullable(),
  publishedAt: z.string(),
  source: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
  title: z.string(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  // category: z.string().nullable(),
});

export const NewsResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  totalResults: z.number(),
  articles: z.array(ArticleSchema),
});

// Top Headlines specific schema (same structure but documenting separately for clarity)
export const NewsHeadlineResponseSchema = NewsResponseSchema;

export type Article = z.infer<typeof ArticleSchema>;

export interface NewsFilters {
  keyword?: string;
  categories: string[];
  sources: string[];
  startDate?: string;
  endDate?: string;
}

export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
}

export type NewsHeadlineResponse = NewsResponse;

// Top Headlines specific filters
export interface HeadlineFilters {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
}
