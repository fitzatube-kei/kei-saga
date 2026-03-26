import { useLangStore, type LangCode } from '@/stores/langStore';
import type { Era, Period, GameEvent, Character, DialogStep, Quiz, MultilingualText } from '@/types/game';

/** Resolve a multilingual field: check i18n map → fallback to Korean base value */
function resolve(base: string, i18n: MultilingualText | undefined, lang: LangCode): string {
  if (lang === 'ko') return base;
  if (!i18n) return base;
  const val = (i18n as Record<string, string | undefined>)[lang];
  if (val) return val;
  // Fallback to English, then Korean
  return i18n.en || base;
}

function resolveArr(base: string[], i18n: { [lang: string]: string[] } | undefined, lang: LangCode): string[] {
  if (lang === 'ko') return base;
  if (!i18n) return base;
  const val = i18n[lang];
  if (val) return val;
  return i18n.en || base;
}

export function useLocalizedGame() {
  const lang = useLangStore((s) => s.lang);

  const eraName = (era: Era) => resolve(era.name, era.nameI18n, lang);
  const eraDesc = (era: Era) => resolve(era.description, era.descriptionI18n, lang);

  const periodName = (period: Period) => resolve(period.name, period.nameI18n, lang);
  const periodDesc = (period: Period) => resolve(period.description, period.descriptionI18n, lang);

  const eventTitle = (event: GameEvent) => resolve(event.title, event.titleI18n, lang);
  const eventDesc = (event: GameEvent) => resolve(event.description, event.descriptionI18n, lang);

  const charName = (char: Character) => resolve(char.name, char.nameI18n, lang);
  const charTitle = (char: Character) => resolve(char.title, char.titleI18n, lang);
  const charDesc = (char: Character) => resolve(char.description, char.descriptionI18n, lang);

  const stepSpeaker = (step: DialogStep) => resolve(step.speaker ?? '', step.speakerI18n, lang) || undefined;
  const stepText = (step: DialogStep) => resolve(step.text ?? '', step.textI18n, lang) || undefined;

  const quizQuestion = (quiz: Quiz) => resolve(quiz.question, quiz.questionI18n, lang);
  const quizOptions = (quiz: Quiz) => resolveArr(quiz.options, quiz.optionsI18n, lang);
  const quizExplanation = (quiz: Quiz) => resolve(quiz.explanation, quiz.explanationI18n, lang);

  return {
    eraName, eraDesc,
    periodName, periodDesc,
    eventTitle, eventDesc,
    charName, charTitle, charDesc,
    stepSpeaker, stepText,
    quizQuestion, quizOptions, quizExplanation,
  };
}
