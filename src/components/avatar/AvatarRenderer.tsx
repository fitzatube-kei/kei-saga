'use client';

import { cn } from '@/lib/utils/cn';
import type { AvatarConfig } from '@/types';

const sizeMap = {
  sm: 40,
  md: 64,
  lg: 128,
  xl: 256,
} as const;

interface AvatarRendererProps {
  avatar: AvatarConfig;
  size?: keyof typeof sizeMap;
  className?: string;
}

export function AvatarRenderer({ avatar, size = 'md', className }: AvatarRendererProps) {
  const px = sizeMap[size];
  const isMale = avatar.gender === 'male';

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      className={cn('flex-shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#1a1a2e" />

      {/* Body / Torso */}
      {isMale ? (
        <>
          {/* Male: broader shoulders */}
          <path
            d="M30 95 C30 72, 25 68, 32 62 L68 62 C75 68, 70 72, 70 95 Z"
            fill={avatar.outfit === 'default' ? '#3b3b5c' : '#4a3728'}
          />
          {/* Outfit collar */}
          <path
            d="M42 62 L50 68 L58 62"
            fill="none"
            stroke={avatar.outfit === 'default' ? '#d4a017' : '#c9a959'}
            strokeWidth="1.5"
          />
        </>
      ) : (
        <>
          {/* Female: narrower shoulders, slight curve */}
          <path
            d="M33 95 C33 74, 30 68, 36 62 L64 62 C70 68, 67 74, 67 95 Z"
            fill={avatar.outfit === 'default' ? '#3b3b5c' : '#4a3728'}
          />
          {/* Outfit collar / neckline */}
          <ellipse
            cx="50"
            cy="63"
            rx="8"
            ry="4"
            fill="none"
            stroke={avatar.outfit === 'default' ? '#d4a017' : '#c9a959'}
            strokeWidth="1.5"
          />
        </>
      )}

      {/* Neck */}
      <rect x="45" y="55" width="10" height="10" rx="2" fill={avatar.skinTone} />

      {/* Head */}
      <ellipse cx="50" cy="40" rx="18" ry="20" fill={avatar.skinTone} />

      {/* Eyes */}
      <ellipse cx="43" cy="40" rx="2.5" ry="2" fill="#1a1a2e" />
      <ellipse cx="57" cy="40" rx="2.5" ry="2" fill="#1a1a2e" />

      {/* Eye shine */}
      <circle cx="44" cy="39" r="0.8" fill="white" />
      <circle cx="58" cy="39" r="0.8" fill="white" />

      {/* Mouth */}
      <path
        d="M46 47 Q50 50 54 47"
        fill="none"
        stroke="#c27a5a"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Hair */}
      {isMale ? (
        <>
          {/* Male: short hair */}
          <path
            d="M32 38 C32 20, 40 15, 50 14 C60 15, 68 20, 68 38 C68 30, 64 22, 50 20 C36 22, 32 30, 32 38 Z"
            fill={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
          />
          {/* Hair top volume */}
          <ellipse
            cx="50"
            cy="22"
            rx="16"
            ry="8"
            fill={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
          />
        </>
      ) : (
        <>
          {/* Female: long hair */}
          <path
            d="M32 38 C32 20, 40 15, 50 14 C60 15, 68 20, 68 38 C68 30, 64 22, 50 20 C36 22, 32 30, 32 38 Z"
            fill={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
          />
          {/* Hair top volume */}
          <ellipse
            cx="50"
            cy="22"
            rx="17"
            ry="9"
            fill={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
          />
          {/* Long side hair left */}
          <path
            d="M32 35 C28 40, 27 55, 30 70"
            fill="none"
            stroke={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Long side hair right */}
          <path
            d="M68 35 C72 40, 73 55, 70 70"
            fill="none"
            stroke={avatar.hair === 'default' ? '#1a1a2e' : '#4a3020'}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Accessory */}
      {avatar.accessory !== 'none' && (
        <>
          {/* Simple headband / crown accessory */}
          <path
            d="M34 30 L40 26 L46 30 L50 24 L54 30 L60 26 L66 30"
            fill="none"
            stroke="#d4a017"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
