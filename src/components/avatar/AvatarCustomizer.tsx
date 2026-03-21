'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { getItemsByCategory, rarityColors, type AvatarItem } from '@/data/items';
import { purchaseItem, equipItem } from '@/lib/firebase/inventory';
import type { AvatarConfig, InventoryItem } from '@/types';

type TabKey = 'hair' | 'outfit' | 'accessory';

const tabs: { key: TabKey; labelKey: string }[] = [
  { key: 'hair', labelKey: 'avatar.hair' },
  { key: 'outfit', labelKey: 'avatar.outfit' },
  { key: 'accessory', labelKey: 'avatar.accessory' },
];

interface AvatarCustomizerProps {
  userId: string;
  currentAvatar: AvatarConfig;
  currentPoints: number;
  inventory: InventoryItem[];
  onUpdate: (avatar: AvatarConfig, points: number, inventory: InventoryItem[]) => void;
}

export function AvatarCustomizer({
  userId,
  currentAvatar,
  currentPoints,
  inventory,
  onUpdate,
}: AvatarCustomizerProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('hair');
  const [previewAvatar, setPreviewAvatar] = useState<AvatarConfig>(currentAvatar);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(
    () => getItemsByCategory(activeTab, currentAvatar.gender),
    [activeTab, currentAvatar.gender]
  );

  const ownedIds = useMemo(() => new Set(inventory.map((i) => i.itemId)), [inventory]);
  const equippedIds = useMemo(
    () => new Set(inventory.filter((i) => i.equipped).map((i) => i.itemId)),
    [inventory]
  );

  const isOwned = useCallback((id: string) => ownedIds.has(id), [ownedIds]);
  const isEquipped = useCallback((id: string) => equippedIds.has(id), [equippedIds]);
  const isFree = useCallback((item: AvatarItem) => item.price === 0, []);

  function getAvatarValueFromItem(item: AvatarItem): string {
    if (item.category === 'hair') {
      const parts = item.id.split('-');
      return parts.slice(2).join('-') || 'default';
    } else if (item.category === 'outfit') {
      const parts = item.id.split('-');
      return parts.slice(1).join('-') || 'default';
    } else {
      const parts = item.id.split('-');
      return parts.slice(1).join('-') || 'none';
    }
  }

  function handlePreview(item: AvatarItem) {
    const value = getAvatarValueFromItem(item);
    setPreviewAvatar((prev) => ({
      ...prev,
      [item.category]: value,
    }));
  }

  async function handlePurchase(item: AvatarItem) {
    if (loading) return;
    setError(null);
    setLoading(item.id);

    try {
      await purchaseItem(userId, item.id, item.price);
      const newInventory: InventoryItem[] = [
        ...inventory,
        { itemId: item.id, acquiredAt: new Date(), equipped: false },
      ];
      onUpdate(previewAvatar, currentPoints - item.price, newInventory);
    } catch (err) {
      setError(err instanceof Error ? err.message : '구매에 실패했습니다.');
    } finally {
      setLoading(null);
    }
  }

  async function handleEquip(item: AvatarItem) {
    if (loading) return;
    setError(null);
    setLoading(item.id);

    try {
      await equipItem(userId, item.id, item.category);
      const value = getAvatarValueFromItem(item);
      const newAvatar: AvatarConfig = { ...currentAvatar, [item.category]: value };

      // Update equipped status in inventory
      const categoryPrefixes: Record<string, string> = {
        hair: 'hair-',
        outfit: 'outfit-',
        accessory: 'acc-',
      };
      const prefix = categoryPrefixes[item.category];

      let newInventory = inventory.map((inv) => {
        if (inv.itemId.startsWith(prefix)) {
          return { ...inv, equipped: inv.itemId === item.id };
        }
        return inv;
      });

      // If free item was not in inventory, add it
      if (!ownedIds.has(item.id)) {
        newInventory = [
          ...newInventory,
          { itemId: item.id, acquiredAt: new Date(), equipped: true },
        ];
      }

      setPreviewAvatar(newAvatar);
      onUpdate(newAvatar, currentPoints, newInventory);
    } catch (err) {
      setError(err instanceof Error ? err.message : '장착에 실패했습니다.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar Preview */}
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gold/20 bg-surface p-6">
        <AvatarRenderer avatar={previewAvatar} size="xl" />
        <p className="text-sm text-gold/60">{t('avatar.preview')}</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-600/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-1 rounded-lg bg-background p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200',
              activeTab === tab.key
                ? 'bg-gold/20 text-gold shadow-sm'
                : 'text-gold/50 hover:text-gold/80'
            )}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const owned = isOwned(item.id) || isFree(item);
          const equipped = isEquipped(item.id);
          const isLoading = loading === item.id;
          const rarityColor = rarityColors[item.rarity];

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => handlePreview(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePreview(item);
                }
              }}
              className={cn(
                'relative flex cursor-pointer flex-col gap-2 rounded-lg border-2 bg-surface p-3 transition-all duration-200 hover:shadow-md',
                equipped
                  ? 'ring-2 ring-gold/60 ring-offset-1 ring-offset-background'
                  : 'hover:border-opacity-80'
              )}
              style={{ borderColor: rarityColor }}
            >
              {/* Badges */}
              {equipped && (
                <span className="absolute -right-1 -top-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-background">
                  {t('avatar.equipped')}
                </span>
              )}
              {owned && !equipped && !isFree(item) && (
                <span className="absolute -right-1 -top-1 rounded-full bg-surface border border-gold/40 px-2 py-0.5 text-[10px] font-medium text-gold/80">
                  {t('avatar.owned.short')}
                </span>
              )}

              {/* Item Info */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gold">{item.name}</p>
                  <p className="text-xs text-gold/50">{item.preview}</p>
                </div>
              </div>

              {/* Rarity Tag */}
              <span
                className="self-start rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{ backgroundColor: `${rarityColor}20`, color: rarityColor }}
              >
                {item.rarity === 'common' && '일반'}
                {item.rarity === 'rare' && '희귀'}
                {item.rarity === 'epic' && '영웅'}
                {item.rarity === 'legendary' && '전설'}
              </span>

              {/* Action */}
              <div className="mt-1">
                {owned || isFree(item) ? (
                  <Button
                    size="sm"
                    variant={equipped ? 'ghost' : 'secondary'}
                    className="w-full text-xs"
                    disabled={equipped || isLoading}
                    loading={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEquip(item);
                    }}
                  >
                    {equipped ? t('avatar.equipped') : t('avatar.equipAction')}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    className="w-full text-xs"
                    disabled={currentPoints < item.price || isLoading}
                    loading={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(item);
                    }}
                  >
                    {item.price.toLocaleString()} P {t('avatar.buy')}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
