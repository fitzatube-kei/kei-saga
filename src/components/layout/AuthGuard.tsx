'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

// Pages accessible without login
// Pages accessible without login
const PUBLIC_PATHS = ['/home'];
// Path prefixes accessible without login (gojoseon content only)
const PUBLIC_PREFIXES = ['/play'];

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const isPublicPath =
    PUBLIC_PATHS.some((p) => pathname === p) ||
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!initialized) return;

    if (!user && !isPublicPath) {
      router.replace('/login');
      return;
    }

    // Redirect to avatar customizer if user has legacy avatar (needs migration)
    if (user && !(user.avatar as unknown as Record<string, unknown>).body) {
      router.replace('/mypage/avatar');
    }
  }, [user, initialized, router, isPublicPath]);

  // Only show loading on initial auth check; skip if we already have a user
  if (!initialized || (loading && !user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading size="lg" text={t('common.loading')} />
      </div>
    );
  }

  // Allow public pages without user
  if (!user && isPublicPath) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
