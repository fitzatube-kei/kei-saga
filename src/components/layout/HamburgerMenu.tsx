'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { cn } from '@/lib/utils/cn';

// ─── Types ───────────────────────────────────────────────────────────

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Menu items ──────────────────────────────────────────────────────

const menuItems = [
  { label: '홈', href: '/home' },
  { label: '플레이', href: '/play' },
  { label: '커뮤니티', href: '/community' },
  { label: '마이페이지', href: '/mypage' },
  { label: '아바타 꾸미기', href: '/mypage/avatar' },
  { label: '친구 관리', href: '/mypage/friends' },
  { label: '설정', href: '/settings' },
];

// ─── Component ───────────────────────────────────────────────────────

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dark overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-[70] flex h-full w-72 flex-col border-l border-gold/15 bg-[#0d0d14] shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="메뉴"
      >
        {/* ── Header: user info ── */}
        <div className="border-b border-gold/10 p-5">
          {user ? (
            <div className="flex items-center gap-3">
              <AvatarRenderer avatar={user.avatar} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{user.nickname}</p>
                <span className="inline-block rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-semibold text-gold/70">
                  Lv. {user.level}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/40">로그인이 필요합니다</p>
          )}
        </div>

        {/* ── Navigation links ── */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-r-2 border-gold bg-gold/5 text-gold'
                    : 'text-white/60 hover:bg-white/[0.03] hover:text-white/90'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Footer: logout ── */}
        <div className="border-t border-gold/10 p-4">
          <button
            type="button"
            onClick={() => {
              // Placeholder: call sign-out logic
              onClose();
            }}
            className="w-full rounded-lg border border-red-500/20 bg-red-500/5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
}
