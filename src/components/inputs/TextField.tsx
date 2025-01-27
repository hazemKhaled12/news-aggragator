import React from 'react';

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  title,
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
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-3 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
