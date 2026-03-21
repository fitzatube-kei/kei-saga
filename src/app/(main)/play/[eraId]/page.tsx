'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { getEra } from '@/data/eras/content';
import { useTranslation } from '@/hooks/useTranslation';

export default function EraPage() {
  const params = useParams();
  const eraId = params.eraId as string;
  const era = getEra(eraId);
  const { t } = useTranslation();

  if (!era) {
    notFound();
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
          <span className="text-gold">{era.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${era.imageColor}30` }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: era.imageColor }}
              >
                {era.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gold md:text-3xl">
                {era.name}
              </h1>
              <p className="text-sm text-gold/60">{era.period}</p>
            </div>
          </div>
          <p className="mt-3 text-white/60">{era.description}</p>
        </div>

        {/* Periods list */}
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
                      {period.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-gold/50">
                      {period.years}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {period.description}
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
