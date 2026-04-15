'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
import { useTranslation } from '@/hooks/useTranslation';
import { getEras } from '@/data/eras/content';
import { cn } from '@/lib/utils/cn';

const ERA_THUMB: Record<string, string> = {
  'gojoseon': '/images/play/bg/gojoseon/bg_001.png',
  'samguk-early': '/images/play/bg/samguk-early/bg_se_004.png',
  'samguk-late': '/images/play/bg/samguk-late/bg_sl_001.png',
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

type Scene = {
  key: string;
  title: string;
  period: string;
  eraName: string;
  thumb: string;
  href: string;
  viewers: string;
  likes: number;
};

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const lg = useLocalizedGame();
  const { t } = useTranslation();
  const isLoggedIn = !!user;

  const [sortMode, setSortMode] = useState<'era' | 'popular'>('popular');

  const scenes = useMemo<Scene[]>(() => {
    const eras = getEras();
    const list: (Scene & { popularity: number })[] = [];
    const viewerSamples = ['78.4K', '62.1K', '54.3K', '48.9K', '41.2K', '37.6K', '29.8K', '24.5K', '21.3K', '18.7K', '15.2K', '12.8K', '10.4K', '8.9K'];
    const likeSamples = [256, 198, 172, 143, 121, 98, 84, 67, 55, 48, 41, 33, 27, 21];

    eras.forEach((era) => {
      era.periods.forEach((period) => {
        period.events.forEach((ev) => {
          const stepThumb = ev.steps.find((s) => s.backgroundImage)?.backgroundImage;
          const key = `${era.id}-${period.id}-${ev.id}`;
          // Deterministic popularity score per scene (stable across renders)
          let hash = 0;
          for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
          list.push({
            key,
            title: lg.eventTitle(ev),
            period: era.period,
            eraName: lg.eraName(era),
            thumb: stepThumb ?? ERA_THUMB[era.id] ?? '/images/play/gojosun_real_001.png',
            href:
              isLoggedIn || era.id === 'gojoseon'
                ? `/play/${era.id}/${period.id}/${ev.id}`
                : '/login',
            viewers: '',
            likes: 0,
            popularity: Math.abs(hash),
          });
        });
      });
    });

    const trimmed = list.slice(0, 14);

    // Rank by popularity to assign stats (highest popularity → highest viewers/likes)
    const byPopularity = [...trimmed].sort((a, b) => b.popularity - a.popularity);
    const statsByKey = new Map<string, { viewers: string; likes: number }>();
    byPopularity.forEach((s, i) => {
      statsByKey.set(s.key, {
        viewers: viewerSamples[i % viewerSamples.length],
        likes: likeSamples[i % likeSamples.length],
      });
    });

    const withStats = trimmed.map((s) => ({
      ...s,
      ...statsByKey.get(s.key)!,
    }));

    // Apply sort
    if (sortMode === 'popular') {
      withStats.sort((a, b) => b.popularity - a.popularity);
    }
    // 'era' keeps chronological order (iteration order of getEras)

    return withStats;
  }, [lg, isLoggedIn, sortMode]);

  const recentScene = scenes[0];

  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const toggleLike = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative -mx-4 -mt-16 min-h-screen w-[calc(100%+2rem)] bg-[#000000] pb-24 lg:-mx-8 lg:w-[calc(100%+4rem)]">
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative h-[380px] w-full overflow-hidden">
        <Image
          src="/images/play/treekingdomslate_real_001.png"
          alt="hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/50 to-[#000000]" />

        <div className="relative z-10 px-5 pt-16">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">K-SAGA</h2>
          <h1 className="mt-3 whitespace-pre-line text-[24px] font-extrabold leading-[1.2] text-white">
            {t('home.welcomeTitle')}
          </h1>
          <p className="mt-3 max-w-[320px] whitespace-pre-line text-[13px] leading-relaxed text-white/70">
            {t('home.welcomeDesc')}
          </p>
        </div>
      </section>

      {/* ── RECENT PLAY ROW ─────────────────────────── */}
      <div className="relative z-10 mx-4 -mt-12">
        {/* Character peeking out above the box (clipped at box bottom) */}
        {isLoggedIn && (
          <div className="pointer-events-none absolute -right-3 -top-[172px] bottom-0 z-0 w-[258px] overflow-hidden lg:right-0 lg:-top-[230px] lg:w-[344px]">
            <Image
              src={`/images/avt/${user?.profileImage ?? 'dangun001'}.png`}
              alt="avatar"
              width={344}
              height={402}
              className="absolute left-0 top-0 h-[302px] w-[258px] object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] lg:h-[402px] lg:w-[344px]"
            />
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between gap-3 rounded-2xl bg-[#1a1a1a] px-4 py-3 shadow-lg">
          <div className="flex min-w-0 items-center gap-2">
            <Image src="/images/icon/compass001.png" width={22} height={22} alt="" className="shrink-0" />
            <span className="shrink-0 text-sm font-bold text-[#f5c842]">{t('home.recentPlay')}</span>
            <span className="truncate text-xs text-white/50">
              {recentScene ? recentScene.title : t('home.noRecentPlay')}
            </span>
          </div>
          <Link
            href={isLoggedIn ? '/mypage' : '/login'}
            className="shrink-0 rounded-full bg-[#f5c842] px-4 py-1.5 text-xs font-bold text-black"
          >
            {t('nav.mypage')}
          </Link>
        </div>
      </div>

      {/* ── SCENE LIST HEADER ───────────────────────── */}
      <div className="mt-7 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-extrabold text-white">{t('home.storyShortcut')}</h3>
          <Link
            href="/play"
            className="rounded-full bg-[#f5c842] px-3 py-1 text-[11px] font-bold text-black"
          >
            {t('home.viewAll')}
          </Link>
        </div>
        <div className="text-[11px]">
          <button
            type="button"
            onClick={() => setSortMode('era')}
            className={cn(
              'transition-colors',
              sortMode === 'era' ? 'font-bold text-[#f5c842]' : 'text-white/50 hover:text-white/70',
            )}
          >
            {t('home.sortByEra')}
          </button>
          <span className="mx-1 text-white/25">|</span>
          <button
            type="button"
            onClick={() => setSortMode('popular')}
            className={cn(
              'transition-colors',
              sortMode === 'popular' ? 'font-bold text-[#f5c842]' : 'text-white/50 hover:text-white/70',
            )}
          >
            {t('home.sortByPopular')}
          </button>
        </div>
      </div>

      {/* ── SCENE CARDS ─────────────────────────────── */}
      <div className="mt-4 space-y-5 px-5">
        {scenes.map((s) => (
          <Link key={s.key} href={s.href} className="flex items-start gap-4">
            <div className="relative h-[92px] w-[136px] shrink-0 overflow-hidden rounded-2xl">
              <Image src={s.thumb} alt={s.title} fill className="object-cover" sizes="136px" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h4 className="truncate text-[16px] font-extrabold text-white">{s.title}</h4>
              <p className="mt-1 text-[11px] text-white/50">
                {s.period} <span className="ml-1 text-white/40">{s.eraName}</span>
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Image src="/images/icon/eye001.png" width={14} height={14} alt="" />
                <span className="text-[11px] text-white/60">{s.viewers} Viewers</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, s.key)}
                  aria-label="like"
                  className="flex h-4 w-4 items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill={liked[s.key] ? '#e85c5c' : 'rgba(255,255,255,0.6)'}
                    className="transition-colors"
                  >
                    <path d="M12 21s-7.5-4.6-9.9-9.1C.4 8.3 2.6 4.5 6.3 4.5c2 0 3.7 1 4.7 2.6C12 5.5 13.7 4.5 15.7 4.5c3.7 0 5.9 3.8 4.2 7.4C19.5 16.4 12 21 12 21z" />
                  </svg>
                </button>
                <span className="text-[11px] text-white/60">
                  LIKE {s.likes + (liked[s.key] ? 1 : 0)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── VIEW ALL BUTTON ─────────────────────────── */}
      <div className="mt-8 flex justify-center px-5">
        <Link
          href="/play"
          className="rounded-full bg-[#f5c842] px-8 py-3 text-sm font-bold text-black shadow-lg transition-transform active:scale-95"
        >
          {t('home.viewAll')}
        </Link>
      </div>
    </div>
  );
}
