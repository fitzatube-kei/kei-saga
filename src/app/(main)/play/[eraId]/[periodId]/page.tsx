'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { getEra, getPeriod } from '@/data/eras/content';
import { useAuth } from '@/hooks/useAuth';
import { getAllUserProgress } from '@/lib/firebase/progress';
import { Loading } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
import type { GameProgress } from '@/types/game';

export default function PeriodPage() {
  const params = useParams();
  const eraId = params.eraId as string;
  const periodId = params.periodId as string;
  const era = getEra(eraId);
  const period = getPeriod(eraId, periodId);
  const { user, initialized } = useAuth();
  const { t } = useTranslation();
  const lg = useLocalizedGame();
  const [completedMap, setCompletedMap] = useState<Record<string, GameProgress>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!initialized) return;
    if (!user) {
      setLoadingProgress(false);
      return;
    }
    setLoadingProgress(true);
    getAllUserProgress(user.uid)
      .then((progressList) => {
        const map: Record<string, GameProgress> = {};
        for (const p of progressList) {
          if (p.completed) {
            map[p.eventId] = p;
          }
        }
        setCompletedMap(map);
      })
      .catch((err) => {
        console.error('Failed to load progress:', err);
      })
      .finally(() => setLoadingProgress(false));
  }, [user, initialized]);

  if (!era || !period) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="text-lg text-gold">{t('play.eraNotFound')}</p>
        <Link href="/play" className="mt-4 text-sm text-gold/60 hover:underline">
          {t('game.backToEras')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
          <Link href="/play" className="transition-colors hover:text-gold">
            {t('nav.play')}
          </Link>
          <span>/</span>
          <Link
            href={`/play/${era.id}`}
            className="transition-colors hover:text-gold"
          >
            {lg.eraName(era)}
          </Link>
          <span>/</span>
          <span className="text-gold">{lg.periodName(period)}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gold md:text-3xl">
            {lg.periodName(period)}
          </h1>
          <p className="mt-1 text-sm text-gold/60">{period.years}</p>
          <p className="mt-2 text-white/60">{lg.periodDesc(period)}</p>
        </div>

        {/* Events list */}
        {loadingProgress ? (
          <div className="flex justify-center py-12">
            <Loading text={t('common.loading')} />
          </div>
        ) : period.events.length === 0 ? (
          <div className="rounded-lg border border-gold/10 bg-surface p-8 text-center">
            <p className="text-white/50">{t('play.noEvents')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {period.events.map((event) => {
              const completed = !!completedMap[event.id];
              const diffKey = `play.difficulty.${event.difficulty}` as const;
              const diffColor = event.difficulty === 'easy' ? 'text-success' : event.difficulty === 'hard' ? 'text-danger' : 'text-goldLight';

              return (
                <Link
                  key={event.id}
                  href={`/play/${era.id}/${period.id}/${event.id}`}
                  className={cn(
                    'group relative overflow-hidden rounded-lg border bg-surface p-5',
                    'transition-all duration-200',
                    completed
                      ? 'border-success/20 hover:border-success/40'
                      : 'border-gold/20 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(212,160,23,0.15)]',
                    'active:scale-[0.99]'
                  )}
                >
                  {/* Completed badge */}
                  {completed && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-success"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-xs font-medium text-success">
                        {t('play.completed')}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Character preview */}
                    <div
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${event.character.primaryColor}25`,
                      }}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{ color: event.character.primaryColor }}
                      >
                        {event.character.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2
                        className={cn(
                          'text-lg font-bold',
                          completed
                            ? 'text-white/70'
                            : 'text-gold group-hover:text-goldLight'
                        )}
                      >
                        {lg.eventTitle(event)}
                      </h2>
                      <p className="mt-0.5 text-sm text-white/50">
                        {lg.charName(event.character)} - {lg.charTitle(event.character)}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-white/40">
                        {lg.eventDesc(event)}
                      </p>

                      {/* Meta info */}
                      <div className="mt-3 flex items-center gap-4">
                        <span className={cn('text-xs font-medium', diffColor)}>
                          {t(diffKey)}
                        </span>
                        <span className="text-xs text-goldLight/70">
                          +{event.pointReward} {t('play.points')}
                        </span>
                        <span className="text-xs text-white/30">
                          {event.steps.length}{t('play.steps')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
