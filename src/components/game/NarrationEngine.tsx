'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/gameStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
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
  const lg = useLocalizedGame();
  const {
    currentStep,
    gameState,
    quizAnswers,
    progress,
    startGame,
    nextStep,
    prevStep,
    answerQuiz,
    setGameState,
    loadProgress,
  } = useGameStore();

  // Initialize game
  useEffect(() => {
    if (initialProgress && !initialProgress.completed) {
      loadProgress(initialProgress, event);
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

  const handleDialogBack = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const handleQuizAnswer = useCallback(
    (selectedIndex: number) => {
      if (!currentStepData?.quiz) return;
      const correct = selectedIndex === currentStepData.quiz.correctIndex;
      answerQuiz(currentStepData.id, correct);
    },
    [currentStepData, answerQuiz]
  );

  const handleQuizContinue = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const handleRewardContinue = useCallback(async () => {
    try {
      const earned = calculateReward(event, quizAnswers);
      await markEventComplete(userId, event.id, earned);
    } catch (err) {
      console.error('Failed to save completion:', err);
    }
    router.push(`/play/${event.eraId}/${event.periodId}`);
  }, [event, quizAnswers, userId, router]);

  // Compute reward stats
  const correctAnswers = quizAnswers.filter((a) => a.correct).length;
  const totalQuizzes = event.steps.filter((s) => s.type === 'quiz').length;
  const earnedPoints = calculateReward(event, quizAnswers);

  // Track current background image & position (use most recent step that has one)
  const { currentBgImage, currentBgPosition } = useMemo(() => {
    for (let i = currentStep; i >= 0; i--) {
      if (i < event.steps.length && event.steps[i].backgroundImage) {
        return {
          currentBgImage: event.steps[i].backgroundImage,
          currentBgPosition: event.steps[i].backgroundPosition,
        };
      }
    }
    return { currentBgImage: undefined, currentBgPosition: undefined };
  }, [currentStep, event.steps]);

  // Track current character image override (use most recent step that has one)
  const currentCharImage = useMemo(() => {
    for (let i = currentStep; i >= 0; i--) {
      if (i < event.steps.length && event.steps[i].characterImage) {
        return event.steps[i].characterImage;
      }
    }
    return undefined;
  }, [currentStep, event.steps]);

  // Build character with possible image override
  const displayCharacter = useMemo(() => {
    const charImage = currentCharImage ?? event.character.image;
    if (charImage !== event.character.image) {
      return { ...event.character, image: charImage };
    }
    return event.character;
  }, [event.character, currentCharImage]);

  // Determine if character should speak
  const isSpeaking = gameState === 'DIALOG' && currentStepData?.type === 'dialog';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <GameBackground eraId={event.eraId} backgroundImage={currentBgImage} backgroundPosition={currentBgPosition} />

      {/* Content wrapper - above background */}
      <div className="relative z-10">
      {/* HUD */}
      <GameHUD
        currentStep={currentStep}
        totalSteps={event.steps.length}
        points={earnedPoints}
        eventTitle={lg.eventTitle(event)}
      />

      {/* Character - fixed at bottom, overlapping dialog box */}
      {gameState === 'DIALOG' && currentStepData?.type === 'dialog' && (
        <div className="fixed bottom-0 left-4 z-30 sm:left-[10%]">
          <CharacterSprite
            character={displayCharacter}
            speaking={isSpeaking}
            className="animate-fade-in"
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-48 pt-20">
        {/* Narration visual */}
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
          text={lg.stepText(currentStepData) ?? ''}
          speaker={lg.stepSpeaker(currentStepData)}
          onComplete={handleDialogComplete}
            onBack={currentStep > 0 ? handleDialogBack : undefined}
        />
      )}

      {/* Quiz modal */}
      {gameState === 'QUIZ' && currentStepData?.quiz && (() => {
        const localizedQuiz = {
          ...currentStepData.quiz,
          question: lg.quizQuestion(currentStepData.quiz),
          options: lg.quizOptions(currentStepData.quiz),
          explanation: lg.quizExplanation(currentStepData.quiz),
        };
        return <QuizModal key={currentStepData.id} quiz={localizedQuiz} onAnswer={handleQuizAnswer} onContinue={handleQuizContinue} />;
      })()}

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
    </div>
  );
}
