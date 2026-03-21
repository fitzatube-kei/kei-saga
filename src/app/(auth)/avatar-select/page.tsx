'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { updateUserAvatar } from '@/lib/firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button, Loading } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';
import type { AvatarConfig } from '@/types';

function GenderPreview({ gender, selected }: { gender: 'male' | 'female'; selected: boolean }) {
  const isMale = gender === 'male';

  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Head */}
      <ellipse cx="60" cy="55" rx="28" ry="32" fill="#F5D0A9" />

      {/* Eyes */}
      <ellipse cx="50" cy="55" rx="3.5" ry="3" fill="#1a1a2e" />
      <ellipse cx="70" cy="55" rx="3.5" ry="3" fill="#1a1a2e" />
      <circle cx="51" cy="54" r="1.2" fill="white" />
      <circle cx="71" cy="54" r="1.2" fill="white" />

      {/* Mouth */}
      <path
        d="M54 68 Q60 72 66 68"
        fill="none"
        stroke="#c27a5a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Hair */}
      {isMale ? (
        <>
          <path
            d="M32 50 C32 22, 45 12, 60 10 C75 12, 88 22, 88 50 C88 38, 80 25, 60 22 C40 25, 32 38, 32 50 Z"
            fill="#1a1a2e"
          />
          <ellipse cx="60" cy="26" rx="24" ry="12" fill="#1a1a2e" />
        </>
      ) : (
        <>
          <path
            d="M32 50 C32 22, 45 12, 60 10 C75 12, 88 22, 88 50 C88 38, 80 25, 60 22 C40 25, 32 38, 32 50 Z"
            fill="#1a1a2e"
          />
          <ellipse cx="60" cy="26" rx="26" ry="14" fill="#1a1a2e" />
          <path d="M32 48 C26 58, 24 80, 28 105" fill="none" stroke="#1a1a2e" strokeWidth="10" strokeLinecap="round" />
          <path d="M88 48 C94 58, 96 80, 92 105" fill="none" stroke="#1a1a2e" strokeWidth="10" strokeLinecap="round" />
        </>
      )}

      {/* Neck */}
      <rect x="52" y="82" width="16" height="14" rx="3" fill="#F5D0A9" />

      {/* Body */}
      {isMale ? (
        <path
          d="M25 195 C25 140, 20 120, 35 95 L85 95 C100 120, 95 140, 95 195 Z"
          fill="#3b3b5c"
        />
      ) : (
        <path
          d="M32 195 C32 145, 28 120, 40 95 L80 95 C92 120, 88 145, 88 195 Z"
          fill="#3b3b5c"
        />
      )}

      {/* Outfit detail */}
      <path
        d={isMale ? 'M50 95 L60 108 L70 95' : 'M48 95 Q60 105 72 95'}
        fill="none"
        stroke="#d4a017"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AvatarSelectPage() {
  const { user, initialized } = useAuth();
  const updateAvatar = useAuthStore((s) => s.updateAvatar);
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSelect = async () => {
    if (!selectedGender || !user) return;
    setSaving(true);

    try {
      const avatar: AvatarConfig = {
        gender: selectedGender,
        skinTone: '#F5D0A9',
        hair: 'basic',
        outfit: 'hanbok',
        accessory: 'none',
      };
      await updateUserAvatar(user.uid, avatar);
      updateAvatar(avatar);
      router.push('/home');
    } catch {
      // Silently fail, user can retry
      setSaving(false);
    }
  };

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading size="lg" text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-glow mb-2 text-2xl font-bold text-gold">
        {t('auth.selectAvatar')}
      </h1>
      <p className="mb-8 text-sm text-white/50">
        모험을 함께할 캐릭터의 성별을 선택해주세요
      </p>

      {/* Gender selection cards */}
      <div className="mb-8 flex w-full gap-4">
        {/* Male card */}
        <button
          type="button"
          onClick={() => setSelectedGender('male')}
          className={cn(
            'flex flex-1 flex-col items-center rounded-xl border-2 bg-surface p-6 transition-all duration-200',
            selectedGender === 'male'
              ? 'border-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]'
              : 'border-gold/10 hover:border-gold/40'
          )}
        >
          <GenderPreview gender="male" selected={selectedGender === 'male'} />
          <span className={cn(
            'mt-4 text-lg font-bold',
            selectedGender === 'male' ? 'text-gold' : 'text-white/70'
          )}>
            {t('auth.male')}
          </span>
        </button>

        {/* Female card */}
        <button
          type="button"
          onClick={() => setSelectedGender('female')}
          className={cn(
            'flex flex-1 flex-col items-center rounded-xl border-2 bg-surface p-6 transition-all duration-200',
            selectedGender === 'female'
              ? 'border-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]'
              : 'border-gold/10 hover:border-gold/40'
          )}
        >
          <GenderPreview gender="female" selected={selectedGender === 'female'} />
          <span className={cn(
            'mt-4 text-lg font-bold',
            selectedGender === 'female' ? 'text-gold' : 'text-white/70'
          )}>
            {t('auth.female')}
          </span>
        </button>
      </div>

      {/* Confirm button */}
      <Button
        onClick={handleSelect}
        loading={saving}
        disabled={!selectedGender}
        size="lg"
        className="w-full"
      >
        {t('common.confirm')}
      </Button>
    </div>
  );
}
