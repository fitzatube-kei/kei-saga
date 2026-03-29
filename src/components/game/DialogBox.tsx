'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';

interface DialogBoxProps {
  text: string;
  speaker?: string;
  onComplete: () => void;
  onBack?: () => void;
}

const TYPING_SPEED_MS = 30;

export function DialogBox({ text, speaker, onComplete, onBack }: DialogBoxProps) {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const clearTyping = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      const nextIndex = indexRef.current;
      if (nextIndex >= text.length) {
        setDisplayedText(text);
        setIsComplete(true);
        clearTyping();
      } else {
        setDisplayedText(text.slice(0, nextIndex));
      }
    }, TYPING_SPEED_MS);

    return clearTyping;
  }, [text, clearTyping]);

  const handleClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!isComplete) {
      clearTyping();
      setDisplayedText(text);
      setIsComplete(true);
    } else {
      onComplete();
    }
  }, [isComplete, text, onComplete, clearTyping]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-6 pt-2"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      <div
        className={cn(
          'relative mx-auto max-w-3xl rounded-lg',
          'bg-black/60 backdrop-blur-sm',
          'border border-gold/50',
          'shadow-[0_0_20px_rgba(212,160,23,0.2)]',
          'cursor-pointer select-none'
        )}
      >
        {/* Corner accents */}
        <div className="pointer-events-none absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-gold" />
        <div className="pointer-events-none absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-gold" />
        <div className="pointer-events-none absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-gold" />
        <div className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-gold" />

        {/* Speaker name */}
        {speaker && (
          <div className="absolute -top-4 left-4">
            <span
              className={cn(
                'inline-block rounded-t-md px-4 py-1',
                'bg-gold/90 text-sm font-bold text-background',
                'shadow-[0_0_8px_rgba(212,160,23,0.4)]'
              )}
            >
              {speaker}
            </span>
          </div>
        )}

        {/* Text content */}
        <div className={cn('px-6 pb-5 pt-6', speaker && 'pt-5')}>
          <p className="min-h-[3.5rem] text-base leading-relaxed text-gray-100 md:text-lg">
            {displayedText}
            {!isComplete && (
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-gold" />
            )}
          </p>

          {/* Navigation buttons */}
          {isComplete && (
            <div className="mt-3 flex items-center justify-between">
              {onBack ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBack();
                  }}
                  className="text-sm font-medium text-white/50 transition-colors hover:text-white/80"
                >
                  {t('game.back')}
                </button>
              ) : (
                <span />
              )}
              <span className="animate-pulse text-sm font-medium text-gold">
                {t('game.next')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
