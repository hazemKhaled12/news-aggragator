interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  title?: string;
}

export const SelectField = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
  title,
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col">
      {title && (
        <label className="flex justify-start text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {title}
        </label>
      )}
      <select
        className={`w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
