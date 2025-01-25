interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  className = '',
  title,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      {title && (
        <label className="flex justify-start text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {title}
        </label>
      )}
      <input
        type="text"
        className={`w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
