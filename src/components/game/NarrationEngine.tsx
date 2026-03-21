'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { saveProgress, markEventComplete } from '@/lib/firebase/progress';
import { calculateReward } from '@/lib/game/engine';
import type { GameEvent, GameProgress } from '@/types/game';

import { GameBackground } from './GameBackground';
import { CharacterSprite } from './CharacterSprite';
import { DialogBox } from './DialogBox';
import { QuizModal } from './QuizModal';
import { GameHUD } from './GameHUD';
import { RewardScreen } from './RewardScreen';

interface NarrationEngineProps {
  event: GameEvent;
  initialProgress: GameProgress | null;
  userId: string;
}

export function NarrationEngine({
  event,
  initialProgress,
  userId,
}: NarrationEngineProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    currentStep,
    gameState,
    quizAnswers,
    progress,
    startGame,
    nextStep,
    answerQuiz,
    setGameState,
    loadProgress,
  } = useGameStore();

  // Initialize game
  useEffect(() => {
    if (initialProgress && !initialProgress.completed) {
      loadProgress(initialProgress);
    } else {
      startGame(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress on step change
  useEffect(() => {
    if (progress && userId) {
      saveProgress(userId, progress).catch(console.error);
    }
  }, [progress, userId]);

  // Backup save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (progress && userId) {
        // navigator.sendBeacon is more reliable for unload
        const data = JSON.stringify({
          userId,
          progress,
        });
        const blob = new Blob([data], { type: 'application/json' });
        navigator.sendBeacon?.('/api/save-progress', blob);
        // Also try direct save
        saveProgress(userId, progress).catch(() => {});
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [progress, userId]);

  const currentStepData = useMemo(
    () => (currentStep < event.steps.length ? event.steps[currentStep] : null),
    [currentStep, event.steps]
  );

  const handleDialogComplete = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const handleQuizAnswer = useCallback(
    (selectedIndex: number) => {
      if (!currentStepData?.quiz) return;
      const correct = selectedIndex === currentStepData.quiz.correctIndex;
      answerQuiz(currentStepData.id, correct);
      // Small delay then advance
      setTimeout(() => {
        nextStep();
      }, 300);
    },
    [currentStepData, answerQuiz, nextStep]
  );

  const handleRewardContinue = useCallback(async () => {
    try {
      const earned = calculateReward(event, quizAnswers);
      await markEventComplete(userId, event.id, earned);
    } catch (err) {
      console.error('Failed to save completion:', err);
    }
    router.push(`/play/${event.eraId}`);
  }, [event, quizAnswers, userId, router]);

  // Compute reward stats
  const correctAnswers = quizAnswers.filter((a) => a.correct).length;
  const totalQuizzes = event.steps.filter((s) => s.type === 'quiz').length;
  const earnedPoints = calculateReward(event, quizAnswers);

  // Determine if character should speak
  const isSpeaking = gameState === 'DIALOG' && currentStepData?.type === 'dialog';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <GameBackground eraId={event.eraId} />

      {/* HUD */}
      <GameHUD
        currentStep={currentStep}
        totalSteps={event.steps.length}
        points={earnedPoints}
        eventTitle={event.title}
      />

      {/* Main content area */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-48 pt-20">
        {/* Character (shown during dialog steps) */}
        {gameState === 'DIALOG' && currentStepData?.type === 'dialog' && (
          <CharacterSprite
            character={event.character}
            speaking={isSpeaking}
            className="animate-fade-in"
          />
        )}

        {/* Narration visual: show character in subtle / smaller way */}
        {gameState === 'DIALOG' && currentStepData?.type === 'narration' && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto mb-4 h-px w-24 bg-gold/30" />
            <p className="text-sm font-medium tracking-wider text-gold/50">
              {t('game.narration')}
            </p>
            <div className="mx-auto mt-4 h-px w-24 bg-gold/30" />
          </div>
        )}
      </div>

      {/* Dialog box (narration and dialog) */}
      {gameState === 'DIALOG' && currentStepData && (
        <DialogBox
          text={currentStepData.text ?? ''}
          speaker={currentStepData.speaker}
          onComplete={handleDialogComplete}
        />
      )}

      {/* Quiz modal */}
      {gameState === 'QUIZ' && currentStepData?.quiz && (
        <QuizModal quiz={currentStepData.quiz} onAnswer={handleQuizAnswer} />
      )}

      {/* Reward screen */}
      {gameState === 'REWARD' && (
        <RewardScreen
          earnedPoints={earnedPoints}
          correctAnswers={correctAnswers}
          totalQuizzes={totalQuizzes}
          onContinue={handleRewardContinue}
        />
      )}
    </div>
  );
}
