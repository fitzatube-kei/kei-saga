'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils/cn';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
import { getEras } from '@/data/eras/content';

function getRankByLevel(level: number): { nameKey: string } {
  if (level >= 5) return { nameKey: 'rank.royalty' };
  if (level >= 3) return { nameKey: 'rank.noble' };
  return { nameKey: 'rank.commoner' };
}

const ERA_IMAGES: Record<string, { src: string; position?: string }> = {
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
  'modern': { src: '/images/play/seokguam_real_001.png', position: 'top' },
};

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();
  const lg = useLocalizedGame();

  const randomEras = useMemo(() => {
    const allEras = getEras();
    const shuffled = [...allEras].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  const isLoggedIn = !!user;

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO SECTION — Full viewport cinematic intro
          ══════════════════════════════════════════════ */}
      <section className="relative -mx-4 -mt-16 w-[calc(100%+2rem)] lg:-mx-8 lg:w-[calc(100%+4rem)] overflow-hidden">
        {/* Background — dramatic scene */}
        <div className="absolute inset-0">
          <Image
            src="/images/play/gojosun_real_001.png"
            alt="background"
            fill
            className="object-cover object-center scale-110"
            sizes="100vw"
            priority
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#0a1128]/40 to-[#0a1128]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128]/60 via-transparent to-[#0a1128]/60" />
          {/* Vignette effect */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 150px rgba(10,17,40,0.8)' }} />
        </div>

        {/* Animated golden particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold/60"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pt-16 pb-8">
          {/* Logo with glow */}
          <div className="relative mb-2 sm:mb-4">
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gold rounded-full scale-150" />
            <Image
              src="/images/home/KEISAGA001.png"
              alt="KEI SAGA"
              width={360}
              height={80}
              className="relative w-48 sm:w-56 md:w-72 lg:w-80 drop-shadow-[0_0_30px_rgba(212,160,23,0.5)]"
              priority
            />
          </div>

          {/* Tagline */}
          <p className="mb-6 text-center text-xs tracking-[0.3em] text-gold/70 uppercase sm:text-sm md:text-base sm:mb-8">
            Korean History RPG Adventure
          </p>

          {/* Description */}
          <p className="mb-8 max-w-md text-center text-xs leading-relaxed text-white/60 sm:text-sm md:max-w-lg md:text-base sm:mb-10">
            {t('home.welcomeDesc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 mb-10 sm:mb-14">
            <Link href="/play">
              <button
                type="button"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gold via-goldLight to-gold px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-background shadow-[0_0_40px_rgba(212,160,23,0.4)] transition-all hover:shadow-[0_0_60px_rgba(212,160,23,0.6)] hover:scale-105 active:scale-[0.98] sm:px-14 sm:py-4 sm:text-base md:text-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  <span>&#9654;</span>
                  {t('home.startAdventure')}
                </span>
              </button>
            </Link>
            {!isLoggedIn && (
              <Link href="/login">
                <button
                  type="button"
                  className="rounded-xl border-2 border-gold/40 bg-gold/5 px-8 py-3 text-sm font-bold uppercase tracking-wider text-gold/90 backdrop-blur-sm transition-all hover:border-gold/60 hover:bg-gold/10 active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-base"
                >
                  {t('auth.login')}
                </button>
              </Link>
            )}
          </div>

          {/* Character lineup at bottom */}
          <div className="relative flex items-end justify-center gap-0 sm:gap-2">
            {/* Left character — Yi Sun-sin */}
            <div className="relative h-24 w-20 sm:h-32 sm:w-28 md:h-40 md:w-36 lg:h-48 lg:w-44 translate-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/home/soonsin_illust001.png"
                alt="이순신"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 176px"
              />
            </div>
            {/* Center character — Sejong (larger) */}
            <div className="relative h-32 w-28 sm:h-40 sm:w-36 md:h-52 md:w-44 lg:h-60 lg:w-52 z-10">
              <Image
                src="/images/home/sejong_illust001.png"
                alt="세종대왕"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(212,160,23,0.4)]"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 208px"
              />
            </div>
            {/* Right character — Girl */}
            <div className="relative h-24 w-20 sm:h-32 sm:w-28 md:h-40 md:w-36 lg:h-48 lg:w-44 translate-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/home/girl_illust001.png"
                alt="캐릭터"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 176px"
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-4 flex flex-col items-center gap-1 animate-bounce sm:mt-6">
            <span className="text-[10px] tracking-widest text-white/30 uppercase sm:text-xs">Scroll</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BELOW THE FOLD — User info + Era selection
          ══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-lg space-y-6 py-6 md:max-w-2xl md:space-y-8 lg:max-w-4xl">

        {/* ── MY AVATAR + Recent Activity ── */}
        {isLoggedIn && user && (
          <section className="relative overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-br from-surface via-surface to-[#1a1d35] p-4 sm:p-5 md:p-6">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-gold/20 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-gold/20 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-gold/20 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold/20 rounded-br-2xl" />

            <div className="relative flex items-start gap-4">
              {/* Avatar */}
              <div className="w-20 shrink-0 sm:w-24 md:w-28">
                <AvatarRenderer avatar={user.avatar} size="preview" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gold sm:text-lg md:text-xl">{user.nickname}</h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:mt-2 sm:gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-semibold text-gold sm:px-4 sm:py-1.5 sm:text-xs">
                    Lv.{user.level} <span className="opacity-40">|</span> {t(getRankByLevel(user.level).nameKey)}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-semibold text-gold sm:px-4 sm:py-1.5 sm:text-xs">
                    {(user.points ?? 0).toLocaleString()} P
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-white/40 sm:text-xs">{t('home.noActivity')} {t('home.noActivitySub')}</p>
              </div>
            </div>

            {/* Continue button */}
            <Link href={user.lastPlayedEraId ? `/play/${user.lastPlayedEraId}` : '/play'} className="mt-4 block">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-goldLight py-3 text-sm font-bold uppercase tracking-wider text-background shadow-lg shadow-gold/20 transition-all hover:brightness-110 active:scale-[0.98] sm:py-3.5 sm:text-base"
              >
                <span>&#9654;</span>
                {t('home.continueAdventure')}
              </button>
            </Link>
          </section>
        )}

        {/* ── SELECT AN ERA — Cinematic grid ── */}
        <section>
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-gold/50 sm:w-10" />
              <Link href={isLoggedIn ? '/play' : '/login'} className="text-sm font-bold uppercase tracking-widest text-gold sm:text-base md:text-lg">
                Select an Era
              </Link>
              <div className="h-px w-6 bg-gradient-to-l from-transparent to-gold/50 sm:w-10" />
            </div>
            <Link href={isLoggedIn ? '/play' : '/login'} className="text-[10px] text-white/40 hover:text-gold/70 transition-colors sm:text-xs">
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 md:gap-4">
            {randomEras.map((era) => {
              const img = ERA_IMAGES[era.id];
              const eraAccessible = isLoggedIn || era.id === 'gojoseon';
              const content = (
                <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-surface transition-all hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,160,23,0.1)]">
                  <div className="relative h-28 w-full sm:h-24 md:h-32 lg:h-40 overflow-hidden">
                    {img && (
                      <Image
                        src={img.src}
                        alt={era.name}
                        fill
                        className={cn(
                          'object-cover transition-transform duration-500 group-hover:scale-110',
                          img.position === 'top' ? 'object-top' : 'object-center'
                        )}
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                    {/* Bottom gradient for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
                    {!eraAccessible && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
                        <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[9px] font-semibold text-white/80 sm:text-[10px]">
                          {t('play.levelUpgrade')}
                        </span>
                      </div>
                    )}
                    {/* Era name overlay on image */}
                    <div className="absolute inset-x-0 bottom-0 px-2 pb-2 sm:px-2.5 sm:pb-2.5">
                      <p className="text-[11px] font-bold text-white drop-shadow-lg sm:text-xs md:text-sm lg:text-base">{lg.eraName(era)}</p>
                      <p className="text-[9px] text-white/50 sm:text-[10px] md:text-xs">{era.period}</p>
                    </div>
                  </div>
                </div>
              );
              return eraAccessible ? (
                <Link key={era.id} href={`/play/${era.id}`} className="group">
                  {content}
                </Link>
              ) : (
                <div key={era.id} className="cursor-not-allowed">
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Community ── */}
        <section>
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-gold/50 sm:w-10" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold sm:text-base">{t('home.recentPosts')}</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
            <Link href="/community" className="text-[10px] text-white/40 hover:text-gold/70 transition-colors sm:text-xs">
              {t('home.seeAll')} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            {[0, 1].map((col) => (
              <div key={col} className="space-y-2 sm:space-y-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={`${col}-${i}`} className="rounded-lg border border-white/5 bg-surface/50 px-3 py-2.5 transition-colors hover:border-white/10 sm:px-3.5 sm:py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 shrink-0 rounded-full bg-white/10 sm:h-6 sm:w-6" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-medium text-white/60 sm:text-xs md:text-sm">Coming soon</p>
                        <p className="truncate text-[9px] text-white/25 sm:text-[10px]">Stay tuned...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Particle animation keyframes */}
      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-40px) translateX(20px);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
}
