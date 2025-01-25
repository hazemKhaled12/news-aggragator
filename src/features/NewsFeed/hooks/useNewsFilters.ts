import { useState, useCallback } from 'react';
import { NewsFilters } from '../services/newsAPI/types';

export const useNewsFilters = () => {
  const [filters, setFilters] = useState<NewsFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilters = useCallback((newFilters: Partial<NewsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
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
