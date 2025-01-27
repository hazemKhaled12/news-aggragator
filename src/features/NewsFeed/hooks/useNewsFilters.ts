import { useState, useCallback } from 'react';
import { useLocalState } from '../../../hooks/useLocalState';
import { StandardNewsFilters } from '../../../services/types';

export const DEFAULT_FILTERS: StandardNewsFilters = {
  categories: [],
  sources: [],
};

export const useNewsFilters = () => {
  const [filters, setFilters] = useLocalState<StandardNewsFilters>(
    'user-preferences',
    DEFAULT_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilters = useCallback(
    (newFilters: Partial<StandardNewsFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setCurrentPage(1);
    },
    []
  );

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
