import { z } from 'zod';

// Standardized filter interface used across all news services
export interface StandardNewsFilters {
  keyword?: string;
  category?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
}

// Standardized article interface that all services will map to
export interface StandardArticle {
  id: string;
  title: string;
  summary?: string | null;
  imageUrl?: string | null;
  url: string;
  author?: string | null;
  categories?: string[];
  publishedAt: string;
  source: string;
}

// Zod schema for validation
export const StandardArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  url: z.string().url(),
  author: z.string().nullable().optional(),
  categories: z.array(z.string()).optional(),
  publishedAt: z.string(),
  source: z.string(),
});

export interface StandardNewsResponse {
  articles: StandardArticle[];
  totalResults: number;
  currentPage: number;
}

export const StandardNewsResponseSchema = z.object({
  articles: z.array(StandardArticleSchema),
  totalResults: z.number(),
  currentPage: z.number(),
});
