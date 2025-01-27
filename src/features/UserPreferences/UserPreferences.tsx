import React, { useState } from 'react';
import { CPopup } from '../../components/common/CPopup/CPopup';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/inputs/Button';
import { useLocalState } from '../../hooks/useLocalState';
import { NewsFilters } from 'services/newsAPI/types';
import { NewsFilters as NewsFiltersType } from 'features/NewsFeed/components/NewsFilters';

interface PreferencesProps {
  onSave?: () => void;
}
const DEFAULT_FILTERS: NewsFilters = {
  categories: [],
  sources: [],
};
export const UserPreferences: React.FC<PreferencesProps> = ({ onSave }) => {
  const [filters, setFilters] = useLocalState<NewsFilters>(
    'user-preferences',

    DEFAULT_FILTERS
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleSave = () => {
    onSave?.();
    handleClose();
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
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <CPopup
        isOpen={isOpen}
        onClose={handleClose}
        title="Preferences"
        footer={footer}
      >
        <div className="space-y-4">
          <p className="text-gray-500">Configure your news preferences here.</p>
        </div>
      </CPopup>
    </>
  );
};
