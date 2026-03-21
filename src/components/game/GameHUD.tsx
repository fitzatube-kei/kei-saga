'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';

interface GameHUDProps {
  currentStep: number;
  totalSteps: number;
  points: number;
  eventTitle: string;
}

export function GameHUD({
  currentStep,
  totalSteps,
  points,
  eventTitle,
}: GameHUDProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const progress = totalSteps > 0 ? Math.min((currentStep / totalSteps) * 100, 100) : 0;

  const handlePause = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const handleExit = useCallback(() => {
    window.location.href = '/play';
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 px-4 pt-3">
        <div
          className={cn(
            'mx-auto flex max-w-3xl items-center gap-3 rounded-lg',
            'bg-black/70 px-4 py-2.5 backdrop-blur-sm',
            'border border-gold/20'
          )}
        >
          {/* Event title */}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gold">
              {eventTitle}
            </p>
            {/* Progress bar */}
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step counter */}
          <div className="flex-shrink-0 text-center">
            <p className="text-xs text-white/50">{t('game.progress')}</p>
            <p className="text-sm font-bold text-gold">
              {Math.min(currentStep + 1, totalSteps)}/{totalSteps}
            </p>
          </div>

          {/* Points */}
          <div className="flex-shrink-0 text-center">
            <p className="text-xs text-white/50">{t('play.points')}</p>
            <p className="text-sm font-bold text-goldLight">{points}</p>
          </div>

          {/* Pause button */}
          <button
            onClick={handlePause}
            className={cn(
              'flex-shrink-0 rounded-md p-1.5',
              'text-gold/70 transition-colors',
              'hover:bg-gold/10 hover:text-gold'
            )}
            aria-label={t('game.pause')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <rect x="5" y="3" width="4" height="14" rx="1" />
              <rect x="11" y="3" width="4" height="14" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCancel}
          />
          <div
            className={cn(
              'relative z-10 mx-4 w-full max-w-sm rounded-lg',
              'border border-gold/40 bg-surface p-6',
              'shadow-[0_0_20px_rgba(212,160,23,0.2)]',
              'animate-fade-in'
            )}
          >
            <h3 className="mb-2 text-lg font-bold text-gold">{t('game.exitGame')}</h3>
            <p className="mb-5 text-sm text-white/70">
              {t('game.exitConfirmMsg')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className={cn(
                  'flex-1 rounded-lg border border-gold/30 px-4 py-2.5',
                  'font-medium text-gold',
                  'transition-all hover:border-gold hover:bg-gold/10'
                )}
              >
                {t('game.continue')}
              </button>
              <button
                onClick={handleExit}
                className={cn(
                  'flex-1 rounded-lg bg-red-700 px-4 py-2.5',
                  'font-medium text-white',
                  'transition-all hover:bg-red-600'
                )}
              >
                {t('game.exit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
