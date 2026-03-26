'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { signOut } from '@/lib/firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Card, Button } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

interface ToggleProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className={cn('text-sm', disabled ? 'text-white/30' : 'text-white/80')}>
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-gold/80' : 'bg-white/20',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [bgm, setBgm] = useState(true);
  const [sfx, setSfx] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut();
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4 lg:max-w-2xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="뒤로가기"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-glow text-2xl font-bold text-gold">{t('settings.title')}</h1>
      </div>

      {/* 소리 & 알림 */}
      <Card>
        <h2 className="mb-2 text-sm font-semibold text-gold/80">{t('settings.sound')}</h2>
        <div className="divide-y divide-white/5">
          <Toggle label={t('settings.bgm')} checked={bgm} onChange={setBgm} />
          <Toggle label={t('settings.sfx')} checked={sfx} onChange={setSfx} />
          <Toggle
            label={t('settings.notifications')}
            checked={notifications}
            onChange={setNotifications}
          />
          <Toggle
            label={t('settings.darkMode')}
            checked={true}
            disabled
            onChange={() => {}}
          />
        </div>
      </Card>

      {/* 계정 */}
      <Card>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('settings.account')}</h2>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="mb-1 block text-xs text-white/40">{t('settings.email')}</label>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">
            {auth.currentUser?.email || user?.email || '-'}
          </div>
        </div>

        {/* 로그아웃 */}
        <Button
          variant="secondary"
          className="mb-3 w-full"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? t('settings.loggingOut') : t('auth.logout')}
        </Button>

        {/* 회원탈퇴 */}
        <button
          type="button"
          className="w-full text-center text-xs text-red-400/60 transition-colors hover:text-red-400"
          onClick={() => setShowDeleteMsg(true)}
        >
          {t('settings.deleteAccount')}
        </button>

        {showDeleteMsg && (
          <div className="mt-3 rounded-lg border border-red-500/20 bg-red-900/10 p-3 text-center">
            <p className="text-sm text-red-300">
              {t('settings.deleteMsg')}
            </p>
            <p className="mt-1 text-xs text-white/40">
              support@keisaga.com
            </p>
          </div>
        )}
      </Card>

      {/* 앱 정보 */}
      <Card>
        <h2 className="mb-2 text-sm font-semibold text-gold/80">{t('settings.appInfo')}</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">{t('settings.version')}</span>
          <span className="text-white/70">1.0.0</span>
        </div>
      </Card>
    </div>
  );
}
