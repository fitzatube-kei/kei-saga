'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useLangStore, LANGUAGES, type LangCode } from '@/stores/langStore';
import { cn } from '@/lib/utils/cn';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';

export function Header() {
  const user = useAuthStore((s) => s.user);
  const { lang, setLang } = useLangStore();
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [langOpen]);

  function handleSelectLang(code: LangCode) {
    setLang(code);
    setLangOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-gold/20 bg-background/95 px-4 backdrop-blur-sm">
      {/* Left: Logo + Language */}
      <div className="flex items-center gap-2">
        <Link href="/home" className="transition-opacity hover:opacity-80">
          <Image src="/images/KEISAGA001.png" alt="KEI SAGA" width={120} height={32} priority />
        </Link>

        {/* Language Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-1 py-1 text-xs transition-opacity hover:opacity-70"
          >
            <span className="text-lg">{currentLang.flag}</span>
            <span className="hidden sm:inline text-white/70">{currentLang.label}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn('text-white/40 transition-transform', langOpen && 'rotate-180')}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown */}
          {langOpen && (
            <div className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-gold/20 bg-surface py-1 shadow-lg shadow-black/40 animate-fade-in z-[60]">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleSelectLang(l.code)}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors',
                    l.code === lang
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span className="text-base">{l.flag}</span>
                  <span>{l.label}</span>
                  {l.code === lang && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-auto text-gold">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          type="button"
          className="relative rounded-full p-2 text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold"
          aria-label="알림"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User avatar */}
        {user && (
          <div className="overflow-hidden rounded-full border-2 border-gold/40">
            <AvatarRenderer avatar={user.avatar} size="sm" />
          </div>
        )}
      </div>
    </header>
  );
}
