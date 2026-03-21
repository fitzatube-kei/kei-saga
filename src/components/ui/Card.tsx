'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'interactive';
}

function Card({ children, className, onClick, variant = 'default' }: CardProps) {
  const isInteractive = variant === 'interactive' || !!onClick;

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'rounded-lg border border-gold/10 bg-surface p-5 transition-all duration-200',
        isInteractive &&
          'cursor-pointer hover:border-gold/50 hover:shadow-[0_0_12px_rgba(212,160,23,0.15)] active:scale-[0.98]',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps };
