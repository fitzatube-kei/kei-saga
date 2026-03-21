import { GameEvent, GameProgress, DialogStep, GameState } from '@/types/game';

export function initializeProgress(event: GameEvent): GameProgress {
  return {
    eventId: event.id,
    currentStep: 0,
    quizAnswers: [],
    completed: false,
    earnedPoints: 0,
    lastUpdated: new Date(),
  };
}

export function getNextState(step: DialogStep): GameState {
  switch (step.type) {
    case 'quiz':
      return 'QUIZ';
    case 'dialog':
    case 'narration':
    default:
      return 'DIALOG';
  }
}

export function calculateReward(
  event: GameEvent,
  quizAnswers: { stepId: string; correct: boolean }[]
): number {
  const correctCount = quizAnswers.filter((a) => a.correct).length;
  const totalQuizzes = event.steps.filter((s) => s.type === 'quiz').length;
  const accuracy = totalQuizzes > 0 ? correctCount / totalQuizzes : 1;
  return Math.round(event.pointReward * accuracy);
}

export function isEventComplete(
  event: GameEvent,
  currentStep: number
): boolean {
  return currentStep >= event.steps.length;
}
