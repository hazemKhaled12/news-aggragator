interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  className?: string;
  min?: string;
  max?: string;
}

export const DatePicker = ({
  value,
  onChange,
  title,
  className = '',
  min,
  max,
}: DatePickerProps) => {
  return (
    <div className="flex flex-col">
      {title && (
        <label className="flex justify-start text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {title}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="date"
          className={`w-full p-2 border border-gray-300 dark:border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
        />
        {value && (
          <button
            title="Clear date"
            onClick={() => onChange('')}
            className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
            type="button"
            aria-label="Clear date"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
