'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gold/80"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold/50">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-md border border-gold/30 bg-surface px-4 py-2.5 text-white placeholder-white/30 transition-all duration-200 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20',
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              props.disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, type InputProps };
