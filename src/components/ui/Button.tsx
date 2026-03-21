'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

const variantStyles = {
  primary:
    'bg-gold text-background border-gold hover:shadow-[0_0_12px_rgba(212,160,23,0.5)] hover:brightness-110 active:brightness-90',
  secondary:
    'bg-surface text-gold border-gold/50 hover:border-gold hover:shadow-[0_0_8px_rgba(212,160,23,0.3)] active:bg-gold/10',
  danger:
    'bg-red-700 text-white border-red-600 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] hover:brightness-110 active:brightness-90',
  ghost:
    'bg-transparent text-gold border-transparent hover:bg-gold/10 hover:border-gold/30 active:bg-gold/20',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:ring-offset-1 focus:ring-offset-background',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
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
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
