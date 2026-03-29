import { create } from 'zustand';
import type { GameEvent, GameState, GameProgress } from '@/types/game';

interface QuizAnswer {
  stepId: string;
  correct: boolean;
}

interface GameStoreState {
  currentEvent: GameEvent | null;
  currentStep: number;
  gameState: GameState;
  progress: GameProgress | null;
  quizAnswers: QuizAnswer[];
}

interface GameStoreActions {
  startGame: (event: GameEvent) => void;
  nextStep: () => void;
  prevStep: () => void;
  answerQuiz: (stepId: string, correct: boolean) => void;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
  loadProgress: (progress: GameProgress, event: GameEvent) => void;
}

const initialState: GameStoreState = {
  currentEvent: null,
  currentStep: 0,
  gameState: 'LOADING',
  progress: null,
  quizAnswers: [],
};

export const useGameStore = create<GameStoreState & GameStoreActions>((set) => ({
  ...initialState,

  startGame: (event) =>
    set({
      currentEvent: event,
      currentStep: 0,
      gameState: 'DIALOG',
      quizAnswers: [],
      progress: {
        eventId: event.id,
        currentStep: 0,
        quizAnswers: [],
        completed: false,
        earnedPoints: 0,
        lastUpdated: new Date(),
      },
    }),

  nextStep: () =>
    set((state) => {
      if (!state.currentEvent) return state;

      const nextStep = state.currentStep + 1;
      const totalSteps = state.currentEvent.steps.length;

      if (nextStep >= totalSteps) {
        return {
          currentStep: nextStep,
          gameState: 'REWARD',
          progress: state.progress
            ? {
                ...state.progress,
                currentStep: nextStep,
                completed: true,
                earnedPoints: state.currentEvent.pointReward,
                lastUpdated: new Date(),
              }
            : null,
        };
      }

      const nextStepData = state.currentEvent.steps[nextStep];
      const newGameState: GameState = nextStepData.type === 'quiz' ? 'QUIZ' : 'DIALOG';

      return {
        currentStep: nextStep,
        gameState: newGameState,
        progress: state.progress
          ? {
              ...state.progress,
              currentStep: nextStep,
              lastUpdated: new Date(),
            }
          : null,
      };
    }),

  prevStep: () =>
    set((state) => {
      if (!state.currentEvent || state.currentStep <= 0) return state;

      const prevStep = state.currentStep - 1;
      const prevStepData = state.currentEvent.steps[prevStep];
      const newGameState: GameState = prevStepData.type === 'quiz' ? 'QUIZ' : 'DIALOG';

      return {
        currentStep: prevStep,
        gameState: newGameState,
        progress: state.progress
          ? {
              ...state.progress,
              currentStep: prevStep,
              lastUpdated: new Date(),
            }
          : null,
      };
    }),

  answerQuiz: (stepId, correct) =>
    set((state) => {
      const newAnswer: QuizAnswer = { stepId, correct };
      const updatedAnswers = [...state.quizAnswers, newAnswer];

      return {
        quizAnswers: updatedAnswers,
        progress: state.progress
          ? {
              ...state.progress,
              quizAnswers: [...state.progress.quizAnswers, newAnswer],
              lastUpdated: new Date(),
            }
          : null,
      };
    }),

  setGameState: (gameState) => set({ gameState }),

  resetGame: () => set({ ...initialState }),

  loadProgress: (progress, event) =>
    set({
      currentEvent: event,
      progress,
      currentStep: progress.currentStep,
      quizAnswers: progress.quizAnswers,
      gameState: progress.completed ? 'COMPLETE' : 'DIALOG',
    }),
}));
