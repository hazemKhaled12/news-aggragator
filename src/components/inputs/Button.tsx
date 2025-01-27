type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid: 'text-white',
  outline: 'bg-transparent border-2',
  ghost: 'bg-transparent hover:bg-opacity-10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const colorStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-blue-600 hover:bg-blue-700',
    outline:
      'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900',
    ghost: 'text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900',
  },
  secondary: {
    solid: 'bg-gray-600 hover:bg-gray-700',
    outline:
      'border-gray-600 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900',
  },
  danger: {
    solid: 'bg-red-600 hover:bg-red-700',
    outline:
      'border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900',
    ghost: 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900',
  },
  success: {
    solid: 'bg-green-600 hover:bg-green-700',
    outline:
      'border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900',
    ghost: 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900',
  },
  warning: {
    solid: 'bg-yellow-600 hover:bg-yellow-700',
    outline:
      'border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900',
    ghost: 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900',
  },
};

export const Button = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        rounded-lg font-medium transition-colors cursor-pointer
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${colorStyles[color][variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div
            className={`border-2 border-current border-t-transparent rounded-full animate-spin ${
              size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
            }`}
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
