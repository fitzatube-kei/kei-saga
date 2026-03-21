'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

interface StatsOverviewProps {
  totalPoints: number;
  quizAccuracy: number;
  completedEvents: number;
  totalPlayTime: number;
  className?: string;
}

function getStats(props: StatsOverviewProps, t: (key: string) => string) {
  return [
    {
      label: t('mypage.totalPoints'),
      value: (props.totalPoints ?? 0).toLocaleString(),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: t('mypage.quizAccuracy'),
      value: `${props.quizAccuracy ?? 0}%`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      label: t('mypage.completedEvents'),
      value: `${props.completedEvents ?? 0}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: t('mypage.totalPlayTime'),
      value: (props.totalPlayTime ?? 0) >= 60
        ? `${Math.floor((props.totalPlayTime ?? 0) / 60)}${t('stats.hours')} ${(props.totalPlayTime ?? 0) % 60}${t('stats.minutes')}`
        : `${props.totalPlayTime ?? 0}${t('stats.minutes')}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];
}

export function StatsOverview(props: StatsOverviewProps) {
  const { t } = useTranslation();
  const items = getStats(props, t);

  return (
    <div className={cn('grid grid-cols-2 gap-3', props.className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-gold/20 bg-dark-card p-4 shadow-[0_0_8px_rgba(212,160,23,0.05)]"
        >
          <div className="mb-2 text-gold/60">{item.icon}</div>
          <p className="text-glow text-xl font-bold text-gold">{item.value}</p>
          <p className="mt-0.5 text-xs text-white/50">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
