'use client';

import { AuthGuard } from '@/components/layout/AuthGuard';
import { Header } from '@/components/layout/Header';
import { FooterNav } from '@/components/layout/FooterNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 px-4 pb-20 pt-16">
          {children}
        </main>
        <FooterNav />
      </div>
    </AuthGuard>
  );
}
