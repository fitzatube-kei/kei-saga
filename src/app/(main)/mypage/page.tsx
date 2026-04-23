'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { Loading } from '@/components/ui';
import { getAllUserProgress } from '@/lib/firebase/progress';
import {
  updateUserNickname,
  updateUserProfileImage,
  updateUserProfileBgColor,
  updateUserProfileTreasures,
} from '@/lib/firebase/auth';
import { getEras } from '@/data/eras/content';
import { useLocalizedGame } from '@/hooks/useLocalizedGame';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

function getRankKey(level: number): 'rank.royalty' | 'rank.noble' | 'rank.commoner' {
  if (level >= 5) return 'rank.royalty';
  if (level >= 3) return 'rank.noble';
  return 'rank.commoner';
}

type ReplayCard = {
  key: string;
  title: string;
  thumb: string;
  href: string;
};

const ERA_THUMB: Record<string, string> = {
  'gojoseon': '/images/play/bg/gojoseon/bg_001.png',
  'samguk-early': '/images/play/bg/samguk-early/bg_se_004.png',
  'samguk-late': '/images/play/bg/samguk-late/bg_sl_001.png',
  'unified-silla': '/images/play/Silla_real_001.png',
  'balhae': '/images/play/Balhae_real_001.png',
  'goryeo-early': '/images/play/goryeoearly_real_001.png',
  'goryeo-late': '/images/play/goryeolate_real_001.png',
  'joseon-early': '/images/play/joseonearly_real_001.png',
  'joseon-late': '/images/play/joseonlate_real_001.png',
  'daehan-empire': '/images/play/koreanempire_real_001.png',
  'japanese-colonial': '/images/play/japanese Colonial_real_001.png',
  'modern': '/images/play/seokguam_real_001.png',
};

const TREASURE_ICONS = [
  '/images/treasure/t_v1_0001.png',
  '/images/treasure/t_v2_0001.png',
  '/images/treasure/t_v3_0001.png',
];

const TEAM_PLACEHOLDERS = [
  '#e85c5c',
  '#4a90c4',
  '#f5a742',
  '#68b06e',
  '#b474d1',
  '#d4a017',
];

const AVT_IMAGES = [
  'dangun001', 'hwanwoon001', 'villagechief001', 'jumong001', 'onjo001', 'Hyeokgeose001',
  'gwanggaeto001', 'euljimundeok001', 'gyebaek001', 'kimyushin001', 'kimchunchu001',
  'kimdaeseong001', 'daejoyeong001', 'jangbogo001', 'kingmu001', 'gwansun001',
  'kimkoo001', 'leeseungman001',
];

const BG_COLORS = [
  '#e85c5c', '#f5a742', '#f5c842', '#68b06e', '#4a90c4',
  '#5a7ed4', '#8b5cf6', '#b474d1', '#ec4899', '#1a1a1a',
  '#3d2817', '#5e4b3a',
];

const DEFAULT_AVT = 'dangun001';
const DEFAULT_BG_COLOR = '#e85c5c';
const AVATARS_PER_PAGE = 15; // 5 cols × 3 rows

type PlacedItem = {
  id: string;
  image: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
};

