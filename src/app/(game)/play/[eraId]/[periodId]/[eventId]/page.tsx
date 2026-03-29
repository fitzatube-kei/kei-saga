'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { getEvent } from '@/data/eras/content';
import { loadProgress } from '@/lib/firebase/progress';
import { NarrationEngine } from '@/components/game/NarrationEngine';
import { Loading } from '@/components/ui';
import type { GameEvent, GameProgress } from '@/types/game';

export default function GameScreen() {
  const params = useParams();
  const eraId = params.eraId as string;
  const periodId = params.periodId as string;
  const eventId = params.eventId as string;

  const user = useAuthStore((s) => s.user);
  const initialized = useAuthStore((s) => s.initialized);
  const { t } = useTranslation();

  const [event, setEvent] = useState<GameEvent | null | undefined>(undefined);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Load event data (static, no dependency on user)
  useEffect(() => {
    const found = getEvent(eraId, periodId, eventId);
    setEvent(found ?? null);
    if (!found) setLoading(false);
  }, [eraId, periodId, eventId]);

  // Load progress from Firestore once user is available
  useEffect(() => {
    if (!event || event === undefined) return;
    if (!user) {
      setLoading(false);
      return;
    }

    loadProgress(user.uid, eventId)
      .then((p) => setProgress(p))
      .catch((err) => console.error('Failed to load progress:', err))
      .finally(() => setLoading(false));
  }, [event, user, eventId]);

  if (loading || event === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading size="lg" text={t('game.loading')} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gold">
            {t('game.eventNotFound')}
          </h1>
          <p className="mb-6 text-white/50">
            {t('game.eventNotFoundSub')}
          </p>
          <Link
            href="/play"
            className="inline-block rounded-lg bg-gold px-6 py-3 font-bold text-background transition-all hover:brightness-110"
          >
            {t('game.backToEras')}
          </Link>
        </div>
      </div>
    );
  }

  // 로그아웃 상태: 고조선만 플레이 가능 (포인트 없음)
  if (!user) {
    if (eraId !== 'gojoseon') {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gold">
              {t('game.loginRequired')}
            </h1>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-lg bg-gold px-6 py-3 font-bold text-background"
            >
              {t('auth.login')}
            </Link>
          </div>
        </div>
      );
    }

    // 비로그인 고조선 플레이: userId를 'guest'로, 포인트 저장 안 됨
    return (
      <NarrationEngine
        event={event}
        initialProgress={null}
        userId="guest"
      />
    );
  }

  return (
    <NarrationEngine
      event={event}
      initialProgress={progress}
      userId={user.uid}
    />
  );
}
