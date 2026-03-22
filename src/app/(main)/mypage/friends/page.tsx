'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';
import {
  getFriends,
  removeFriend,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  searchUsers,
  sendFriendRequest,
  type FriendProfile,
  type FriendRequest,
  type UserSearchResult,
} from '@/lib/firebase/friends';
import type { AvatarConfig } from '@/types/user';

// ─── Tab definitions ─────────────────────────────────────────────────

type Tab = 'list' | 'requests' | 'search';

const tabs: { key: Tab; labelKey: string }[] = [
  { key: 'list', labelKey: 'friends.list' },
  { key: 'requests', labelKey: 'friends.requests' },
  { key: 'search', labelKey: 'friends.search' },
];

// ─── Page ────────────────────────────────────────────────────────────

export default function FriendsPage() {
  const user = useAuthStore((s) => s.user);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('list');

  return (
    <div className="mx-auto max-w-lg space-y-6 lg:max-w-2xl">
      {/* Title */}
      <h1 className="text-glow text-2xl font-bold tracking-wider text-gold">
        {t('friends.title')}
      </h1>

      {/* Tab bar */}
      <div className="flex rounded-lg border border-gold/20 bg-black/40 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium transition-all',
              activeTab === tab.key
                ? 'bg-gold/20 text-gold shadow-[0_0_12px_rgba(212,160,23,0.15)]'
                : 'text-white/50 hover:text-white/70'
            )}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {user && activeTab === 'list' && <FriendListTab uid={user.uid} />}
      {user && activeTab === 'requests' && <FriendRequestsTab uid={user.uid} />}
      {user && activeTab === 'search' && <FriendSearchTab user={user} />}
    </div>
  );
}

// ─── Friend List Tab ─────────────────────────────────────────────────

function FriendListTab({ uid }: { uid: string }) {
  const { t } = useTranslation();
  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFriends = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFriends(uid);
      setFriends(data);
    } catch {
      console.error('친구 목록 로드 실패');
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  const handleRemove = async (friendUid: string) => {
    if (!confirm('정말로 이 친구를 삭제하시겠습니까?')) return;
    try {
      await removeFriend(uid, friendUid);
      setFriends((prev) => prev.filter((f) => f.uid !== friendUid));
    } catch {
      alert('친구 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (friends.length === 0) {
    return (
      <EmptyState message={t('friends.noFriends')} />
    );
  }

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <div
          key={friend.uid}
          className="flex items-center gap-3 rounded-lg border border-gold/10 bg-black/30 p-3 transition-colors hover:border-gold/25"
        >
          <AvatarRenderer avatar={friend.avatar as AvatarConfig} size="sm" />

          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-white">{friend.nickname}</p>
            <LevelBadge level={friend.level} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
            >
              {t('friends.gift')}
            </button>
            <button
              type="button"
              onClick={() => handleRemove(friend.uid)}
              className="rounded-md border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              {t('common.delete')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Friend Requests Tab ─────────────────────────────────────────────

function FriendRequestsTab({ uid }: { uid: string }) {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPendingRequests(uid);
      setRequests(data);
    } catch {
      console.error('친구 요청 로드 실패');
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleAccept = async (req: FriendRequest) => {
    try {
      setProcessing(req.id);
      await acceptFriendRequest(req.id, req.fromUid, uid);
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    } catch {
      alert('요청 수락에 실패했습니다.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (req: FriendRequest) => {
    try {
      setProcessing(req.id);
      await rejectFriendRequest(req.id);
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    } catch {
      alert('요청 거절에 실패했습니다.');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requests.length === 0) {
    return <EmptyState message={t('friends.noRequests')} />;
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <div
          key={req.id}
          className="flex items-center gap-3 rounded-lg border border-gold/10 bg-black/30 p-3 transition-colors hover:border-gold/25"
        >
          <AvatarRenderer avatar={req.fromAvatar as AvatarConfig} size="sm" />

          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-white">{req.fromNickname}</p>
            <p className="text-xs text-white/40">{t('friends.sentRequestMsg')}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={processing === req.id}
              onClick={() => handleAccept(req)}
              className="rounded-md bg-gold/20 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/30 disabled:opacity-50"
            >
              {t('friends.accept')}
            </button>
            <button
              type="button"
              disabled={processing === req.id}
              onClick={() => handleReject(req)}
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 disabled:opacity-50"
            >
              {t('friends.reject')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Friend Search Tab ───────────────────────────────────────────────

function FriendSearchTab({
  user,
}: {
  user: { uid: string; nickname: string; avatar: AvatarConfig };
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [friendUids, setFriendUids] = useState<Set<string>>(new Set());
  const [sentUids, setSentUids] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  // Load current friends for the "already friend" indicator
  useEffect(() => {
    (async () => {
      try {
        const friends = await getFriends(user.uid);
        setFriendUids(new Set(friends.map((f) => f.uid)));
      } catch {
        // silent
      }
    })();
  }, [user.uid]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const data = await searchUsers(searchQuery.trim());
      // Exclude self from results
      setResults(data.filter((u) => u.uid !== user.uid));
    } catch {
      alert('검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (toUid: string) => {
    try {
      await sendFriendRequest(
        { uid: user.uid, nickname: user.nickname, avatar: user.avatar as Record<string, string> },
        toUid
      );
      setSentUids((prev) => new Set(prev).add(toUid));
    } catch {
      alert('친구 요청 전송에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={t('friends.searchPlaceholder')}
          className="flex-1 rounded-lg border border-gold/20 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold/50"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="rounded-lg bg-gold/20 px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/30 disabled:opacity-50"
        >
          {loading ? '...' : t('common.search')}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((u) => {
            const isFriend = friendUids.has(u.uid);
            const isSent = sentUids.has(u.uid);

            return (
              <div
                key={u.uid}
                className="flex items-center gap-3 rounded-lg border border-gold/10 bg-black/30 p-3 transition-colors hover:border-gold/25"
              >
                <AvatarRenderer avatar={u.avatar as AvatarConfig} size="sm" />

                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-white">{u.nickname}</p>
                  <LevelBadge level={u.level} />
                </div>

                {isFriend ? (
                  <span className="rounded-md bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold/60">
                    {t('friends.alreadyFriend')}
                  </span>
                ) : isSent ? (
                  <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-white/40">
                    {t('friends.requestSent')}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendRequest(u.uid)}
                    className="rounded-md bg-gold/20 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/30"
                  >
                    {t('friends.sendRequest')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty search result */}
      {!loading && results.length === 0 && searchQuery.trim() && (
        <EmptyState message={t('friends.noResults')} />
      )}
    </div>
  );
}

// ─── Shared components ───────────────────────────────────────────────

function LevelBadge({ level }: { level: number }) {
  return (
    <span className="inline-block rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-semibold text-gold/70">
      Lv. {level}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 text-gold/20"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <p className="text-sm text-white/40">{message}</p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
    </div>
  );
}
