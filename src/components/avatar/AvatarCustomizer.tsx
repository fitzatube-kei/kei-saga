'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { updateUserAvatar } from '@/lib/firebase/auth';
import {
  BODY_COLORS,
  FACE_PARTS,
  FACE_CATEGORIES,
  HEAD_ITEMS,
  ACCESSORY_ITEMS,
  OUTFIT_ITEMS,
  SET_ITEMS,
  THUMBNAIL_CROPS,
  getThumbnailPath,
  type FaceCategory,
} from '@/data/avatarParts';
import type { AvatarConfig } from '@/types';

type TabKey = 'face' | 'head' | 'outfit' | 'accessory' | 'set';

const TABS: { key: TabKey; labelKey: string }[] = [
  { key: 'face', labelKey: 'avatar.face' },
  { key: 'head', labelKey: 'avatar.head' },
  { key: 'outfit', labelKey: 'avatar.outfit' },
  { key: 'accessory', labelKey: 'avatar.accessory' },
  { key: 'set', labelKey: 'avatar.set' },
];

interface AvatarCustomizerProps {
  userId: string;
  currentAvatar: AvatarConfig;
  onUpdate: (avatar: AvatarConfig) => void;
}

// ─── Thumbnail component ─────────────────────────────────────────────
function PartThumbnail({
  category,
  partId,
  size = 48,
}: {
  category: string;
  partId: string;
  size?: number;
}) {
  const crop = THUMBNAIL_CROPS[category];
  if (!crop) return null;

  const path = getThumbnailPath(category, partId);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${crop.x} ${crop.y} ${crop.w} ${crop.h}`}
      className="block"
    >
      <image href={path} x="0" y="0" width="2900" height="2600" />
    </svg>
  );
}

// ─── Scrollable item row ─────────────────────────────────────────────
function ItemRow({
  items,
  category,
  selected,
  onSelect,
}: {
  items: readonly string[];
  category: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: -1 | 1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 180, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex items-center rounded-lg bg-[#7B80B0] px-1 py-2">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="flex h-10 w-7 flex-shrink-0 items-center justify-center text-white transition-opacity hover:opacity-70"
      >
        <svg width="14" height="14" viewBox="0 0 10 16" fill="currentColor">
          <path d="M8 0L0 8l8 8V0z" />
        </svg>
      </button>

      {/* Scrollable items */}
      <div
        ref={scrollRef}
        className="flex flex-1 gap-1.5 overflow-x-auto scrollbar-hide"
      >
        {items.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(selected === id ? 'none' : id)}
            className={cn(
              'flex flex-shrink-0 items-center justify-center rounded-md transition-all duration-150',
              'w-14 h-14 md:w-16 md:h-16',
              selected === id
                ? 'bg-[#5A5E8A] ring-2 ring-gold ring-offset-1 ring-offset-[#7B80B0]'
                : 'hover:bg-[#6B6FA0]'
            )}
          >
            <PartThumbnail category={category} partId={id} />
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll(1)}
        className="flex h-10 w-7 flex-shrink-0 items-center justify-center text-white transition-opacity hover:opacity-70"
      >
        <svg width="14" height="14" viewBox="0 0 10 16" fill="currentColor">
          <path d="M2 0l8 8-8 8V0z" />
        </svg>
      </button>
    </div>
  );
}

// ─── Color palette ───────────────────────────────────────────────────
function ColorPalette({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (bodyId: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-end gap-2">
      <span className="text-xs font-bold text-gray-700">{t('avatar.color')}</span>
      <div className="grid grid-cols-4 gap-1">
        {BODY_COLORS.map((body) => (
          <button
            key={body.id}
            type="button"
            onClick={() => onSelect(body.id)}
            className={cn(
              'h-6 w-6 rounded-sm transition-all duration-150 md:h-7 md:w-7',
              selected === body.id
                ? 'ring-2 ring-gray-800 ring-offset-1 ring-offset-white scale-110'
                : 'hover:scale-105 hover:brightness-110'
            )}
            style={{
              backgroundColor: body.color,
              border:
                body.color === '#FFFFFF'
                  ? '1px solid #999'
                  : body.color === '#000000'
                    ? '1px solid #555'
                    : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main customizer component ───────────────────────────────────────
export function AvatarCustomizer({
  userId,
  currentAvatar,
  onUpdate,
}: AvatarCustomizerProps) {
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState<AvatarConfig>(currentAvatar);
  const [activeTab, setActiveTab] = useState<TabKey>('face');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const updateField = useCallback(
    (field: keyof AvatarConfig, value: string) => {
      // Fields that unequip the set when changed (everything except face parts and body)
      const setBreaking = field === 'head' || field === 'outfit' || field === 'accessory';
      setAvatar((prev) => {
        const next = { ...prev, [field]: value };
        if (prev.set !== 'none' && setBreaking && value !== 'none') {
          next.set = 'none';
        }
        return next;
      });
    },
    []
  );

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleSave = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    try {
      await updateUserAvatar(userId, avatar);
      onUpdate(avatar);
      showToast(t('avatar.saved'), 'success');
    } catch (err) {
      console.error('Failed to save avatar:', err);
      showToast(t('avatar.saveFailed'), 'error');
    } finally {
      setSaving(false);
    }
  }, [userId, avatar, saving, onUpdate, t, showToast]);

  const handleSetSelect = useCallback(
    (id: string) => {
      if (avatar.set === id) {
        // Toggle off
        setAvatar((prev) => ({ ...prev, set: 'none' }));
      } else {
        // Equip set: clear head, outfit (keep face, accessory, body)
        setAvatar((prev) => ({
          ...prev,
          set: id,
          head: 'none',
          outfit: 'none',
        }));
      }
    },
    [avatar.set]
  );

  const hasChanges = JSON.stringify(avatar) !== JSON.stringify(currentAvatar);

  return (
    <div className="flex flex-col gap-3">
      {/* ── Preview + Color palette + Save ───────────────────────── */}
      <div className="flex gap-3">
        {/* Avatar preview */}
        <div className="flex-1 min-w-0 rounded-xl bg-white p-3 md:p-4">
          <div className="mx-auto max-w-[240px] md:max-w-[280px]">
            <AvatarRenderer avatar={avatar} size="preview" />
          </div>
        </div>
        {/* Color palette + Save button */}
        <div className="flex flex-shrink-0 flex-col gap-2">
          <div className="rounded-xl bg-white p-2 md:p-3">
            <ColorPalette
              selected={avatar.body}
              onSelect={(bodyId) => updateField('body', bodyId)}
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={cn(
              'w-full rounded-lg bg-gold py-2 text-xs font-bold text-background transition-all',
              saving || !hasChanges
                ? 'opacity-50'
                : 'hover:brightness-110 hover:shadow-[0_0_12px_rgba(212,160,23,0.4)]'
            )}
          >
            {saving ? '...' : t('common.save')}
          </button>
        </div>
      </div>

      {/* ── Category tabs ───────────────────────────────────────── */}
      <div className="flex rounded-t-xl bg-[#393D5E] px-1 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 py-2.5 text-xs font-bold transition-all duration-200 md:text-sm',
              'border-b-2',
              activeTab === tab.key
                ? 'border-gold text-white bg-[#4E527A]'
                : 'border-transparent text-white/50 hover:text-white/80 hover:bg-[#434770]'
            )}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* ── Tab content ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 rounded-b-xl bg-[#4E527A] p-2 md:p-3">
        {activeTab === 'face' && (
          <FaceTab avatar={avatar} onUpdate={updateField} />
        )}
        {activeTab === 'head' && (
          <ItemRow
            items={HEAD_ITEMS.map((h) => h.id)}
            category="head"
            selected={avatar.head}
            onSelect={(id) => updateField('head', id)}
          />
        )}
        {activeTab === 'outfit' && (
          <ItemRow
            items={OUTFIT_ITEMS}
            category="outfit"
            selected={avatar.outfit}
            onSelect={(id) => updateField('outfit', id)}
          />
        )}
        {activeTab === 'accessory' && (
          ACCESSORY_ITEMS.length > 0 ? (
            <ItemRow
              items={ACCESSORY_ITEMS}
              category="accessory"
              selected={avatar.accessory ?? 'none'}
              onSelect={(id) => updateField('accessory', id)}
            />
          ) : (
            <p className="py-6 text-center text-sm text-white/40">
              {t('common.comingSoon')}
            </p>
          )
        )}
        {activeTab === 'set' && (
          <ItemRow
            items={SET_ITEMS.map((s) => s.id)}
            category="set"
            selected={avatar.set}
            onSelect={(id) => handleSetSelect(id)}
          />
        )}
      </div>

      {/* ── Toast overlay ───────────────────────────────────────── */}
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'pointer-events-auto animate-fade-in rounded-2xl px-8 py-5 shadow-2xl',
              'flex flex-col items-center gap-2 backdrop-blur-sm',
              toast.type === 'success'
                ? 'bg-surface/95 border border-green-500/30'
                : 'bg-surface/95 border border-red-500/30'
            )}
          >
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              toast.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            )}>
              {toast.type === 'success' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
            <p className={cn(
              'text-sm font-semibold',
              toast.type === 'success' ? 'text-green-400' : 'text-red-400'
            )}>
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Face tab: rows for each face category ───────────────────────────
function FaceTab({
  avatar,
  onUpdate,
}: {
  avatar: AvatarConfig;
  onUpdate: (field: keyof AvatarConfig, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {FACE_CATEGORIES.map((cat) => (
        <ItemRow
          key={cat}
          items={FACE_PARTS[cat]}
          category={cat}
          selected={avatar[cat as keyof AvatarConfig] as string}
          onSelect={(id) => onUpdate(cat as keyof AvatarConfig, id)}
        />
      ))}
    </div>
  );
}
