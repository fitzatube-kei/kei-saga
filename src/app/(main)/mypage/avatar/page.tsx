'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { Loading } from '@/components/ui/Loading';
import { useTranslation } from '@/hooks/useTranslation';
import { normalizeAvatar } from '@/types/user';
import type { AvatarConfig } from '@/types';

export default function AvatarPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { updateAvatar } = useAuthStore();

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  const avatar = normalizeAvatar(user.avatar as AvatarConfig & Record<string, unknown>);

  function handleUpdate(newAvatar: AvatarConfig) {
    updateAvatar(newAvatar);
  }

  return (
    <div className="mx-auto max-w-lg py-2 lg:max-w-3xl">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h1 className="text-xl font-bold text-gold">{t('avatar.title')}</h1>
        <Link
          href="/mypage"
          className="rounded-lg border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
        >
          {t('nav.mypage')}
        </Link>
      </div>

      {/* Customizer */}
      <AvatarCustomizer
        userId={user.uid}
        currentAvatar={avatar}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
