/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils/cn';
import { normalizeAvatar } from '@/types/user';
import { headHasBack, setHasFrontBack } from '@/data/avatarParts';
import type { AvatarConfig } from '@/types';

const sizeMap = {
  sm: 40,
  md: 64,
  lg: 128,
  xl: 256,
} as const;

interface AvatarRendererProps {
  avatar: AvatarConfig;
  size?: keyof typeof sizeMap | 'preview';
  className?: string;
}

function buildLayers(avatar: AvatarConfig): string[] {
  const layers: string[] = [];

  // Back layers (behind body)
  if (avatar.head !== 'none' && headHasBack(avatar.head)) {
    layers.push(`/images/avatar/head/${avatar.head}_back.svg`);
  }
  if (avatar.set !== 'none' && setHasFrontBack(avatar.set)) {
    layers.push(`/images/avatar/set/${avatar.set}_back.svg`);
  }

  // Body
  if (avatar.body !== 'none') {
    layers.push(`/images/avatar/body/${avatar.body}.svg`);
  }

  // Outfit
  if (avatar.outfit !== 'none') {
    layers.push(`/images/avatar/outfit/${avatar.outfit}.svg`);
  }

  // Face parts (order: beard, cheek, eye, eyebrow, nose, lips)
  if (avatar.beard !== 'none') {
    layers.push(`/images/avatar/face/beard/${avatar.beard}.svg`);
  }
  if (avatar.cheek !== 'none') {
    layers.push(`/images/avatar/face/cheek/${avatar.cheek}.svg`);
  }
  layers.push(`/images/avatar/face/eye/${avatar.eye}.svg`);
  layers.push(`/images/avatar/face/eyebrow/${avatar.eyebrow}.svg`);
  layers.push(`/images/avatar/face/nose/${avatar.nose}.svg`);
  layers.push(`/images/avatar/face/lips/${avatar.lips}.svg`);

  // Front layers
  if (avatar.head !== 'none') {
    layers.push(`/images/avatar/head/${avatar.head}_front.svg`);
  }
  if (avatar.set !== 'none') {
    if (setHasFrontBack(avatar.set)) {
      layers.push(`/images/avatar/set/${avatar.set}_front.svg`);
    } else {
      layers.push(`/images/avatar/set/${avatar.set}.svg`);
    }
  }

  return layers;
}

export function AvatarRenderer({ avatar: rawAvatar, size = 'md', className }: AvatarRendererProps) {
  const avatar = normalizeAvatar(rawAvatar as AvatarConfig & Record<string, unknown>);
  const layers = buildLayers(avatar);

  // Preview mode: full character display for the customizer
  if (size === 'preview') {
    return (
      <div className={cn('relative w-full', className)} style={{ aspectRatio: '29/26' }}>
        {layers.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
          />
        ))}
      </div>
    );
  }

  // Standard sizes: circular avatar display
  const px = sizeMap[size];

  return (
    <div
      className={cn('relative flex-shrink-0 overflow-hidden rounded-full', className)}
      style={{ width: px, height: px, background: '#2e3150' }}
    >
      {layers.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          className="pointer-events-none absolute select-none"
          style={{
            width: '130%',
            height: 'auto',
            left: '-15%',
            top: '-8%',
          }}
        />
      ))}
    </div>
  );
}
