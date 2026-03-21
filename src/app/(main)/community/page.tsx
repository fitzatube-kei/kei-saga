'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';
import { Card, Loading } from '@/components/ui';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { getPosts } from '@/lib/firebase/community';
import { timeAgo } from '@/lib/utils/time';
import type { Post } from '@/types';
import type { DocumentSnapshot } from 'firebase/firestore';

type TabFilter = 'all' | 'text' | 'poll';

const TABS: { key: TabFilter; labelKey: string }[] = [
  { key: 'all', labelKey: 'community.all' },
  { key: 'text', labelKey: 'community.text' },
  { key: 'poll', labelKey: 'community.poll' },
];

export default function CommunityPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [tab, setTab] = useState<TabFilter>('all');
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async (isLoadMore = false) => {
    try {
      setLoading(true);
      const result = await getPosts(20, isLoadMore ? lastDoc ?? undefined : undefined);
      if (isLoadMore) {
        setPosts((prev) => [...prev, ...result.posts]);
      } else {
        setPosts(result.posts);
      }
      setLastDoc(result.lastDoc);
      setHasMore(result.posts.length >= 20);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  useEffect(() => {
    loadPosts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered =
    tab === 'all' ? posts : posts.filter((p) => p.type === tab);

  return (
    <div className="mx-auto max-w-lg space-y-4 py-4">
      <h1 className="text-glow text-2xl font-bold text-gold">{t('community.title')}</h1>

      {/* 탭 */}
      <div className="flex gap-2">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.key}
            type="button"
            onClick={() => setTab(tabItem.key)}
            className={cn(
              'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
              tab === tabItem.key
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
            )}
          >
            {t(tabItem.labelKey)}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      {loading && posts.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loading size="lg" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-white/40">
          게시글이 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`}>
              <Card
                variant="interactive"
                className="mb-3 transition-colors hover:border-gold/30"
              >
                {/* 작성자 */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="overflow-hidden rounded-full border border-gold/20">
                    <AvatarRenderer avatar={post.authorAvatar} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-white/70">
                    {post.authorNickname}
                  </span>
                  <span
                    className={cn(
                      'ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold',
                      post.type === 'poll'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-gold/10 text-gold/70'
                    )}
                  >
                    {post.type === 'poll' ? t('community.poll') : t('community.text')}
                  </span>
                </div>

                {/* 제목 & 내용 미리보기 */}
                <h3 className="mb-1 text-sm font-semibold text-white/90">
                  {post.title}
                </h3>
                {post.content && (
                  <p className="mb-3 line-clamp-2 text-xs text-white/50">
                    {post.content}
                  </p>
                )}

                {/* 메타 */}
                <div className="flex items-center gap-3 text-xs text-white/40">
                  {/* 좋아요 */}
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {post.likes}
                  </span>
                  {/* 댓글 */}
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {post.commentCount}
                  </span>
                  {/* 시간 */}
                  <span className="ml-auto">{timeAgo(post.createdAt)}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* 더 보기 */}
      {hasMore && !loading && posts.length > 0 && (
        <button
          type="button"
          onClick={() => loadPosts(true)}
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 text-sm text-white/50 transition-colors hover:bg-white/10"
        >
          {t('community.loadMore')}
        </button>
      )}

      {loading && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <Loading size="sm" />
        </div>
      )}

      {/* 글쓰기 FAB */}
      <Link
        href="/community/create"
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-[0_0_20px_rgba(212,160,23,0.4)] transition-transform hover:scale-110"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
