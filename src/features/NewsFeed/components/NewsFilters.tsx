import { useState, useEffect } from 'react';
import type { NewsFilters as NewsFiltersType } from '../services/newsAPI/types';
import { CATEGORIES, SOURCES } from '../constants';
import {
  TextField,
  SelectField,
  DatePicker,
  Button,
} from '../../../components/inputs';

interface NewsFiltersProps {
  filters: NewsFiltersType;
  onFiltersChange: (filters: NewsFiltersType) => void;
  onReset?: () => void;
}

export const NewsFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: NewsFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<NewsFiltersType>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof NewsFiltersType, value: string) => {
    console.log('key', key);
    console.log('value', value);
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          title="Search"
          value={localFilters.keyword || ''}
          onChange={(value) => handleFilterChange('keyword', value)}
          placeholder="Search articles..."
        />

        <SelectField
          title="Category"
          value={localFilters.category || ''}
          onChange={(value) => handleFilterChange('category', value)}
          options={CATEGORIES.map((category) => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
          }))}
          placeholder="All Categories"
        />

        <SelectField
          title="Source"
          value={localFilters.source || ''}
          onChange={(value) => handleFilterChange('source', value)}
          options={SOURCES.map((source) => ({
            value: source,
            label: source,
          }))}
          placeholder="All Sources"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          title="Start Date"
          value={localFilters.startDate || ''}
          onChange={(value) => handleFilterChange('startDate', value)}
          max={localFilters.endDate || undefined}
        />

        <DatePicker
          title="End Date"
          value={localFilters.endDate || ''}
          onChange={(value) => handleFilterChange('endDate', value)}
          min={localFilters.startDate || undefined}
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
