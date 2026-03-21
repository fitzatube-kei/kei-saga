'use client';

import { cn } from '@/lib/utils/cn';

interface EraProgress {
  name: string;
  completedEvents: number;
  totalEvents: number;
}

interface ProgressChartProps {
  eras: EraProgress[];
  className?: string;
}

export function ProgressChart({ eras, className }: ProgressChartProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {eras.map((era) => {
        const pct = era.totalEvents > 0
          ? Math.round((era.completedEvents / era.totalEvents) * 100)
          : 0;

        return (
          <div key={era.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="truncate text-white/80">{era.name}</span>
              <span className="ml-2 shrink-0 text-xs text-gold/80">
                {era.completedEvents}/{era.totalEvents} ({pct}%)
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}

      {eras.length === 0 && (
        <p className="text-center text-sm text-white/40">
          아직 진행한 시대가 없습니다.
        </p>
      )}
    </div>
  );
}
