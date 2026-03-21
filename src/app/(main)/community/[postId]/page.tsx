'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { AvatarRenderer } from '@/components/avatar/AvatarRenderer';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, Loading, Button, Input } from '@/components/ui';
import {
  getPost,
  likePost,
  getComments,
  addComment,
  votePoll,
} from '@/lib/firebase/community';
import { timeAgo } from '@/lib/utils/time';
import { cn } from '@/lib/utils/cn';
import type { Post, Comment as CommentType, PollOption } from '@/types';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId as string;
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [postData, commentsData] = await Promise.all([
        getPost(postId),
        getComments(postId),
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      console.error('Failed to load post:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleLike() {
    if (!post || liked) return;
    try {
      await likePost(post.id);
      setPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : prev));
      setLiked(true);
    } catch (err) {
      console.error('Failed to like:', err);
    }
  }

  async function handleVote() {
    if (!post || !user || !selectedOption || voted) return;
    try {
      const success = await votePoll(post.id, selectedOption, user.uid);
      if (success) {
        setVoted(true);
        setPost((prev) => {
          if (!prev || !prev.poll) return prev;
          return {
            ...prev,
            poll: {
              ...prev.poll,
              totalVotes: prev.poll.totalVotes + 1,
              options: prev.poll.options.map((opt) =>
                opt.id === selectedOption
                  ? { ...opt, votes: opt.votes + 1 }
                  : opt
              ),
            },
          };
        });
      }
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  }

  async function handleAddComment() {
    if (!user || !commentText.trim()) return;
    try {
      setSubmittingComment(true);
      await addComment(postId, {
        authorUid: user.uid,
        authorNickname: user.nickname,
        authorAvatar: user.avatar,
        content: commentText.trim(),
      });
      setCommentText('');
      // 댓글 새로고침
      const updatedComments = await getComments(postId);
      setComments(updatedComments);
      setPost((prev) =>
        prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev
      );
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-white/40">{t('community.notFound')}</p>
      </div>
    );
  }

  const showResults = voted || !user;

  return (
    <div className="mx-auto max-w-lg pb-24 pt-4">
      {/* 게시글 */}
      <Card className="space-y-4">
        {/* 작성자 */}
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-full border border-gold/20">
            <AvatarRenderer avatar={post.authorAvatar} size="md" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white/90">
              {post.authorNickname}
            </p>
            <p className="text-xs text-white/40">
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {/* 제목 & 내용 */}
        <div>
          <h1 className="mb-2 text-lg font-bold text-white">{post.title}</h1>
          {post.content && (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
              {post.content}
            </p>
          )}
        </div>

        {/* 투표 */}
        {post.type === 'poll' && post.poll && (
          <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-sm font-semibold text-gold/80">{t('community.poll')}</p>
            {post.poll.options.map((opt: PollOption) => {
              const pct =
                post.poll!.totalVotes > 0
                  ? Math.round((opt.votes / post.poll!.totalVotes) * 100)
                  : 0;

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={voted || !user}
                  onClick={() => setSelectedOption(opt.id)}
                  className={cn(
                    'relative w-full overflow-hidden rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                    selectedOption === opt.id && !voted
                      ? 'border-gold/60 bg-gold/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10',
                    (voted || !user) && 'cursor-default'
                  )}
                >
                  {showResults && (
                    <div
                      className="absolute inset-y-0 left-0 bg-gold/10 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  )}
                  <span className="relative z-10 text-white/80">
                    {opt.text}
                  </span>
                  {showResults && (
                    <span className="relative z-10 float-right text-xs text-gold/70">
                      {pct}% ({opt.votes}표)
                    </span>
                  )}
                </button>
              );
            })}

            {!voted && user && selectedOption && (
              <Button className="mt-2 w-full" onClick={handleVote}>
                {t('community.vote')}
              </Button>
            )}

            <p className="mt-2 text-center text-xs text-white/30">
              {t('community.total')} {post.poll.totalVotes}{t('community.participants')}
            </p>
          </div>
        )}

        {/* 좋아요 */}
        <div className="flex items-center border-t border-white/5 pt-3">
          <button
            type="button"
            onClick={handleLike}
            disabled={liked}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors',
              liked
                ? 'text-red-400'
                : 'text-white/40 hover:bg-white/5 hover:text-red-400'
            )}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {post.likes}
          </button>
          <span className="ml-4 flex items-center gap-1.5 text-sm text-white/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {post.commentCount}
          </span>
        </div>
      </Card>

      {/* 댓글 목록 */}
      <div className="mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-gold/80">
          {t('community.comments')} {comments.length}
        </h2>

        {comments.length === 0 ? (
          <p className="py-6 text-center text-sm text-white/30">
            {t('community.firstComment')}
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
            >
              <div className="shrink-0 overflow-hidden rounded-full border border-gold/10">
                <AvatarRenderer avatar={comment.authorAvatar} size="sm" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white/70">
                    {comment.authorNickname}
                  </span>
                  <span className="text-[10px] text-white/30">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 댓글 입력 (하단 고정) */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-dark-bg/95 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg items-center gap-2">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t('community.commentPlaceholder')}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <Button
              size="sm"
              onClick={handleAddComment}
              disabled={submittingComment || !commentText.trim()}
            >
              {submittingComment ? '...' : t('community.send')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
