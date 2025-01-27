import { useState, useEffect } from 'react';
import type { NewsFilters as NewsFiltersType } from '../../../services/newsAPI/types';
import { CATEGORIES, NEWS_SOURCES } from '../../../services/constants';
import {
  TextField,
  DatePicker,
  Button,
  MultiSelect,
} from '../../../components/inputs';
import { useDebounce } from '../../../hooks/useDebounce';
import { StandardNewsFilters } from 'services/types';

interface NewsFiltersProps {
  filters: StandardNewsFilters;
  onFiltersChange: (filters: Partial<StandardNewsFilters>) => void;
  onReset?: () => void;
}

export const NewsFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: NewsFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.keyword || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Calculate date 1 month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const minDate = oneMonthAgo.toISOString().split('T')[0];

  useEffect(() => {
    setSearchTerm(filters.keyword || '');
  }, [filters]);

  useEffect(() => {
    onFiltersChange({ keyword: debouncedSearchTerm });
  }, [debouncedSearchTerm, onFiltersChange]);

  const handleFilterChange = (
    key: keyof StandardNewsFilters,
    value: string | string[]
  ) => {
    if (key === 'keyword') {
      setSearchTerm(value as string);
      return;
    }
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          title="Search"
          value={searchTerm}
          onChange={(value) => handleFilterChange('keyword', value)}
          placeholder="Search articles..."
        />

        <MultiSelect
          label="Categories"
          value={filters.categories || []}
          onChange={(value: string[]) =>
            handleFilterChange('categories', value)
          }
          options={CATEGORIES.map((category) => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
          }))}
          placeholder="Select categories..."
        />

        <MultiSelect
          label="Sources"
          value={filters.sources || []}
          onChange={(value: string[]) => handleFilterChange('sources', value)}
          options={NEWS_SOURCES.map((source) => ({
            value: source,
            label: source,
          }))}
          placeholder="Select sources..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          title="Start Date"
          value={filters.startDate || ''}
          onChange={(value) => handleFilterChange('startDate', value)}
          max={filters.endDate || undefined}
          min={minDate}
        />

        <DatePicker
          title="End Date"
          value={filters.endDate || ''}
          onChange={(value) => handleFilterChange('endDate', value)}
          min={
            new Date(
              Math.max(
                new Date(filters.startDate || minDate).getTime(),
                new Date(minDate).getTime()
              )
            )
              .toISOString()
              .split('T')[0]
          }
        />
      </div>

      {onReset && (
        <div className="flex justify-end">
          <Button variant="outline" color="danger" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
