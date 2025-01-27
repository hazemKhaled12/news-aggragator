import { useState, useCallback } from 'react';
import { NewsFilters } from '../../../services/newsAPI/types';

const DEFAULT_FILTERS: NewsFilters = {
  categories: [],
  sources: [],
};

export const useNewsFilters = () => {
  const [filters, setFilters] = useState<NewsFilters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilters = useCallback((newFilters: Partial<NewsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  return {
    filters,
    currentPage,
    setCurrentPage,
    updateFilters,
    resetFilters,
  };
};
