'use client';

import { useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 mx-4 w-full max-w-lg rounded-lg border border-gold/40 bg-surface p-6 shadow-[0_0_20px_rgba(212,160,23,0.15)]',
          className
        )}
      >
        {title && (
          <div className="mb-4 border-b border-gold/20 pb-3">
            <h2 className="text-xl font-bold text-gold">{title}</h2>
          </div>
        )}
        <div className="text-white/90">{children}</div>
      </div>
    </div>
  );
}

export { Modal, type ModalProps };
