import React, { useState } from 'react';
import { CPopup } from '../../components/common/CPopup/CPopup';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/inputs/Button';
import { useLocalState } from '../../hooks/useLocalState';
import { NewsFilters } from 'services/newsAPI/types';
import { MultiSelect, Option } from '../../components/inputs/MultiSelect';
import { CATEGORIES, NEWS_SOURCES } from '../../services/constants';

interface PreferencesProps {
  onSave?: () => void;
}

const DEFAULT_FILTERS: NewsFilters = {
  categories: [],
  sources: [],
};

const AVAILABLE_CATEGORIES: Option[] = CATEGORIES.map((category) => ({
  value: category,
  label: category.charAt(0).toUpperCase() + category.slice(1),
}));

const AVAILABLE_SOURCES: Option[] = Object.values(NEWS_SOURCES).map(
  (source) => ({
    value: source,
    label: source,
  })
);

export const UserPreferences: React.FC<PreferencesProps> = ({ onSave }) => {
  const [savedFilters, setSavedFilters] = useLocalState<NewsFilters>(
    'user-preferences',
    DEFAULT_FILTERS
  );

  const [tempFilters, setTempFilters] = useState<NewsFilters>(savedFilters);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setTempFilters(savedFilters);
    setIsOpen(true);
  };

  const handleSave = () => {
    setSavedFilters(tempFilters); // Save temp filters to local storage
    onSave?.();
    handleClose();
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setTempFilters((prev) => ({ ...prev, categories: selectedCategories }));
  };

  const handleSourceChange = (selectedSources: string[]) => {
    setTempFilters((prev) => ({ ...prev, sources: selectedSources }));
  };

  const footer = (
    <>
      <Button variant="solid" color="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="solid" color="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );

  return (
    <>
      <Button variant="ghost" onClick={handleOpen}>
        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <CPopup
        isOpen={isOpen}
        onClose={handleClose}
        title="Preferences"
        footer={footer}
      >
        <div className="space-y-6 p-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Categories
            </h3>
            <MultiSelect
              options={AVAILABLE_CATEGORIES}
              value={tempFilters.categories}
              onChange={handleCategoryChange}
              placeholder="Select categories..."
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sources</h3>
            <MultiSelect
              options={AVAILABLE_SOURCES}
              value={tempFilters.sources}
              onChange={handleSourceChange}
              placeholder="Select sources..."
            />
          </div>

          <p className="text-sm text-gray-500">
            These preferences will be used to personalize your news feed.
          </p>
        </div>
      </CPopup>
    </>
  );
};
