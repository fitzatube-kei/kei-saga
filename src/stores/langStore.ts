import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LangCode = 'ko' | 'en' | 'es' | 'ja' | 'th' | 'vi' | 'zh-CN' | 'zh-TW';

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
];

interface LangState {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'ko',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'keisaga-lang' }
  )
);
