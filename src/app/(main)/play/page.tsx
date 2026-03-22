'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { getEras } from '@/data/eras/content';
import { useTranslation } from '@/hooks/useTranslation';

// 콘텐츠가 있는 시대는 모두 해금
const UNLOCKED_ERAS = new Set([
  'gojoseon',
  'samguk-early',
  'samguk-late',
  'unified-silla',
  'balhae',
  'goryeo-early',
  'goryeo-late',
  'joseon-early',
  'joseon-late',
  'daehan-empire',
  'japanese-colonial',
  'modern',
]);

export default function PlayPage() {
  const eras = getEras();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gold text-glow md:text-4xl">
            {t('play.selectEra')}
          </h1>
          <p className="mt-2 text-white/50">
            {t('play.selectEraSub')}
          </p>
        </div>

        {/* Era grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => {
            const isUnlocked = UNLOCKED_ERAS.has(era.id);

            return isUnlocked ? (
              <Link
                key={era.id}
                href={`/play/${era.id}`}
                className={cn(
                  'group relative overflow-hidden rounded-lg border border-gold/20 p-5',
                  'bg-surface transition-all duration-300',
                  'hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,160,23,0.2)]',
                  'active:scale-[0.98]'
                )}
              >
                {/* Color accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: era.imageColor }}
                />

                {/* Era icon placeholder */}
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${era.imageColor}30` }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: era.imageColor }}
                  >
                    {era.name.charAt(0)}
                  </span>
                </div>

                <h2 className="mb-1 text-lg font-bold text-gold">
                  {era.name}
                </h2>
                <p className="mb-2 text-xs font-medium text-gold/60">
                  {era.period}
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  {era.description}
                </p>

                {/* Period count */}
                {era.periods.length > 0 && (
                  <p className="mt-3 text-xs text-gold/50">
                    {era.periods.length}{t('play.periodsIncluded')}
                  </p>
                )}
              </Link>
            ) : (
              <div
                key={era.id}
                className={cn(
                  'relative overflow-hidden rounded-lg border border-white/5 p-5',
                  'bg-surface/50 opacity-60'
                )}
              >
                {/* Color accent bar (muted) */}
                <div
                  className="absolute inset-x-0 top-0 h-1 opacity-30"
                  style={{ backgroundColor: era.imageColor }}
                />

                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="flex flex-col items-center gap-1">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/40"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-xs font-medium text-white/40">
                      {t('play.locked')}
                    </span>
                  </div>
                </div>

                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${era.imageColor}15` }}
                >
                  <span
                    className="text-lg font-bold opacity-40"
                    style={{ color: era.imageColor }}
                  >
                    {era.name.charAt(0)}
                  </span>
                </div>

                <h2 className="mb-1 text-lg font-bold text-white/30">
                  {era.name}
                </h2>
                <p className="mb-2 text-xs font-medium text-white/20">
                  {era.period}
                </p>
                <p className="text-sm leading-relaxed text-white/20">
                  {era.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
