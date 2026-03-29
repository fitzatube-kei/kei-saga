'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { updateUserAvatar } from '@/lib/firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button, Loading } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { BODY_COLORS } from '@/data/avatarParts';
import { DEFAULT_AVATAR } from '@/types/user';
import { cn } from '@/lib/utils/cn';
import type { AvatarConfig } from '@/types';

export default function AvatarSelectPage() {
  const { user, initialized } = useAuth();
  const updateAvatar = useAuthStore((s) => s.updateAvatar);
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedBody, setSelectedBody] = useState('body001');
  const [saving, setSaving] = useState(false);

  const previewAvatar: AvatarConfig = {
    ...DEFAULT_AVATAR,
    body: selectedBody,
  };

  const handleSelect = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const avatar: AvatarConfig = { ...previewAvatar };
      await updateUserAvatar(user.uid, avatar);
      updateAvatar(avatar);
      router.push('/mypage/avatar');
    } catch {
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
      <p className="mb-6 text-sm text-white/50">
        {t('avatar.selectColor')}
      </p>

      {/* Avatar preview */}
      <div className="mb-6 w-48 md:w-56">
        <AvatarRenderer avatar={previewAvatar} size="preview" />
      </div>

      {/* Color selection */}
      <div className="mb-8 grid grid-cols-8 gap-2">
        {BODY_COLORS.map((body) => (
          <button
            key={body.id}
            type="button"
            onClick={() => setSelectedBody(body.id)}
            className={cn(
              'h-10 w-10 rounded-lg transition-all duration-150',
              selectedBody === body.id
                ? 'ring-2 ring-gold ring-offset-2 ring-offset-background scale-110'
                : 'hover:scale-105'
            )}
            style={{
              backgroundColor: body.color,
              border: body.color === '#FFFFFF' ? '1px solid #666' : undefined,
            }}
          />
        ))}
      </div>

      {/* Confirm button */}
      <Button
        onClick={handleSelect}
        loading={saving}
        size="lg"
        className="w-full max-w-xs"
      >
        {t('common.confirm')}
      </Button>
    </div>
  );
}
