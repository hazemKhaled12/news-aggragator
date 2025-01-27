import React from 'react';
import { CalendarIcon } from '@heroicons/react/20/solid';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string | undefined;
  max?: string | undefined;
  title?: string;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  title,
  placeholder = 'Select date...',
}) => {
  return (
    <div className="w-full">
      {title && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {title}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div> */}
      </div>
    </div>
  );
};
