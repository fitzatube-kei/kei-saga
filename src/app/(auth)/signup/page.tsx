'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signUp } from '@/lib/firebase/auth';
import { Button, Input } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

function getKoreanErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/invalid-email':
      return '올바른 이메일 형식이 아닙니다.';
    case 'auth/weak-password':
      return '비밀번호는 6자 이상이어야 합니다.';
    case 'auth/operation-not-allowed':
      return '회원가입이 허용되지 않습니다.';
    default:
      return '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

export default function SignupPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (nickname.trim().length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
      return;
    }
    if (nickname.trim().length > 12) {
      setError('닉네임은 12자 이하여야 합니다.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, nickname.trim());
      router.push('/avatar-select');
    } catch (err: any) {
      console.error('Signup error:', err);
      const code = err?.code || '';
      const detail = err?.message || '';
      setError(getKoreanErrorMessage(code) + (code ? ` (${code})` : ` (${detail})`));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
      <Image src="/images/KEISAGA001.png" alt="KEI SAGA" width={200} height={54} priority className="mb-2" />
      <p className="mb-8 text-sm text-white/50">{t('auth.signupSubtitle')}</p>

      {/* Signup form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          label={t('auth.email')}
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('auth.nickname')}
          type="text"
          placeholder="2~12자"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Input
          label={t('auth.password')}
          type="password"
          placeholder="6자 이상"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label={t('auth.confirmPassword')}
          type="password"
          placeholder={t('auth.confirmPassword')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          {t('auth.signup')}
        </Button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-sm text-white/50">
        {t('auth.hasAccount')}{' '}
        <Link
          href="/login"
          className="text-gold underline-offset-4 hover:underline"
        >
          {t('auth.login')}
        </Link>
      </p>
    </div>
  );
}
