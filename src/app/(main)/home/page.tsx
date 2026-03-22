'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { Button, Card } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4 lg:max-w-2xl">
      {/* Welcome section */}
      <div className="flex items-center gap-4">
        <div className="overflow-hidden rounded-full border-2 border-gold/40 shadow-[0_0_12px_rgba(212,160,23,0.2)]">
          <AvatarRenderer avatar={user.avatar} size="lg" />
        </div>
        <div>
          <p className="text-sm text-white/50">{t('home.welcome')}</p>
          <h2 className="text-glow text-2xl font-bold text-gold">
            {user.nickname}
          </h2>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="text-center">
          <p className="text-xs text-white/50">{t('home.level')}</p>
          <p className="text-glow text-3xl font-bold text-gold">
            {user.level}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-xs text-white/50">{t('home.points')}</p>
          <p className="text-glow text-3xl font-bold text-gold">
            {(user.points ?? 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Start adventure button */}
      <Link href="/play" className="block">
        <Button size="lg" className="w-full text-lg">
          {t('home.startAdventure')}
        </Button>
      </Link>

      {/* Recent activity placeholder */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gold/80">{t('home.recentActivity')}</h3>
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-white/70">{t('home.noActivity')}</p>
              <p className="text-xs text-white/40">{t('home.noActivitySub')}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gold/80">{t('home.quickLinks')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card variant="interactive" onClick={() => {}}>
            <div className="flex flex-col items-center gap-2 py-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="text-sm text-white/70">{t('home.studyLog')}</span>
            </div>
          </Card>
          <Card variant="interactive" onClick={() => {}}>
            <div className="flex flex-col items-center gap-2 py-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="text-sm text-white/70">{t('home.itemShop')}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
