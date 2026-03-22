'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { createPost } from '@/lib/firebase/community';
import { Button, Card, Input } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils/cn';

type PostType = 'text' | 'poll';

interface PollOptionInput {
  id: string;
  text: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const [postType, setPostType] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<PollOptionInput[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const [submitting, setSubmitting] = useState(false);

  function addOption() {
    if (pollOptions.length >= 4) return;
    setPollOptions((prev) => [
      ...prev,
      { id: String(prev.length + 1), text: '' },
    ]);
  }

  function removeOption(id: string) {
    if (pollOptions.length <= 2) return;
    setPollOptions((prev) => prev.filter((o) => o.id !== id));
  }

  function updateOption(id: string, text: string) {
    setPollOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, text } : o))
    );
  }

  async function handleSubmit() {
    if (!user) return;
    if (!title.trim()) return;

    if (postType === 'text' && !content.trim()) return;
    if (postType === 'poll') {
      const filledOptions = pollOptions.filter((o) => o.text.trim());
      if (filledOptions.length < 2) return;
    }

    try {
      setSubmitting(true);

      const postData: Parameters<typeof createPost>[0] = {
        authorUid: user.uid,
        authorNickname: user.nickname,
        authorAvatar: user.avatar,
        type: postType,
        title: title.trim(),
        content: postType === 'text' ? content.trim() : pollQuestion.trim(),
      };

      if (postType === 'poll') {
        postData.poll = {
          options: pollOptions
            .filter((o) => o.text.trim())
            .map((o) => ({ id: o.id, text: o.text.trim(), votes: 0 })),
          totalVotes: 0,
        };
      }

      await createPost(postData);
      router.push('/community');
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4 lg:max-w-2xl">
      <h1 className="text-glow text-2xl font-bold text-gold">{t('community.write')}</h1>

      {/* 타입 토글 */}
      <div className="flex overflow-hidden rounded-lg border border-white/10">
        {(['text', 'poll'] as PostType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setPostType(type)}
            className={cn(
              'flex-1 py-2 text-sm font-medium transition-colors',
              postType === type
                ? 'bg-gold/20 text-gold'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            )}
          >
            {type === 'text' ? t('community.text') : t('community.poll')}
          </button>
        ))}
      </div>

      {/* 제목 */}
      <div>
        <label className="mb-1 block text-xs text-white/40">{t('community.postTitle')}</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('community.titlePlaceholder')}
          maxLength={100}
        />
      </div>

      {/* 텍스트 게시글 */}
      {postType === 'text' && (
        <div>
          <label className="mb-1 block text-xs text-white/40">{t('community.content')}</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('community.contentPlaceholder')}
            rows={8}
            maxLength={2000}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder-white/30 outline-none transition-colors focus:border-gold/40"
          />
        </div>
      )}

      {/* 투표 게시글 */}
      {postType === 'poll' && (
        <>
          <div>
            <label className="mb-1 block text-xs text-white/40">{t('community.question')}</label>
            <Input
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder={t('community.pollPlaceholder')}
              maxLength={200}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-white/40">{t('community.options')}</label>
            <div className="space-y-2">
              {pollOptions.map((opt, idx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs text-gold/60">
                    {idx + 1}
                  </span>
                  <Input
                    value={opt.text}
                    onChange={(e) => updateOption(opt.id, e.target.value)}
                    placeholder={`${t('community.optionPlaceholder')} ${idx + 1}`}
                    maxLength={100}
                    className="flex-1"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(opt.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {pollOptions.length < 4 && (
              <button
                type="button"
                onClick={addOption}
                className="mt-2 flex items-center gap-1 text-xs text-gold/60 transition-colors hover:text-gold"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                {t('community.addOption')}
              </button>
            )}
          </div>
        </>
      )}

      {/* 제출 */}
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={submitting || !title.trim()}
      >
        {submitting ? t('community.submitting') : t('community.submit')}
      </Button>
    </div>
  );
}
