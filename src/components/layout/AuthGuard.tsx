'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    // Redirect to avatar-select if user has default avatar (just signed up)
    if (
      user.avatar.gender === 'male' &&
      user.avatar.outfit === 'default' &&
      user.avatar.hair === 'default'
    ) {
      router.replace('/avatar-select');
    }
  }, [user, initialized, router]);

  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading size="lg" text={t('common.loading')} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
