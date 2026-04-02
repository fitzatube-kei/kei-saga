'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { getEra } from '@/data/eras/content';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';

const ERA_BG: Record<string, { src: string; position?: string }> = {
  'gojoseon': { src: '/images/play/gojosun_real_001.png' },
  'samguk-early': { src: '/images/play/treekingdomsearly_real_001.png' },
  'samguk-late': { src: '/images/play/treekingdomslate_real_001.png' },
  'unified-silla': { src: '/images/play/Silla_real_001.png', position: 'top' },
  'balhae': { src: '/images/play/Balhae_real_001.png', position: 'top' },
  'goryeo-early': { src: '/images/play/goryeoearly_real_001.png', position: 'top' },
  'goryeo-late': { src: '/images/play/goryeolate_real_001.png' },
  'joseon-early': { src: '/images/play/joseonearly_real_001.png', position: 'top' },
  'joseon-late': { src: '/images/play/joseonlate_real_001.png', position: 'top' },
  'daehan-empire': { src: '/images/play/koreanempire_real_001.png' },
  'japanese-colonial': { src: '/images/play/japanese Colonial_real_001.png', position: 'top' },
  'modern': { src: '/images/play/modern_real_001.png' },
};

export default function EraPage() {
  const params = useParams();
  const eraId = params.eraId as string;
  const era = getEra(eraId);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const { t } = useTranslation();
  const lg = useLocalizedGame();

  useEffect(() => {
    if (!user && eraId !== 'gojoseon') {
      router.replace('/login');
    }
  }, [user, eraId, router]);

  if (!era) {
    notFound();
  }

  const bg = ERA_BG[era.id];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Banner ── */}
      <section className="relative -mx-4 -mt-16 w-[calc(100%+2rem)] overflow-hidden lg:-mx-8 lg:w-[calc(100%+4rem)]">
        {/* Background image */}
        {bg && (
          <Image
            src={bg.src}
            alt={era.name}
            fill
            className={cn('object-cover', bg.position === 'top' ? 'object-top' : 'object-center')}
            sizes="100vw"
            priority
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-20 pb-6 sm:pb-8 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/50">
            <Link href="/play" className="transition-colors hover:text-gold">
              {t('nav.play')}
            </Link>
            <span>/</span>
            <span className="text-white/80">{lg.eraName(era)}</span>
          </nav>

          {/* Era icon + title */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${era.imageColor}50` }}
            >
              <span className="text-lg font-bold text-white">
                {era.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                {lg.eraName(era)}
              </h1>
              <p className="text-sm text-gold/80">{era.period}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
            {lg.eraDesc(era)}
          </p>
        </div>
      </section>

      {/* ── Periods list ── */}
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 lg:px-12">
        {era.periods.length === 0 ? (
          <div className="rounded-lg border border-gold/10 bg-surface p-8 text-center">
            <p className="text-white/50">
              {t('play.noPeriodsYet')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {era.periods.map((period) => (
              <Link
                key={period.id}
                href={`/play/${era.id}/${period.id}`}
                className={cn(
                  'group rounded-lg border border-gold/20 bg-surface p-5',
                  'transition-all duration-200',
                  'hover:border-gold/40 hover:shadow-[0_0_15px_rgba(212,160,23,0.15)]',
                  'active:scale-[0.99]'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gold group-hover:text-goldLight">
                      {lg.periodName(period)}
                    </h2>
                    <p className="mt-0.5 text-sm text-gold/50">
                      {period.years}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {lg.periodDesc(period)}
                    </p>
                  </div>

                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {period.events.length}{t('play.events')}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-2 text-gold/40 transition-colors group-hover:text-gold"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
