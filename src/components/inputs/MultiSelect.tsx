import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className="min-h-[42px] w-full border border-gray-300 rounded-md bg-white p-2 cursor-pointer"
          tabIndex={0}
          onFocus={() => setIsOpen(true)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {options.find((opt) => opt.value === v)?.label || v}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(v);
                    }}
                    className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                  >
                    <span className="sr-only">Remove</span>×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
        </div>
        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option.value);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value.includes(option.value) ? 'bg-blue-50' : ''
                }`}
                role="option"
                aria-selected={value.includes(option.value)}
              >
                {option.value && (
                  <input
                    type="checkbox"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                )}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
