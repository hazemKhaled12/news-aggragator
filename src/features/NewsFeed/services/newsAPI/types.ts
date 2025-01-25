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

export type Article = z.infer<typeof ArticleSchema>;

export interface NewsFilters {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  source?: string;
  author?: string;
}

export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
}
