'use client';

import { useCallback } from 'react';
import { useLangStore } from '@/stores/langStore';
import { t as translate } from '@/lib/i18n/translations';

export function useTranslation() {
  const lang = useLangStore((s) => s.lang);

  const t = useCallback(
    (key: string) => translate(key, lang),
    [lang]
  );

  return { t, lang };
}
