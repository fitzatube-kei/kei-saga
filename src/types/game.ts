/** Map of translations keyed by language code (Korean is always the base field) */
export type MultilingualText = {
  en: string;
  es?: string;
  ja?: string;
  th?: string;
  vi?: string;
  'zh-CN'?: string;
  'zh-TW'?: string;
};

export interface Era {
  id: string;
  name: string;
  nameI18n?: MultilingualText;
  period: string;
  description: string;
  descriptionI18n?: MultilingualText;
  imageColor: string;
  order: number;
  periods: Period[];
}

export interface Period {
  id: string;
  eraId: string;
  name: string;
  nameI18n?: MultilingualText;
  years: string;
  description: string;
  descriptionI18n?: MultilingualText;
  events: GameEvent[];
}

export interface GameEvent {
  id: string;
  periodId: string;
  eraId: string;
  title: string;
  titleI18n?: MultilingualText;
  description: string;
  descriptionI18n?: MultilingualText;
  character: Character;
  steps: DialogStep[];
  difficulty: 'easy' | 'medium' | 'hard';
  pointReward: number;
}

export interface Character {
  id: string;
  name: string;
  nameI18n?: MultilingualText;
  title: string;
  titleI18n?: MultilingualText;
  description: string;
  descriptionI18n?: MultilingualText;
  primaryColor: string;
  secondaryColor: string;
  image?: string;
}

export interface DialogStep {
  id: string;
  type: 'narration' | 'dialog' | 'quiz';
  speaker?: string;
  speakerI18n?: MultilingualText;
  text?: string;
  textI18n?: MultilingualText;
  quiz?: Quiz;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundPosition?: string;
  characterImage?: string;
}

export interface Quiz {
  question: string;
  questionI18n?: MultilingualText;
  options: string[];
  optionsI18n?: { [lang: string]: string[] };
  correctIndex: number;
  explanation: string;
  explanationI18n?: MultilingualText;
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
