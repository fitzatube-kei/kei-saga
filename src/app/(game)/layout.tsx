'use client';

import { useAuth } from '@/hooks/useAuth';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize auth listener without blocking render
  useAuth();

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
