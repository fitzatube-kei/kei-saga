'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';

interface RewardScreenProps {
  earnedPoints: number;
  correctAnswers: number;
  totalQuizzes: number;
  onContinue: () => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill={filled ? '#d4a017' : 'none'}
      stroke={filled ? '#f0c040' : '#555'}
      strokeWidth="2"
      className={cn(
        'transition-all duration-500',
        filled && 'drop-shadow-[0_0_10px_rgba(212,160,23,0.6)]'
      )}
    >
      <path d="M24 4l6.18 12.52L44 18.68l-10 9.74L36.36 42 24 35.52 11.64 42 14 28.42 4 18.68l13.82-2.16L24 4z" />
    </svg>
  );
}

export function RewardScreen({
  earnedPoints,
  correctAnswers,
  totalQuizzes,
  onContinue,
}: RewardScreenProps) {
  const { t } = useTranslation();
  const accuracy = totalQuizzes > 0 ? (correctAnswers / totalQuizzes) * 100 : 100;
  const starCount = useMemo(() => {
    if (accuracy > 80) return 3;
    if (accuracy >= 50) return 2;
    return 1;
  }, [accuracy]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-[reward-enter_0.6s_ease-out]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Content */}
      <div className="relative z-10 mx-4 w-full max-w-md text-center">
        {/* Title */}
        <h1
          className={cn(
            'mb-8 text-4xl font-bold text-gold md:text-5xl',
            'text-glow'
          )}
        >
          {t('game.congrats')}
        </h1>

        {/* Stars */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className="animate-[star-pop_0.4s_ease-out_forwards]"
              style={{
                animationDelay: `${0.3 + star * 0.2}s`,
                opacity: 0,
              }}
            >
              <StarIcon filled={star <= starCount} />
            </div>
          ))}
        </div>

        {/* Stats card */}
        <div
          className={cn(
            'mb-8 rounded-lg border border-gold/30 bg-surface/90 p-6',
            'shadow-[0_0_20px_rgba(212,160,23,0.15)]'
          )}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Points */}
            <div>
              <p className="mb-1 text-sm text-white/50">{t('game.earnedPoints')}</p>
              <p className="text-3xl font-bold text-goldLight">
                +{earnedPoints}
              </p>
            </div>

            {/* Accuracy */}
            <div>
              <p className="mb-1 text-sm text-white/50">{t('game.quizAccuracy')}</p>
              <p className="text-3xl font-bold text-gold">
                {Math.round(accuracy)}%
              </p>
            </div>
          </div>

          {/* Quiz detail */}
          <div className="mt-4 border-t border-gold/10 pt-4">
            <p className="text-sm text-white/60">
              {totalQuizzes}개 퀴즈 중{' '}
              <span className="font-bold text-success">{correctAnswers}개</span>{' '}
              정답
            </p>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className={cn(
            'w-full rounded-lg bg-gold px-8 py-4',
            'text-lg font-bold text-background',
            'transition-all duration-200',
            'hover:shadow-[0_0_25px_rgba(212,160,23,0.5)] hover:brightness-110',
            'active:scale-[0.98]'
          )}
        >
          {t('game.goBack')}
        </button>
      </div>

      <style jsx global>{`
        @keyframes reward-enter {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes star-pop {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-20deg);
          }
          60% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
