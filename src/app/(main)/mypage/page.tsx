'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { LevelBadge } from '@/components/ui/LevelBadge';
import { StatsOverview } from '@/components/ui/StatsOverview';
import { ProgressChart } from '@/components/ui/ProgressChart';
import { Card, Loading } from '@/components/ui';
import { getAllUserProgress } from '@/lib/firebase/progress';
import { updateUserNickname, updateUserProfileBg } from '@/lib/firebase/auth';
import { eras } from '@/data/eras';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

interface EraProgress {
  name: string;
  completedEvents: number;
  totalEvents: number;
}

const NAV_CARDS = [
  {
    labelKey: 'mypage.avatarCustom' as const,
    href: '/mypage/avatar',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    labelKey: 'mypage.friends' as const,
    href: '/mypage/friends',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    labelKey: 'mypage.cashCharge' as const,
    href: '/mypage/cash',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

// All available background images from the game
const BG_IMAGES = [
  { id: 'gojosun', src: '/images/play/gojosun_real_001.png', label: '고조선' },
  { id: 'treekingdomsearly', src: '/images/play/treekingdomsearly_real_001.png', label: '삼국시대 전기' },
  { id: 'treekingdomslate', src: '/images/play/treekingdomslate_real_001.png', label: '삼국시대 후기' },
  { id: 'silla', src: '/images/play/Silla_real_001.png', label: '통일신라' },
  { id: 'balhae', src: '/images/play/Balhae_real_001.png', label: '발해' },
  { id: 'goryeoearly', src: '/images/play/goryeoearly_real_001.png', label: '고려 전기' },
  { id: 'goryeolate', src: '/images/play/goryeolate_real_001.png', label: '고려 후기' },
  { id: 'joseonearly', src: '/images/play/joseonearly_real_001.png', label: '조선 전기' },
  { id: 'joseonlate', src: '/images/play/joseonlate_real_001.png', label: '조선 후기' },
  { id: 'koreanempire', src: '/images/play/koreanempire_real_001.png', label: '대한제국' },
  { id: 'japanese', src: '/images/play/japanese Colonial_real_001.png', label: '일제강점기' },
  { id: 'modern', src: '/images/play/seokguam_real_001.png', label: '현대' },
  { id: 'danchung', src: '/images/home/danchung_real_001.png', label: '단청' },
];

function getBgSrc(profileBg?: string): string | undefined {
  if (!profileBg) return undefined;
  return BG_IMAGES.find((b) => b.id === profileBg)?.src;
}

// ─── Background Picker Modal ─────────────────────────────────────────
function BgPickerModal({
  current,
  onSelect,
  onClose,
}: {
  current?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-fade-in rounded-2xl border border-gold/20 bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
          <h3 className="text-base font-bold text-gold">배경 선택</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 max-h-[60vh] overflow-y-auto">
          {/* None option */}
          <button
            type="button"
            onClick={() => onSelect('')}
            className={cn(
              'relative flex aspect-[16/10] items-center justify-center rounded-lg border-2 bg-background transition-all',
              !current
                ? 'border-gold shadow-[0_0_8px_rgba(212,160,23,0.3)]'
                : 'border-transparent hover:border-white/20'
            )}
          >
            <span className="text-xs text-white/40">없음</span>
          </button>
          {BG_IMAGES.map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => onSelect(bg.id)}
              className={cn(
                'relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all',
                current === bg.id
                  ? 'border-gold shadow-[0_0_8px_rgba(212,160,23,0.3)]'
                  : 'border-transparent hover:border-white/20'
              )}
            >
              <Image
                src={bg.src}
                alt={bg.label}
                fill
                className="object-cover"
                sizes="120px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-1 pt-3">
                <span className="text-[10px] font-medium text-white/90">{bg.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  const user = useAuthStore((s) => s.user);
  const updateNicknameStore = useAuthStore((s) => s.updateNickname);
  const updateProfileBgStore = useAuthStore((s) => s.updateProfileBg);
  const { t } = useTranslation();
  const [eraProgress, setEraProgress] = useState<EraProgress[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [quizAccuracy, setQuizAccuracy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);

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

  const handleBgSelect = async (bgId: string) => {
    if (!user) return;
    setShowBgPicker(false);
    try {
      await updateUserProfileBg(user.uid, bgId);
      updateProfileBgStore(bgId);
    } catch (err) {
      console.error('Failed to update profile bg:', err);
    }
  };

  useEffect(() => {
    if (!user) return;

    async function loadStats() {
      try {
        const allProgress = await getAllUserProgress(user!.uid);

        const completed = allProgress.filter((p) => p.completed).length;
        setTotalCompleted(completed);

        const allAnswers = allProgress.flatMap((p) => p.quizAnswers ?? []);
        const correctAnswers = allAnswers.filter((a) => a.correct).length;
        const accuracy =
          allAnswers.length > 0
            ? Math.round((correctAnswers / allAnswers.length) * 100)
            : 0;
        setQuizAccuracy(accuracy);

        const progressByEra: EraProgress[] = eras.map((era) => {
          const eraEvents = allProgress.filter((p) =>
            p.eventId.startsWith(era.id)
          );
          const completedInEra = eraEvents.filter((p) => p.completed).length;
          const totalInEra = Math.max(era.periods.reduce((sum, period) => sum + period.events.length, 0), eraEvents.length);

          return {
            name: era.name,
            completedEvents: completedInEra,
            totalEvents: totalInEra || 1,
          };
        });

        setEraProgress(progressByEra.filter((e) => e.totalEvents > 0));
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

  const bgSrc = getBgSrc(user.profileBg);

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4 lg:max-w-2xl">
      {/* ── 아바타 영역 ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-gold/20">
        {/* Background image */}
        {bgSrc ? (
          <Image
            src={bgSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a2d4a] to-surface" />
        )}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative flex items-center justify-center px-4 py-8 md:py-10">
          {/* Edit bg button */}
          <button
            type="button"
            onClick={() => setShowBgPicker(true)}
            className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            aria-label="배경 변경"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {/* Avatar */}
          <div className="w-48 md:w-56">
            <AvatarRenderer avatar={user.avatar} size="preview" />
          </div>
        </div>
      </div>

      {/* ── 닉네임 + 레벨 ────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-3">
        {isEditingNickname ? (
          <form onSubmit={handleNicknameSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              className="w-36 rounded-md border border-gold/30 bg-surface px-3 py-1.5 text-center text-lg font-bold text-gold outline-none focus:border-gold"
              autoFocus
              maxLength={12}
              minLength={2}
            />
            <button type="submit" className="rounded-md bg-gold/20 p-1.5 text-gold hover:bg-gold/30" disabled={nicknameSaving}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </button>
            <button type="button" onClick={() => setIsEditingNickname(false)} className="rounded-md bg-white/10 p-1.5 text-white/60 hover:bg-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gold">
              {user.nickname}
            </h1>
            <button
              type="button"
              onClick={() => { setEditNickname(user.nickname); setIsEditingNickname(true); }}
              className="rounded-md p-1 text-white/30 transition-colors hover:bg-white/10 hover:text-white/60"
              aria-label="별칭 수정"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
        <LevelBadge level={user.level} size="md" />
      </div>

      {/* ── 바로가기 ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {NAV_CARDS.map((nav) => (
          <Link key={nav.href} href={nav.href}>
            <Card
              variant="interactive"
              className={cn(
                'flex flex-col items-center gap-2 py-4 transition-colors',
                'hover:border-gold/40'
              )}
            >
              <div className="text-gold">{nav.icon}</div>
              <span className="text-center text-xs text-white/70">
                {t(nav.labelKey)}
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {/* ── 통계 요약 ────────────────────────────────────────────── */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('mypage.battleLog')}</h2>
        <StatsOverview
          totalPoints={user.points}
          quizAccuracy={quizAccuracy}
          completedEvents={totalCompleted}
          totalPlayTime={0}
        />
      </div>

      {/* ── 시대별 진행도 ────────────────────────────────────────── */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gold/80">{t('mypage.eraProgress')}</h2>
        <Card>
          <ProgressChart eras={eraProgress} />
        </Card>
      </div>

      {/* ── Background Picker Modal ──────────────────────────────── */}
      {showBgPicker && (
        <BgPickerModal
          current={user.profileBg}
          onSelect={handleBgSelect}
          onClose={() => setShowBgPicker(false)}
        />
      )}
    </div>
  );
}
