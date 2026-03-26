'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
import { getEras } from '@/data/eras/content';

const ERA_IMAGES: Record<string, { src: string; position?: string }> = {
  'gojoseon': { src: '/images/play/gojosun_real_001.png' },
  'samguk-early': { src: '/images/play/treekingdomsearly_real_001.png', position: 'top' },
  'samguk-late': { src: '/images/play/treekingdomslate_real_001.png' },
  'unified-silla': { src: '/images/play/Silla_real_001.png', position: 'top' },
  'balhae': { src: '/images/play/Balhae_real_001.png', position: 'top' },
  'goryeo-early': { src: '/images/play/goryeoearly_real_001.png', position: 'top' },
  'goryeo-late': { src: '/images/play/goryeolate_real_001.png' },
  'joseon-early': { src: '/images/play/joseonearly_real_001.png', position: 'top' },
  'joseon-late': { src: '/images/play/joseonlate_real_001.png', position: 'top' },
  'daehan-empire': { src: '/images/play/koreanempire_real_001.png' },
  'japanese-colonial': { src: '/images/play/japanese Colonial_real_001.png', position: 'top' },
  'modern': { src: '/images/play/seokguam_real_001.png', position: 'top' },
};

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();
  const lg = useLocalizedGame();

  // 페이지 로드 시 랜덤 3개 시대 선택
  const randomEras = useMemo(() => {
    const allEras = getEras();
    const shuffled = [...allEras].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  if (!user) return null;

  return (
    <>
      {/* ── Hero Banner — full width, 20vh, danchung bg with text & character ── */}
      {/* negative margin to cancel layout's px-4 pt-16 lg:px-8 */}
      <section className="relative -mx-4 -mt-16 w-[calc(100%+2rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
        {/* Danchung background — always centered */}
        <Image
          src="/images/home/danchung_real_001.png"
          alt="단청"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a1128]/60" />

        {/* Content wrapper — pt includes header height (4rem) */}
        <div className="relative z-10 mx-auto flex max-w-lg items-center justify-between px-4 pt-20 pb-5 sm:px-6 sm:pb-6 md:max-w-2xl md:px-8 lg:max-w-4xl lg:px-12 lg:pb-8">
          {/* Left text + button */}
          <div className="flex-1">
            <h2 className="text-sm font-bold leading-snug text-white whitespace-pre-line sm:text-base md:text-lg lg:text-xl">
              {t('home.welcomeTitle')}
            </h2>
            <p className="mt-2 text-[10px] leading-relaxed text-white/90 whitespace-pre-line sm:text-xs md:whitespace-normal md:text-sm lg:text-base">
              {t('home.welcomeDesc')}
            </p>
            <Link href="/play" className="mt-3 inline-block sm:mt-4">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold to-goldLight px-5 py-2 text-xs font-bold text-background shadow-lg shadow-gold/25 transition-all hover:brightness-110 active:scale-[0.98] sm:px-6 sm:py-2.5 sm:text-sm md:rounded-xl md:px-8 md:py-3 md:text-base"
              >
                <span>&#9654;</span>
                {t('home.startAdventure')}
              </button>
            </Link>
          </div>

          {/* Sejong character — right side */}
          <div className="pointer-events-none relative mr-4 h-28 w-24 shrink-0 scale-[1.2] origin-bottom sm:mr-2 sm:h-32 sm:w-28 md:mr-0 md:h-40 md:w-36 lg:h-48 lg:w-44">
            <Image
              src="/images/home/sejong_illust001.png"
              alt="세종대왕"
              fill
              className="object-contain object-bottom drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
            />
          </div>
        </div>
      </section>

    <div className="mx-auto max-w-lg space-y-5 py-2 md:max-w-2xl lg:max-w-4xl">

      {/* ── MY AVATA + Recent Activity + Button ── */}
      <section className="relative overflow-hidden space-y-3 px-1 sm:space-y-4 md:space-y-5 lg:space-y-6">
        {/* joonjun character - responsive size & position, pushed down so button covers bottom */}
        <div className="pointer-events-none absolute right-2 top-8 bottom-0 w-32 sm:right-4 sm:top-10 sm:w-40 md:right-6 md:top-12 md:w-48 lg:right-8 lg:top-10 lg:w-56 z-0 scale-110 origin-bottom-right">
          <Image
            src="/images/home/girl_illust001.png"
            alt="캐릭터"
            width={400}
            height={560}
            className="w-32 max-w-none sm:w-40 md:w-48 lg:w-56"
          />
        </div>

        {/* MY AVATAR */}
        <div className="relative z-10">
          <div>
            <h3 className="text-base font-bold text-[#FFC100] sm:text-lg md:text-xl lg:text-2xl">{t('home.myAvatar')}</h3>
            <p className="mt-0.5 text-xs text-white/70 sm:mt-1 sm:text-sm md:text-base">
              <span className="text-white/50">{t('home.nickLabel')}: </span>
              <span className="font-medium text-white">{user.nickname}</span>
            </p>
            <div className="mt-1.5 flex gap-1.5 sm:mt-2 sm:gap-2">
              <span className="inline-flex items-center rounded-full border border-[#FFC100]/20 bg-[#FFC100]/10 px-3 py-1 text-[10px] font-semibold text-[#FFC100] sm:px-4 sm:py-1.5 sm:text-xs md:text-sm">
                Level {user.level}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#FFC100]/20 bg-[#FFC100]/10 px-3 py-1 text-[10px] font-semibold text-[#FFC100] sm:px-4 sm:py-1.5 sm:text-xs md:text-sm">
                Point {(user.points ?? 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 최근 활동기록 */}
        <div className="relative z-10">
          <h4 className="text-xs font-bold text-gold sm:text-sm md:text-base">{t('home.recentActivity')}</h4>
          <p className="mt-0.5 text-[10px] leading-relaxed text-white/50 sm:mt-1 sm:text-xs md:text-sm">
            {t('home.noActivity')}{' '}
            <span className="inline md:inline">{t('home.noActivitySub')}</span>
          </p>
        </div>

        {/* 모험 이어서하기 Button */}
        <Link href={user.lastPlayedEraId ? `/play/${user.lastPlayedEraId}` : '/play'} className="relative z-10 block">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC100] py-3 text-sm font-bold text-background shadow-lg shadow-[#FFC100]/25 transition-all hover:brightness-110 active:scale-[0.98] sm:py-3.5 sm:text-base md:rounded-2xl md:py-4 md:text-lg lg:py-5 lg:text-xl"
          >
            <span>&#9654;</span>
            {t('home.continueAdventure')}
          </button>
        </Link>
      </section>

      {/* ── Select an Era ── */}
      <div className="flex items-center justify-between px-1">
        <Link href="/play" className="text-base font-bold text-[#FFC100] transition-colors hover:brightness-110 sm:text-lg md:text-xl lg:text-2xl">SELECT AN ERA</Link>
        <Link href="/play" className="text-xs text-white transition-colors hover:text-white/70 sm:text-sm">+more</Link>
      </div>
      <section className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-4 lg:gap-5">
        {randomEras.map((era) => {
          const img = ERA_IMAGES[era.id];
          return (
            <Link key={era.id} href={`/play/${era.id}`} className="group">
              <div className="overflow-hidden rounded-lg border border-gold/10 bg-surface transition-all hover:border-gold/30 sm:rounded-xl">
                <div className="relative h-20 w-full sm:h-24 md:h-32 lg:h-40">
                  {img && (
                    <Image
                      src={img.src}
                      alt={era.name}
                      fill
                      className={`object-cover transition-transform group-hover:scale-105 ${img.position === 'top' ? 'object-top' : 'object-center'}`}
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, 25vw"
                    />
                  )}
                </div>
                <div className="px-1 py-1.5 text-center sm:px-1.5 sm:py-2 md:py-2.5">
                  <p className="text-[10px] font-semibold text-white sm:text-[11px] md:text-sm lg:text-base">{lg.eraName(era)}</p>
                  <p className="text-[8px] text-white/40 sm:text-[9px] md:text-xs lg:text-sm">{era.period}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── Community Recent Posts ── */}
      <section className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
        {/* Left column */}
        <div>
          <div className="mb-1.5 flex items-center justify-between sm:mb-2">
            <h3 className="text-[11px] font-bold text-white/60 sm:text-xs md:text-sm lg:text-base">{t('home.recentPosts')}</h3>
            <Link href="/community" className="text-[9px] text-white/30 hover:text-white/50 sm:text-[10px] md:text-xs">
              {t('home.seeAll')}
            </Link>
          </div>
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={`left-${i}`} className="rounded-md border border-white/5 bg-surface/50 px-2 py-1.5 sm:rounded-lg sm:px-2.5 sm:py-2 md:px-3 md:py-2.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-white/10 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-medium text-white/60 sm:text-[10px] md:text-xs lg:text-sm">Hola Spine</p>
                    <p className="truncate text-[8px] text-white/25 sm:text-[9px] md:text-[10px] lg:text-xs">Coming soon...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-1.5 flex items-center justify-between sm:mb-2">
            <h3 className="text-[11px] font-bold text-white/60 sm:text-xs md:text-sm lg:text-base">{t('home.recentPosts')}</h3>
            <Link href="/community" className="text-[9px] text-white/30 hover:text-white/50 sm:text-[10px] md:text-xs">
              {t('home.seeAll')}
            </Link>
          </div>
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={`right-${i}`} className="rounded-md border border-white/5 bg-surface/50 px-2 py-1.5 sm:rounded-lg sm:px-2.5 sm:py-2 md:px-3 md:py-2.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-white/10 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-medium text-white/60 sm:text-[10px] md:text-xs lg:text-sm">Hola Spine</p>
                    <p className="truncate text-[8px] text-white/25 sm:text-[9px] md:text-[10px] lg:text-xs">Coming soon...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
