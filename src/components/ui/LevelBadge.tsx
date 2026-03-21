import { cn } from '@/lib/utils/cn';
import { LEVELS } from '@/lib/utils/constants';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-12 text-xs',
  md: 'w-14 h-16 text-sm',
  lg: 'w-20 h-24 text-base',
} as const;

const tierColors: Record<number, { bg: string; border: string; text: string }> = {
  1: { bg: 'bg-stone-700', border: 'border-stone-500', text: 'text-stone-300' },
  2: { bg: 'bg-green-900', border: 'border-green-600', text: 'text-green-300' },
  3: { bg: 'bg-blue-900', border: 'border-blue-500', text: 'text-blue-300' },
  4: { bg: 'bg-purple-900', border: 'border-purple-500', text: 'text-purple-300' },
  5: { bg: 'bg-red-900', border: 'border-red-500', text: 'text-red-300' },
  6: { bg: 'bg-amber-900', border: 'border-amber-500', text: 'text-amber-300' },
  7: { bg: 'bg-yellow-900', border: 'border-yellow-400', text: 'text-yellow-200' },
};

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
  const clampedLevel = Math.max(1, Math.min(level ?? 1, LEVELS.length));
  const levelData = LEVELS[clampedLevel - 1] ?? LEVELS[0];
  const colors = tierColors[clampedLevel] ?? tierColors[1];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center border-2',
        colors.bg,
        colors.border,
        sizeClasses[size],
        className
      )}
      style={{
        clipPath:
          'polygon(50% 0%, 85% 10%, 100% 40%, 100% 75%, 80% 100%, 20% 100%, 0% 75%, 0% 40%, 15% 10%)',
      }}
    >
      <span className={cn('font-bold leading-none', colors.text)}>
        Lv.{clampedLevel}
      </span>
      <span className={cn('mt-0.5 font-semibold leading-none', colors.text, size === 'sm' && 'text-[10px]')}>
        {levelData.name}
      </span>
    </div>
  );
}
