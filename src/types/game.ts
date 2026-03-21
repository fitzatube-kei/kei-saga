export interface Era {
  id: string;
  name: string;
  nameEn: string;
  period: string;
  description: string;
  imageColor: string;
  order: number;
  periods: Period[];
}

export interface Period {
  id: string;
  eraId: string;
  name: string;
  years: string;
  description: string;
  events: GameEvent[];
}

export interface GameEvent {
  id: string;
  periodId: string;
  eraId: string;
  title: string;
  description: string;
  character: Character;
  steps: DialogStep[];
  difficulty: 'easy' | 'medium' | 'hard';
  pointReward: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface DialogStep {
  id: string;
  type: 'narration' | 'dialog' | 'quiz';
  speaker?: string;
  text?: string;
  quiz?: Quiz;
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GameProgress {
  eventId: string;
  currentStep: number;
  quizAnswers: { stepId: string; correct: boolean }[];
  completed: boolean;
  earnedPoints: number;
  lastUpdated: Date;
}

export type GameState = 'LOADING' | 'DIALOG' | 'QUIZ' | 'REWARD' | 'COMPLETE';
