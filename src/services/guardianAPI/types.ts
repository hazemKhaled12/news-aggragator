import { z } from 'zod';

export const GuardianArticleFieldsSchema = z.object({
  trailText: z.string().nullable(),
  thumbnail: z.string().url().nullable(),
  byline: z.string().nullable(),
});

export const GuardianArticleSchema = z.object({
  id: z.string(),
  webTitle: z.string(),
  webUrl: z.string().url(),
  fields: GuardianArticleFieldsSchema.nullable(),
  webPublicationDate: z.string(),
  sectionName: z.string().nullable(),
});

export const GuardianResponseSchema = z.object({
  response: z.object({
    status: z.string(),
    total: z.number(),
    startIndex: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    pages: z.number(),
    results: z.array(GuardianArticleSchema),
  }),
});

export type GuardianArticleFields = z.infer<typeof GuardianArticleFieldsSchema>;
export type GuardianArticle = z.infer<typeof GuardianArticleSchema>;
export type GuardianResponse = z.infer<typeof GuardianResponseSchema>;

export interface GuardianFilters {
  q?: string;
  'page-size'?: number;
  page?: number;
  'from-date'?: string;
  'to-date'?: string;
  section?: string;
  'show-fields'?: string;
  'order-by'?: 'newest' | 'oldest' | 'relevance';
}
