import { cn } from '@/lib/utils/cn';
import type { Character } from '@/types/game';

interface CharacterSpriteProps {
  character: Character;
  speaking: boolean;
  className?: string;
}

export function CharacterSprite({
  character,
  speaking,
  className,
}: CharacterSpriteProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        speaking && 'animate-[bounce-subtle_1s_ease-in-out_infinite]',
        className
      )}
    >
      {/* Character SVG */}
      <svg
        width="180"
        height="280"
        viewBox="0 0 180 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_20px_rgba(212,160,23,0.3)]"
      >
        {/* Hat / Crown */}
        <rect
          x="55"
          y="10"
          width="70"
          height="20"
          rx="4"
          fill={character.secondaryColor}
        />
        <rect
          x="50"
          y="26"
          width="80"
          height="8"
          rx="2"
          fill={character.secondaryColor}
          opacity="0.8"
        />
        {/* Crown ornament */}
        <rect
          x="85"
          y="2"
          width="10"
          height="12"
          rx="2"
          fill={character.secondaryColor}
        />

        {/* Face */}
        <ellipse cx="90" cy="55" rx="30" ry="24" fill="#F5D0A9" />
        {/* Eyes */}
        <ellipse cx="78" cy="52" rx="3" ry="3.5" fill="#1a1a2e" />
        <ellipse cx="102" cy="52" rx="3" ry="3.5" fill="#1a1a2e" />
        {/* Eyebrows */}
        <line
          x1="72"
          y1="45"
          x2="83"
          y2="44"
          stroke="#3a2a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="97"
          y1="44"
          x2="108"
          y2="45"
          stroke="#3a2a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Mouth */}
        {speaking ? (
          <ellipse cx="90" cy="66" rx="6" ry="4" fill="#c97a6a" />
        ) : (
          <path
            d="M84 65 Q90 70 96 65"
            stroke="#c97a6a"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Neck */}
        <rect x="82" y="76" width="16" height="12" fill="#F5D0A9" />

        {/* Robe body */}
        <path
          d="M45 88 L55 85 L90 82 L125 85 L135 88 L140 200 L40 200 Z"
          fill={character.primaryColor}
        />
        {/* Inner robe overlap */}
        <path
          d="M75 85 L90 82 L105 85 L100 200 L80 200 Z"
          fill={character.primaryColor}
          opacity="0.7"
        />
        {/* Belt / sash */}
        <rect
          x="50"
          y="130"
          width="80"
          height="8"
          rx="2"
          fill={character.secondaryColor}
        />
        <rect
          x="82"
          y="130"
          width="16"
          height="8"
          rx="2"
          fill={character.secondaryColor}
          opacity="0.8"
        />

        {/* Robe collar */}
        <path
          d="M75 85 L90 82 L90 110"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M105 85 L90 82 L90 110"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />

        {/* Sleeves */}
        <path
          d="M45 88 L20 140 L30 145 L55 100"
          fill={character.primaryColor}
        />
        <path
          d="M135 88 L160 140 L150 145 L125 100"
          fill={character.primaryColor}
        />
        {/* Sleeve edges */}
        <path
          d="M20 140 L30 145"
          stroke={character.secondaryColor}
          strokeWidth="2"
        />
        <path
          d="M160 140 L150 145"
          stroke={character.secondaryColor}
          strokeWidth="2"
        />

        {/* Lower robe / skirt */}
        <path
          d="M40 200 L35 265 L70 265 L75 200"
          fill={character.primaryColor}
          opacity="0.9"
        />
        <path
          d="M105 200 L110 265 L145 265 L140 200"
          fill={character.primaryColor}
          opacity="0.9"
        />

        {/* Robe hem decoration */}
        <line
          x1="35"
          y1="265"
          x2="145"
          y2="265"
          stroke={character.secondaryColor}
          strokeWidth="2"
        />

        {/* Feet */}
        <ellipse cx="55" cy="272" rx="18" ry="6" fill="#2a2a2a" />
        <ellipse cx="125" cy="272" rx="18" ry="6" fill="#2a2a2a" />
      </svg>

      {/* Name and title */}
      <div className="mt-4 text-center">
        <p className="text-lg font-bold text-gold text-glow">
          {character.name}
        </p>
        <p className="text-sm text-gold/60">{character.title}</p>
      </div>

      {/* Speaking bounce animation (CSS-in-JS via style tag) */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}
