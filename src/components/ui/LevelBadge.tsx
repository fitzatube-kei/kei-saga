import { cn } from '@/lib/utils/cn';
import { LEVELS } from '@/lib/utils/constants';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tierStyles: Record<number, { bg: string; text: string; glow: string }> = {
  1: { bg: 'from-stone-600 to-stone-700', text: 'text-stone-200', glow: '' },
  2: { bg: 'from-green-600 to-green-800', text: 'text-green-100', glow: '' },
  3: { bg: 'from-blue-500 to-blue-700', text: 'text-blue-100', glow: 'shadow-[0_0_8px_rgba(59,130,246,0.3)]' },
  4: { bg: 'from-purple-500 to-purple-700', text: 'text-purple-100', glow: 'shadow-[0_0_8px_rgba(139,92,246,0.3)]' },
  5: { bg: 'from-red-500 to-red-700', text: 'text-red-100', glow: 'shadow-[0_0_8px_rgba(239,68,68,0.3)]' },
  6: { bg: 'from-amber-500 to-amber-700', text: 'text-amber-100', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.4)]' },
  7: { bg: 'from-yellow-400 to-amber-500', text: 'text-yellow-950', glow: 'shadow-[0_0_12px_rgba(250,204,21,0.5)]' },
};

const sizeClasses = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-3 py-1 gap-1.5',
  lg: 'text-sm px-4 py-1.5 gap-2',
} as const;

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
  const clampedLevel = Math.max(1, Math.min(level ?? 1, LEVELS.length));
  const levelData = LEVELS[clampedLevel - 1] ?? LEVELS[0];
  const style = tierStyles[clampedLevel] ?? tierStyles[1];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-gradient-to-r font-bold',
        style.bg,
        style.text,
        style.glow,
        sizeClasses[size],
        className
      )}
    >
      <span>Lv.{clampedLevel}</span>
      <span className="opacity-80">·</span>
      <span>{levelData.name}</span>
    </span>
  );
}
