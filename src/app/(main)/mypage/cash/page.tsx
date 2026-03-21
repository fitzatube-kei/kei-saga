'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';

const cashPackages = [
  { id: 'cash-1000', amount: 1000, price: '₩1,100', bonus: '' },
  { id: 'cash-3000', amount: 3000, price: '₩3,300', bonus: '+300 보너스' },
  { id: 'cash-5000', amount: 5000, price: '₩5,500', bonus: '+700 보너스' },
];

export default function CashPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 py-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gold">{t('cash.title')}</h1>
        <div className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
          <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold text-gold">
            {user.cash.toLocaleString()} {t('cash.cash')}
          </span>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gold/20 bg-surface p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-8 w-8 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gold">{t('common.comingSoon')}</h2>
        <p className="text-sm text-gold/50">
          {t('cash.preparingMsg')}
        </p>
      </div>

      {/* Cash Package Cards */}
      <div className="space-y-3">
        {cashPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex items-center justify-between rounded-lg border border-gold/10 bg-surface p-4 opacity-60"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gold">
                  {pkg.amount.toLocaleString()} {t('cash.cash')}
                </span>
                {pkg.bonus && (
                  <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold">
                    {pkg.bonus}
                  </span>
                )}
              </div>
              <span className="text-sm text-gold/50">{pkg.price}</span>
            </div>
            <Button variant="secondary" size="sm" disabled>
              {t('common.preparing')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
