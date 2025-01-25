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
        <label className="flex justify-start  text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {title}
        </label>
      )}
      <input
        type="date"
        className={`w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
};
