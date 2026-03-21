import { cn } from '@/lib/utils/cn';

const sizeStyles = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

type LoadingSize = keyof typeof sizeStyles;

interface LoadingProps {
  size?: LoadingSize;
  text?: string;
}

function Loading({ size = 'md', text }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg
        className={cn('animate-spin text-gold', sizeStyles[size])}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {text && (
        <p className={cn('text-gold/70', textSizeStyles[size])}>{text}</p>
      )}
    </div>
  );
}

export { Loading, type LoadingProps, type LoadingSize };
