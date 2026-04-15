'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { getEra } from '@/data/eras/content';

interface GameBackgroundProps {
  eraId: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundPosition?: string;
  className?: string;
}

const PARTICLE_COUNT = 20;

export function GameBackground({ eraId, backgroundImage, backgroundVideo, backgroundPosition, className }: GameBackgroundProps) {
  const era = getEra(eraId);
  const baseColor = era?.imageColor ?? '#f5c842';

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <div
      className={cn('fixed inset-0 z-0 overflow-hidden', className)}
    >
      {/* Background video layer */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          playsInline
          style={backgroundPosition ? { objectPosition: backgroundPosition } : undefined}
        />
      )}

      {/* Background image layer */}
      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            ...(backgroundPosition && { backgroundPosition }),
          }}
        />
      )}

      {/* Gradient overlay (always shown, blends with image) */}
      <div
        className="absolute inset-0"
        style={{
          background: (backgroundImage || backgroundVideo)
            ? `linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.25) 100%)`
            : `
              radial-gradient(ellipse at 30% 20%, ${baseColor}22 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, ${baseColor}15 0%, transparent 50%),
              #000000
            `,
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${baseColor} 0px,
            ${baseColor} 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: baseColor,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

      <style jsx global>{`
        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: var(--tw-opacity, 0.2);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: calc(var(--tw-opacity, 0.2) * 1.5);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
