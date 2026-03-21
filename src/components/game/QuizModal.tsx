'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';
import type { Quiz } from '@/types/game';

interface QuizModalProps {
  quiz: Quiz;
  onAnswer: (selectedIndex: number) => void;
}

export function QuizModal({ quiz, onAnswer }: QuizModalProps) {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedIndex(index);
      setAnswered(true);
    },
    [answered]
  );

  const handleContinue = useCallback(() => {
    if (selectedIndex !== null) {
      onAnswer(selectedIndex);
    }
  }, [selectedIndex, onAnswer]);

  const isCorrect = selectedIndex === quiz.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-[quiz-enter_0.4s_ease-out]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 mx-4 w-full max-w-2xl">
        {/* Question */}
        <div
          className={cn(
            'mb-6 rounded-lg border border-gold/40 bg-surface/95 p-6',
            'shadow-[0_0_30px_rgba(212,160,23,0.2)]'
          )}
        >
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gold/70">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM6.5 7.5h3v5h-3v-5z" />
            </svg>
            {t('game.quizLabel')}
          </div>
          <p className="text-lg font-semibold leading-relaxed text-gray-100 md:text-xl">
            {quiz.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quiz.options.map((option, index) => {
            let optionStyle = '';
            if (answered) {
              if (index === quiz.correctIndex) {
                optionStyle =
                  'border-success bg-success/20 text-success shadow-[0_0_15px_rgba(34,197,94,0.3)]';
              } else if (index === selectedIndex) {
                optionStyle =
                  'border-danger bg-danger/20 text-danger shadow-[0_0_15px_rgba(239,68,68,0.3)]';
              } else {
                optionStyle = 'border-white/10 bg-surface/50 text-white/40';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={answered}
                className={cn(
                  'rounded-lg border p-4 text-left transition-all duration-200',
                  'font-medium leading-relaxed',
                  !answered &&
                    'border-gold/30 bg-surface/80 text-gray-100 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_12px_rgba(212,160,23,0.2)] active:scale-[0.98]',
                  answered && optionStyle,
                  answered && 'cursor-default'
                )}
              >
                <span className="mr-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-current text-xs">
                  {index + 1}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation and Continue */}
        {answered && (
          <div className="mt-6 animate-fade-in">
            {/* Result indicator */}
            <div
              className={cn(
                'mb-4 rounded-lg border p-4',
                isCorrect
                  ? 'border-success/30 bg-success/10'
                  : 'border-danger/30 bg-danger/10'
              )}
            >
              <p
                className={cn(
                  'mb-1 text-sm font-bold',
                  isCorrect ? 'text-success' : 'text-danger'
                )}
              >
                {isCorrect ? '정답입니다!' : '틀렸습니다'}
              </p>
              <p className="text-sm leading-relaxed text-gray-300">
                {quiz.explanation}
              </p>
            </div>

            <button
              onClick={handleContinue}
              className={cn(
                'w-full rounded-lg bg-gold px-6 py-3',
                'font-bold text-background',
                'transition-all duration-200',
                'hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] hover:brightness-110',
                'active:scale-[0.98]'
              )}
            >
              {t('game.continue')}
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes quiz-enter {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
