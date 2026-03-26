'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { getEras } from '@/data/eras/content';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';

// 시대 ID → 배경 이미지 매핑
const ERA_BG_IMAGES: Record<string, string> = {
  'gojoseon': '/images/play/gojosun_real_001.png',
  'samguk-early': '/images/play/treekingdomsearly_real_001.png',
  'samguk-late': '/images/play/treekingdomslate_real_001.png',
  'unified-silla': '/images/play/Silla_real_001.png',
  'balhae': '/images/play/Balhae_real_001.png',
  'goryeo-early': '/images/play/goryeoearly_real_001.png',
  'goryeo-late': '/images/play/goryeolate_real_001.png',
  'joseon-early': '/images/play/joseonearly_real_001.png',
  'joseon-late': '/images/play/joseonlate_real_001.png',
  'daehan-empire': '/images/play/koreanempire_real_001.png',
  'japanese-colonial': '/images/play/japanese Colonial_real_001.png',
  'modern': '/images/play/seokguam_real_001.png',
};

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
  const lg = useLocalizedGame();

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
            const bgImage = ERA_BG_IMAGES[era.id];

            return isUnlocked ? (
              <Link
                key={era.id}
                href={`/play/${era.id}`}
                className={cn(
                  'group relative overflow-hidden rounded-lg border border-gold/20',
                  'transition-all duration-300',
                  'hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,160,23,0.2)]',
                  'active:scale-[0.98]'
                )}
              >
                {/* Background image */}
                {bgImage && (
                  <Image
                    src={bgImage}
                    alt={era.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

                {/* Color accent bar */}
                <div
                  className="absolute inset-x-0 top-0 z-10 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: era.imageColor }}
                />

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Era icon placeholder */}
                  <div
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${era.imageColor}50` }}
                  >
                    <span
                      className="text-lg font-bold text-white"
                    >
                      {era.name.charAt(0)}
                    </span>
                  </div>

                  <h2 className="mb-1 text-lg font-bold text-gold">
                    {lg.eraName(era)}
                  </h2>
                  <p className="mb-2 text-xs font-medium text-gold/80">
                    {era.period}
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    {lg.eraDesc(era)}
                  </p>

                  {/* Period count */}
                  {era.periods.length > 0 && (
                    <p className="mt-3 text-xs text-gold/60">
                      {era.periods.length}{t('play.periodsIncluded')}
                    </p>
                  )}
                </div>
              </Link>
            ) : (
              <div
                key={era.id}
                className={cn(
                  'relative overflow-hidden rounded-lg border border-white/5',
                  'opacity-60'
                )}
              >
                {/* Background image (muted) */}
                {bgImage && (
                  <Image
                    src={bgImage}
                    alt={era.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}

                {/* Darker overlay for locked state */}
                <div className="absolute inset-0 bg-black/70" />

                {/* Color accent bar (muted) */}
                <div
                  className="absolute inset-x-0 top-0 z-10 h-1 opacity-30"
                  style={{ backgroundColor: era.imageColor }}
                />

                {/* Lock overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
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

                {/* Content */}
                <div className="relative z-10 p-5">
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
                    {lg.eraName(era)}
                  </h2>
                  <p className="mb-2 text-xs font-medium text-white/20">
                    {era.period}
                  </p>
                  <p className="text-sm leading-relaxed text-white/20">
                    {lg.eraDesc(era)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