export default function MyPage() {
  const user = useAuthStore((s) => s.user);
  const updateNicknameStore = useAuthStore((s) => s.updateNickname);
  const updateProfileImageStore = useAuthStore((s) => s.updateProfileImage);
  const updateProfileBgColorStore = useAuthStore((s) => s.updateProfileBgColor);
  const updateProfileTreasuresStore = useAuthStore((s) => s.updateProfileTreasures);
  const lg = useLocalizedGame();
  const { t } = useTranslation();

  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [quizAccuracy, setQuizAccuracy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'replay' | 'scenes'>('replay');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [draftImage, setDraftImage] = useState<string | null>(null);
  const [draftBgColor, setDraftBgColor] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [avatarPage, setAvatarPage] = useState(0);

  // Placed treasure decorations in the banner
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>(
    () => user?.profileTreasures ?? [],
  );
  const [savedTreasures, setSavedTreasures] = useState<PlacedItem[]>(
    () => user?.profileTreasures ?? [],
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [treasuresSaving, setTreasuresSaving] = useState(false);
  const treasuresDirty = useMemo(
    () => JSON.stringify(placedItems) !== JSON.stringify(savedTreasures),
    [placedItems, savedTreasures],
  );
  const bannerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    id: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  } | null>(null);

  const replayCards = useMemo<ReplayCard[]>(() => {
    const eras = getEras();
    const list: ReplayCard[] = [];
    eras.forEach((era) => {
      era.periods.forEach((period) => {
        period.events.forEach((ev) => {
          const stepThumb = ev.steps.find((s) => s.backgroundImage)?.backgroundImage;
          list.push({
            key: `${era.id}-${period.id}-${ev.id}`,
            title: lg.eventTitle(ev),
            thumb: stepThumb ?? ERA_THUMB[era.id] ?? '/images/play/gojosun_real_001.png',
            href: `/play/${era.id}/${period.id}/${ev.id}`,
          });
        });
      });
    });
    return list.slice(0, 8);
  }, [lg]);

  const openProfileModal = () => {
    setDraftImage(user?.profileImage ?? DEFAULT_AVT);
    setDraftBgColor(user?.profileBgColor ?? DEFAULT_BG_COLOR);
    setAvatarPage(0);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setDraftImage(null);
    setDraftBgColor(null);
  };

  const handleProfileSave = async () => {
    if (!user || draftImage === null || draftBgColor === null) return;
    setProfileSaving(true);
    const imageChanged = draftImage !== (user.profileImage ?? DEFAULT_AVT);
    const colorChanged = draftBgColor !== (user.profileBgColor ?? DEFAULT_BG_COLOR);
    try {
      if (imageChanged) {
        updateProfileImageStore(draftImage);
        await updateUserProfileImage(user.uid, draftImage);
      }
      if (colorChanged) {
        updateProfileBgColorStore(draftBgColor);
        await updateUserProfileBgColor(user.uid, draftBgColor);
      }
      closeProfileModal();
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleTreasuresSave = async () => {
    if (!user || !treasuresDirty) return;
    setTreasuresSaving(true);
    try {
      updateProfileTreasuresStore(placedItems);
      await updateUserProfileTreasures(user.uid, placedItems);
      setSavedTreasures(placedItems);
      setSelectedItemId(null);
    } catch (err) {
      console.error('Failed to save treasures:', err);
    } finally {
      setTreasuresSaving(false);
    }
  };

  const addTreasureToBanner = (image: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    // Use the (2) variant from the treasure folder for the placed item
    const placedImage = image.replace(/_0001\.png$/, '_0001(2).png');
    setPlacedItems((prev) => [
      ...prev,
      { id, image: placedImage, x: 15, y: 20 },
    ]);
    setSelectedItemId(id);
  };

  const removePlacedItem = (id: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const handleItemPointerDown = (e: React.PointerEvent, item: PlacedItem) => {
    e.stopPropagation();
    const banner = bannerRef.current;
    if (!banner) return;
    const rect = banner.getBoundingClientRect();
    const currentPxX = (item.x / 100) * rect.width;
    const currentPxY = (item.y / 100) * rect.height;
    dragStateRef.current = {
      id: item.id,
      pointerId: e.pointerId,
      offsetX: e.clientX - rect.left - currentPxX,
      offsetY: e.clientY - rect.top - currentPxY,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleItemPointerMove = (e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    const banner = bannerRef.current;
    if (!drag || !banner || drag.pointerId !== e.pointerId) return;
    const rect = banner.getBoundingClientRect();
    const px = e.clientX - rect.left - drag.offsetX;
    const py = e.clientY - rect.top - drag.offsetY;
    const xPct = Math.max(0, Math.min(100, (px / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (py / rect.height) * 100));
    drag.moved = true;
    setPlacedItems((prev) =>
      prev.map((i) => (i.id === drag.id ? { ...i, x: xPct, y: yPct } : i)),
    );
  };

  const handleItemPointerUp = (e: React.PointerEvent, item: PlacedItem) => {
    const drag = dragStateRef.current;
    if (drag && drag.pointerId === e.pointerId) {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      // treat as tap if not moved
      if (!drag.moved) {
        setSelectedItemId((prev) => (prev === item.id ? null : item.id));
      }
      dragStateRef.current = null;
    }
  };

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = editNickname.trim();
    if (!user || trimmed.length < 2 || trimmed.length > 12) return;
    setNicknameSaving(true);
    try {
      await updateUserNickname(user.uid, trimmed);
      updateNicknameStore(trimmed);
      setIsEditingNickname(false);
    } catch (err) {
      console.error('Failed to update nickname:', err);
    } finally {
      setNicknameSaving(false);
    }
  };

  useEffect(() => {
    if (user?.profileTreasures && placedItems.length === 0) {
      setPlacedItems(user.profileTreasures);
      setSavedTreasures(user.profileTreasures);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!user) return;
    async function loadStats() {
      try {
        const allProgress = await getAllUserProgress(user!.uid);
        const completed = allProgress.filter((p) => p.completed).length;
        setTotalCompleted(completed);

        const total = getEras().reduce(
          (sum, era) => sum + era.periods.reduce((s2, p) => s2 + p.events.length, 0),
          0,
        );
        setTotalEvents(total);

        const allAnswers = allProgress.flatMap((p) => p.quizAnswers ?? []);
        const correctAnswers = allAnswers.filter((a) => a.correct).length;
        const accuracy =
          allAnswers.length > 0
            ? Math.round((correctAnswers / allAnswers.length) * 100)
            : 0;
        setQuizAccuracy(accuracy);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, [user]);

  if (!user) return null;
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  const progressPct = totalEvents > 0 ? Math.round((totalCompleted / totalEvents) * 100) : 0;
  const rankLabel = t(getRankKey(user.level));

  return (
    <div className="relative -mx-4 -mt-16 min-h-screen w-[calc(100%+2rem)] bg-black pb-24 pt-14 lg:-mx-8 lg:w-[calc(100%+4rem)]">
      {/* ── PROFILE INFO CARD (full width, above avatar banner) ── */}
      <div className="mx-4 mt-0 rounded-2xl border-t border-[#f5c842]/30 bg-[#141414] px-3 py-2 shadow-[0_-2px_12px_rgba(245,200,66,0.08)]">
        {/* Row 1: nickname (left) + pills (right) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5">
            {isEditingNickname ? (
              <form onSubmit={handleNicknameSubmit} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                  className="w-32 rounded-md border border-[#f5c842]/40 bg-[#0b0b0b] px-2 py-0.5 text-sm font-bold text-white outline-none focus:border-[#f5c842]"
                  autoFocus
                  maxLength={12}
                  minLength={2}
                />
                <button type="submit" disabled={nicknameSaving} className="rounded-md bg-[#f5c842]/20 p-1 text-[#f5c842]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
                <button type="button" onClick={() => setIsEditingNickname(false)} className="rounded-md bg-white/10 p-1 text-white/60">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </form>
            ) : (
              <>
                <h1 className="truncate text-[15px] font-extrabold text-white">{user.nickname}</h1>
                <button
                  type="button"
                  onClick={() => {
                    setEditNickname(user.nickname);
                    setIsEditingNickname(true);
                  }}
                  aria-label="edit nickname"
                  className="shrink-0 p-0.5 text-white/60"
                >
                  <Image src="/images/icon/modify001.png" width={12} height={12} alt="" />
                </button>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold text-white/80">
              {t('mypage.premium')}
            </span>
            <span className="rounded-full bg-[#f5c842] px-2 py-0.5 text-[9px] font-bold text-black">
              {t('mypage.levelPrefix')} {rankLabel}
            </span>
          </div>
        </div>

        {/* Row 2: stats */}
        <div className="mt-1.5 flex items-center justify-around border-t border-white/5 pt-1.5">
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-extrabold text-[#f5c842]">{progressPct}%</span>
            <span className="text-[9px] text-white/50">{t('mypage.progressRate')}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-extrabold text-[#f5c842]">{quizAccuracy}%</span>
            <span className="text-[9px] text-white/50">{t('mypage.accuracyRate')}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[15px] font-extrabold text-[#f5c842]">
              {(user.points ?? 0).toLocaleString()}
            </span>
            <span className="text-[9px] text-white/50">{t('mypage.points')}</span>
          </div>
        </div>
      </div>

      {/* ── PROFILE BANNER + RIGHT COLUMN (stacked on mobile, side-by-side from sm) ── */}
      <div className="mx-4 mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <div className="w-full sm:flex-[6] sm:min-w-0">
        <div
          ref={bannerRef}
          onPointerDown={() => setSelectedItemId(null)}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          style={{ backgroundColor: user.profileBgColor ?? DEFAULT_BG_COLOR }}
        >
          {/* Edit profile button top-right */}
          <button
            type="button"
            onClick={openProfileModal}
            className="absolute right-3 top-3 z-30 rounded-full bg-black/50 px-4 py-1.5 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-sm transition-transform active:scale-95"
            aria-label="edit profile"
          >
            {t('mypage.avatar')}
          </button>

          {/* Placed treasures (draggable) — behind character */}
          {placedItems.map((item) => {
            const selected = selectedItemId === item.id;
            return (
              <div
                key={item.id}
                onPointerDown={(e) => handleItemPointerDown(e, item)}
                onPointerMove={handleItemPointerMove}
                onPointerUp={(e) => handleItemPointerUp(e, item)}
                onPointerCancel={(e) => handleItemPointerUp(e, item)}
                className="absolute z-20 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none active:cursor-grabbing sm:h-[88px] sm:w-[88px]"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="pointer-events-none select-none object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]"
                  sizes="88px"
                  draggable={false}
                />
                {selected && (
                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlacedItem(item.id);
                    }}
                    aria-label="delete item"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#e85c5c] text-white shadow-lg"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}

          {/* Character — centered, fills banner height */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] flex h-[92%] justify-center">
            <div className="relative h-full w-[70%]">
              <Image
                src={`/images/avt/${user.profileImage ?? DEFAULT_AVT}.png`}
                alt="avatar"
                fill
                className="object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                sizes="(min-width: 1024px) 300px, 70vw"
                priority
              />
            </div>
          </div>
        </div>
        </div>

      {/* ── RIGHT COLUMN: treasure ─────────── */}
      <div className="flex flex-col gap-3 sm:flex-[4] sm:min-w-0">
      {/* ── TREASURE ────────────────────────────────── */}
      <div className="flex-1 rounded-2xl border border-[#f5c842]/20 bg-[#141414] px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white">
            {t('mypage.treasure')} <span className="text-white/40">({TREASURE_ICONS.length})</span>
          </h3>
          <button
            type="button"
            onClick={handleTreasuresSave}
            disabled={treasuresSaving || !treasuresDirty}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-bold transition-transform active:scale-95',
              treasuresDirty
                ? 'bg-[#f5c842] text-black'
                : 'bg-white/10 text-white/40 cursor-not-allowed',
            )}
          >
            {treasuresSaving ? t('common.loading') : t('common.save')}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-white/50">{t('mypage.treasureHint')}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {TREASURE_ICONS.map((icon, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addTreasureToBanner(icon)}
              aria-label="add treasure"
              className="transition-transform active:scale-90"
            >
              <Image src={icon} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
            </button>
          ))}
        </div>
      </div>
      </div>
      </div>

      {/* ── TABS ────────────────────────────────────── */}
      <div className="mt-6 flex items-center gap-6 px-5">
        <button
          type="button"
          onClick={() => setActiveTab('replay')}
          className={cn(
            'rounded-full px-5 py-1.5 text-sm font-bold transition-colors',
            activeTab === 'replay'
              ? 'border border-[#f5c842] text-[#f5c842]'
              : 'text-white/40',
          )}
        >
          다시하기
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('scenes')}
          className={cn(
            'rounded-full px-5 py-1.5 text-sm font-bold transition-colors',
            activeTab === 'scenes'
              ? 'border border-[#f5c842] text-[#f5c842]'
              : 'text-white/40',
          )}
        >
          장면모음
        </button>
      </div>

      {/* ── REPLAY HORIZONTAL SCROLL ────────────────── */}
      <div className="mt-4 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {replayCards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="relative h-[120px] w-[100px] shrink-0 overflow-hidden rounded-2xl"
          >
            <Image src={c.thumb} alt={c.title} fill className="object-cover" sizes="100px" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5c842] shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── TEAM ────────────────────────────────────── */}
      <div className="mt-6 px-5">
        <h3 className="text-[15px] font-bold text-white">
          {t('mypage.team')} <span className="text-white/40">({TEAM_PLACEHOLDERS.length})</span>
        </h3>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TEAM_PLACEHOLDERS.map((c, i) => (
            <div
              key={i}
              className="h-14 w-14 shrink-0 rounded-full ring-1 ring-white/10"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* ── PROFILE EDIT MODAL ──────────────────────── */}
      {showProfileModal && draftImage !== null && draftBgColor !== null && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeProfileModal}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col rounded-t-3xl border border-white/10 bg-[#141414] shadow-2xl sm:rounded-3xl">
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-lg font-bold text-white">{t('mypage.editProfileTitle')}</h3>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              {/* Preview */}
              <div className="mb-5 flex justify-center">
                <div
                  className="relative h-[110px] w-[110px] overflow-hidden rounded-[24px]"
                  style={{ backgroundColor: draftBgColor }}
                >
                  <Image
                    src={`/images/avt/${draftImage}.png`}
                    alt="preview"
                    fill
                    className="object-cover object-top"
                    sizes="110px"
                  />
                </div>
              </div>

              {/* Avatar images */}
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">
                {t('mypage.selectCharacter')}
              </p>
              {(() => {
                const totalPages = Math.max(1, Math.ceil(AVT_IMAGES.length / AVATARS_PER_PAGE));
                const start = avatarPage * AVATARS_PER_PAGE;
                const pageItems = AVT_IMAGES.slice(start, start + AVATARS_PER_PAGE);
                return (
                  <>
                    <div className="mb-3 grid grid-cols-5 gap-2">
                      {pageItems.map((id) => {
                        const selected = draftImage === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setDraftImage(id)}
                            className={cn(
                              'relative aspect-square overflow-hidden rounded-xl border-2 transition-all',
                              selected
                                ? 'border-[#f5c842] shadow-[0_0_12px_rgba(245,200,66,0.4)]'
                                : 'border-white/10 hover:border-white/30',
                            )}
                            style={{ backgroundColor: draftBgColor }}
                          >
                            <Image
                              src={`/images/avt/${id}.png`}
                              alt={id}
                              fill
                              className="object-cover object-top"
                              sizes="80px"
                            />
                          </button>
                        );
                      })}
                    </div>
                    <div className="mb-5 flex items-center justify-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => {
                        const active = i === avatarPage;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setAvatarPage(i)}
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                              active
                                ? 'bg-[#f5c842] text-black'
                                : 'bg-white/10 text-white/60 hover:bg-white/20',
                            )}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}

              {/* Bg colors */}
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">
                {t('mypage.bgColor')}
              </p>
              <div className="grid grid-cols-6 gap-2">
                {BG_COLORS.map((color) => {
                  const selected = draftBgColor === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDraftBgColor(color)}
                      aria-label={color}
                      className={cn(
                        'h-10 w-10 rounded-full border-2 transition-all',
                        selected
                          ? 'border-[#f5c842] shadow-[0_0_10px_rgba(245,200,66,0.5)] scale-110'
                          : 'border-white/10 hover:border-white/30',
                      )}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-3 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={closeProfileModal}
                disabled={profileSaving}
                className="flex-1 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/10 disabled:opacity-50"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleProfileSave}
                disabled={profileSaving}
                className="flex-1 rounded-full bg-[#f5c842] py-3 text-sm font-bold text-black transition-transform active:scale-95 disabled:opacity-50"
              >
                {profileSaving ? t('common.loading') : t('common.done')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
