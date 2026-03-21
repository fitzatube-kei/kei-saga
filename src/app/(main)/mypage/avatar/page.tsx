'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { getUserInventory } from '@/lib/firebase/inventory';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { Loading } from '@/components/ui/Loading';
import { useTranslation } from '@/hooks/useTranslation';
import type { AvatarConfig, InventoryItem } from '@/types';

export default function AvatarPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { updateAvatar, updatePoints } = useAuthStore();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchInventory() {
      try {
        const items = await getUserInventory(user!.uid);
        setInventory(items);
      } catch (err) {
        console.error('Failed to load inventory:', err);
      } finally {
        setLoadingInventory(false);
      }
    }

    fetchInventory();
  }, [user]);

  function handleUpdate(avatar: AvatarConfig, points: number, newInventory: InventoryItem[]) {
    updateAvatar(avatar);
    updatePoints(points);
    setInventory(newInventory);
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gold">{t('avatar.title')}</h1>
        <div className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
          <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 13a4.5 4.5 0 01-3.5-1.68.5.5 0 01.77-.64A3.5 3.5 0 0010 12a3.5 3.5 0 002.73-1.32.5.5 0 01.77.64A4.5 4.5 0 0110 13z" />
          </svg>
          <span className="text-sm font-semibold text-gold">
            {(user.points ?? 0).toLocaleString()} P
          </span>
        </div>
      </div>

      {/* Customizer */}
      {loadingInventory ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loading text="인벤토리 로딩 중..." />
        </div>
      ) : (
        <AvatarCustomizer
          userId={user.uid}
          currentAvatar={user.avatar}
          currentPoints={user.points}
          inventory={inventory}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
