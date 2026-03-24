'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg space-y-5 py-2 md:max-w-2xl lg:max-w-4xl">
      {/* ── Hero Welcome Banner ── */}
      <section className="relative mt-10 md:mt-12">
        {/* Banner area with overflow hidden for bottom crop */}
        <div className="relative h-48 w-full overflow-hidden rounded-2xl md:h-60 lg:h-72">
          {/* Background scene image */}
          <Image
            src="/images/home/josun_bg_001.png"
            alt="조선"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* Text with semi-transparent black backdrop */}
          <div className="absolute inset-y-0 left-0 flex w-1/2 items-center bg-black/50 px-4 py-4 md:px-6">
            <div>
              <h2 className="text-sm font-bold leading-snug text-white md:text-base lg:text-lg">
                한국사 러닝 게임에{'\n'}오신 것을 환영합니다!
              </h2>
              <p className="mt-2 text-[10px] leading-relaxed text-white/80 md:text-xs">
                퀘스트를 수행하고, 퀴즈에 도전하며{'\n'}
                한국 역사의 흥미진진한 이야기를 체험하세요.{'\n'}
                고대부터 현대까지, 당신만의 역사 모험이{'\n'}
                지금 시작됩니다!
              </p>
            </div>
          </div>
        </div>

        {/* Character - overflows top (hat) and cropped at bottom by banner */}
        <div className="pointer-events-none absolute -top-10 right-4 bottom-0 w-44 overflow-hidden md:-top-12 md:right-8 md:w-52">
          <div className="relative h-[130%] w-full">
            <Image
              src="/images/home/sejong001.png"
              alt="세종대왕"
              fill
              className="object-contain object-top drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              sizes="(max-width: 768px) 176px, 208px"
            />
          </div>
        </div>
      </section>

      {/* ── MY AVATA + Recent Activity + Button ── */}
      <section className="relative overflow-hidden space-y-4 px-1">
        {/* joonjun character - 200% enlarged, spans from MY AVATAR to button area */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 md:w-48 z-0">
          <Image
            src="/images/home/joonjun001.png"
            alt="캐릭터"
            width={400}
            height={560}
            className="w-40 max-w-none md:w-48"
          />
        </div>

        {/* MY AVATAR */}
        <div className="relative z-10">
          <div>
            <h3 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent md:text-lg">{t('home.myAvatar')}</h3>
            <p className="mt-1 text-sm text-white/70 md:text-base">
              <span className="text-white/50">{t('home.nickLabel')}: </span>
              <span className="font-medium text-white">{user.nickname}</span>
            </p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white">
                Level {user.level}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white">
                Point {(user.points ?? 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 최근 활동기록 */}
        <div>
          <h4 className="text-sm font-bold text-gold">{t('home.recentActivity')}</h4>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            {t('home.noActivity')}<br />
            {t('home.noActivitySub')}
          </p>
        </div>

        {/* 모험 시작하기 Button */}
        <Link href="/play" className="block">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110 active:scale-[0.98] md:py-4 md:text-lg"
          >
            <span>&#9654;</span>
            {t('home.startAdventure')}
          </button>
        </Link>
      </section>

      {/* ── Feature Cards (Continue / Review / Item Shop) ── */}
      <section className="grid grid-cols-3 gap-2.5 md:gap-4">
        {/* 이어서하기 */}
        <Link href="/play" className="group">
          <div className="overflow-hidden rounded-xl border border-gold/10 bg-surface transition-all hover:border-gold/30">
            <div className="relative h-24 w-full md:h-32 lg:h-40">
              <Image
                src="/images/home/sejong_real_001.png"
                alt="세종대왕"
                fill
                className="object-cover object-top transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
            <div className="px-1.5 py-2 text-center">
              <p className="text-[11px] font-semibold text-white md:text-sm">{t('home.continuePlay')}</p>
              <p className="text-[9px] text-white/40 md:text-xs">({t('home.nextLevel')})</p>
            </div>
          </div>
        </Link>

        {/* 복습하기 */}
        <Link href="/play" className="group">
          <div className="overflow-hidden rounded-xl border border-gold/10 bg-surface transition-all hover:border-gold/30">
            <div className="relative h-24 w-full md:h-32 lg:h-40">
              <Image
                src="/images/home/soonsin_real_001.png"
                alt="이순신"
                fill
                className="object-cover object-top transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
            <div className="px-1.5 py-2 text-center">
              <p className="text-[11px] font-semibold text-white md:text-sm">{t('home.review')}</p>
              <p className="text-[9px] text-white/40 md:text-xs">({t('home.recentLevel')})</p>
            </div>
          </div>
        </Link>

        {/* 아이템 샵 */}
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-xl border border-gold/10 bg-surface transition-all hover:border-gold/30">
            <div className="relative h-24 w-full md:h-32 lg:h-40">
              <Image
                src="/images/home/joonjun001.png"
                alt="아이템 샵"
                fill
                className="object-contain object-center bg-gradient-to-b from-surface to-[#2e3150] transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
            <div className="px-1.5 py-2 text-center">
              <p className="text-[11px] font-semibold text-white md:text-sm">{t('home.itemShop')}</p>
              <p className="invisible text-[9px] md:text-xs">&nbsp;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Recent Posts ── */}
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Left column */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white/60 md:text-sm">{t('home.recentPosts')}</h3>
            <Link href="/community" className="text-[10px] text-white/30 hover:text-white/50 md:text-xs">
              {t('home.seeAll')}
            </Link>
          </div>
          <div className="space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div key={`left-${i}`} className="rounded-lg border border-white/5 bg-surface/50 px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-white/10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium text-white/60 md:text-xs">Hola Spine</p>
                    <p className="truncate text-[9px] text-white/25 md:text-[10px]">Coming soon...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white/60 md:text-sm">{t('home.recentPosts')}</h3>
            <Link href="/community" className="text-[10px] text-white/30 hover:text-white/50 md:text-xs">
              {t('home.seeAll')}
            </Link>
          </div>
          <div className="space-y-1.5">
            {[1, 2, 3].map((i) => (
              <div key={`right-${i}`} className="rounded-lg border border-white/5 bg-surface/50 px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-white/10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-medium text-white/60 md:text-xs">Hola Spine</p>
                    <p className="truncate text-[9px] text-white/25 md:text-[10px]">Coming soon...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
