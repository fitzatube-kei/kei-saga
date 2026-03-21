'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from '@/lib/firebase/auth';
import { Button, Input } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

function getKoreanErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return '올바른 이메일 형식이 아닙니다.';
    case 'auth/user-disabled':
      return '비활성화된 계정입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 계정입니다.';
    case 'auth/wrong-password':
      return '비밀번호가 올바르지 않습니다.';
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'auth/too-many-requests':
      return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
    default:
      return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/home');
    } catch (err: any) {
      const code = err?.code || '';
      setError(getKoreanErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
      <Image src="/images/KEISAGA001.png" alt="KEI SAGA" width={200} height={54} priority className="mb-2" />
      <p className="mb-8 text-sm text-white/50">{t('auth.loginSubtitle')}</p>

      {/* Login form */}
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
          label={t('auth.password')}
          type="password"
          placeholder={t('auth.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {t('auth.login')}
        </Button>
      </form>

      {/* Signup link */}
      <p className="mt-6 text-sm text-white/50">
        {t('auth.noAccount')}{' '}
        <Link
          href="/signup"
          className="text-gold underline-offset-4 hover:underline"
        >
          {t('auth.signup')}
        </Link>
      </p>
    </div>
  );
}
