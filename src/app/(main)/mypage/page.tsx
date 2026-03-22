'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { LevelBadge } from '@/components/ui/LevelBadge';
import { StatsOverview } from '@/components/ui/StatsOverview';
import { ProgressChart } from '@/components/ui/ProgressChart';
import { Card, Loading } from '@/components/ui';
import { getAllUserProgress } from '@/lib/firebase/progress';
import { eras } from '@/data/eras';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

interface EraProgress {
  name: string;
  completedEvents: number;
  totalEvents: number;
}

const NAV_CARDS = [
  {
    labelKey: 'mypage.avatarCustom' as const,
    href: '/mypage/avatar',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    labelKey: 'mypage.friends' as const,
    href: '/mypage/friends',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    labelKey: 'mypage.cashCharge' as const,
    href: '/mypage/cash',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function MyPage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();
  const [eraProgress, setEraProgress] = useState<EraProgress[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [quizAccuracy, setQuizAccuracy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadStats() {
      try {
        const allProgress = await getAllUserProgress(user!.uid);

        // 완료된 이벤트 수
        const completed = allProgress.filter((p) => p.completed).length;
        setTotalCompleted(completed);

        // 퀴즈 정답률 계산
        const allAnswers = allProgress.flatMap((p) => p.quizAnswers ?? []);
        const correctAnswers = allAnswers.filter((a) => a.correct).length;
        const accuracy =
          allAnswers.length > 0
            ? Math.round((correctAnswers / allAnswers.length) * 100)
            : 0;
        setQuizAccuracy(accuracy);

        // 시대별 진행도
        const progressByEra: EraProgress[] = eras.map((era) => {
          const eraEvents = allProgress.filter((p) =>
            p.eventId.startsWith(era.id)
          );
          const completedInEra = eraEvents.filter((p) => p.completed).length;
          const totalInEra = Math.max(era.periods.reduce((sum, period) => sum + period.events.length, 0), eraEvents.length);

          return {
            name: era.name,
            completedEvents: completedInEra,
            totalEvents: totalInEra || 1,
          };
        });

        setEraProgress(progressByEra.filter((e) => e.totalEvents > 0));
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, [user]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4 lg:max-w-2xl">
      {/* 설정 버튼 */}
      <div className="flex justify-end">
        <Link
          href="/settings"
          className="rounded-full p-2 text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold"
          aria-label="설정"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </Link>
      </div>

      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden rounded-full border-2 border-gold/40 shadow-[0_0_20px_rgba(212,160,23,0.25)]">
          <AvatarRenderer avatar={user.avatar} size="xl" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-glow text-2xl font-bold text-gold">
            {user.nickname}
          </h1>
          <LevelBadge level={user.level} size="md" />
        </div>
      </div>

      {/* 통계 요약 */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('mypage.battleLog')}</h2>
        <StatsOverview
          totalPoints={user.points}
          quizAccuracy={quizAccuracy}
          completedEvents={totalCompleted}
          totalPlayTime={0}
        />
      </div>

      {/* 시대별 진행도 */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('mypage.eraProgress')}</h2>
        <Card>
          <ProgressChart eras={eraProgress} />
        </Card>
      </div>

      {/* 바로가기 */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('mypage.shortcuts')}</h2>
        <div className="grid grid-cols-3 gap-3">
          {NAV_CARDS.map((nav) => (
            <Link key={nav.href} href={nav.href}>
              <Card
                variant="interactive"
                className={cn(
                  'flex flex-col items-center gap-2 py-4 transition-colors',
                  'hover:border-gold/40'
                )}
              >
                <div className="text-gold">{nav.icon}</div>
                <span className="text-center text-xs text-white/70">
                  {t(nav.labelKey)}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
