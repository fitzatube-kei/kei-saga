'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { t } = useTranslation();
  const lg = useLocalizedGame();
  const [completedMap, setCompletedMap] = useState<Record<string, GameProgress>>({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (initialized && !user && eraId !== 'gojoseon') {
      router.replace('/login');
    }
  }, [initialized, user, eraId, router]);

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

  // Get hero image from the first event's first step
  const heroImage = period.events[0]?.steps[0]?.backgroundImage;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {heroImage && (
        <section className="relative -mx-4 -mt-16 w-[calc(100%+2rem)] overflow-hidden lg:-mx-8 lg:w-[calc(100%+4rem)]">
          <div className="relative h-48 sm:h-56 md:h-64">
            <Image
              src={heroImage}
              alt={lg.periodName(period)}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
          </div>

          {/* Header overlaid on banner */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl">
              <nav className="mb-3 flex items-center gap-2 text-sm text-white/60">
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
              <h1 className="text-2xl font-bold text-gold drop-shadow-lg md:text-3xl">
                {lg.periodName(period)}
              </h1>
              <p className="mt-1 text-sm text-gold/70 drop-shadow">{period.years}</p>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Fallback header when no hero image */}
        {!heroImage && (
          <>
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
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gold md:text-3xl">
                {lg.periodName(period)}
              </h1>
              <p className="mt-1 text-sm text-gold/60">{period.years}</p>
            </div>
          </>
        )}

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-white/50">
          {lg.periodDesc(period)}
        </p>

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
          <div className="flex flex-col gap-5">
            {period.events.map((event, idx) => {
              const completed = !!completedMap[event.id];
              const diffKey = `play.difficulty.${event.difficulty}` as const;
              const diffColor = event.difficulty === 'easy' ? 'text-success' : event.difficulty === 'hard' ? 'text-danger' : 'text-goldLight';
              const cardBg = event.steps[event.steps.length - 1]?.backgroundImage;

              return (
                <Link
                  key={event.id}
                  href={`/play/${era.id}/${period.id}/${event.id}`}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border',
                    'transition-all duration-300',
                    completed
                      ? 'border-success/20 hover:border-success/40'
                      : 'border-gold/15 hover:border-gold/40 hover:shadow-[0_0_20px_rgba(212,160,23,0.12)]',
                    'active:scale-[0.99]'
                  )}
                >
                  {/* Card background image */}
                  {cardBg && (
                    <div className="absolute inset-0">
                      <Image
                        src={cardBg}
                        alt=""
                        fill
                        className="object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                        sizes="(max-width: 768px) 100vw, 896px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
                    </div>
                  )}

                  {/* Completed badge */}
                  {completed && (
                    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 backdrop-blur-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-success">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-xs font-medium text-success">
                        {t('play.completed')}
                      </span>
                    </div>
                  )}

                  <div className="relative z-[1] flex items-center gap-4 p-5">
                    {/* Character image or fallback */}
                    <div className="flex-shrink-0">
                      {event.character.image ? (
                        <div className="relative h-20 w-16 overflow-hidden rounded-lg border border-gold/20 sm:h-24 sm:w-20">
                          <Image
                            src={event.character.image}
                            alt={lg.charName(event.character)}
                            fill
                            className="object-cover object-top"
                            sizes="80px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      ) : (
                        <div
                          className="flex h-20 w-16 items-center justify-center rounded-lg border border-gold/20 sm:h-24 sm:w-20"
                          style={{ backgroundColor: `${event.character.primaryColor}20` }}
                        >
                          <span
                            className="text-3xl font-bold"
                            style={{ color: event.character.primaryColor }}
                          >
                            {event.character.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gold/40">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
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
                      </div>
                      <p className="mt-1 text-sm text-white/45">
                        {lg.charName(event.character)} · {lg.charTitle(event.character)}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-white/35">
                        {lg.eventDesc(event)}
                      </p>

                      {/* Meta */}
                      <div className="mt-3 flex items-center gap-3">
                        <span className={cn('rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium', diffColor)}>
                          {t(diffKey)}
                        </span>
                        <span className="text-xs text-goldLight/60">
                          +{event.pointReward} {t('play.points')}
                        </span>
                        <span className="text-xs text-white/25">
                          {event.steps.length}{t('play.steps')}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="flex-shrink-0 text-gold/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold/60"
                    >
                      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
