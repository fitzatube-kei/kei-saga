export interface UserProfile {
  uid: string;
  email: string;
  nickname: string;
  avatar: AvatarConfig;
  points: number;
  cash: number;
  level: number;
  lastPlayedEraId?: string;
  profileBg?: string;
  createdAt: Date;
}

export interface AvatarConfig {
  body: string;     // 'body001' ~ 'body016'
  eye: string;      // 'eye001' ~ 'eye004'
  eyebrow: string;  // 'eyebrow001' ~ 'eyebrow004'
  nose: string;     // 'nose001' ~ 'nose005'
  lips: string;     // 'lips001' ~ 'lips005'
  cheek: string;    // 'cheek001' ~ 'cheek004' or 'none'
  beard: string;    // 'beard001' ~ 'beard004' or 'none'
  head: string;     // 'head001' ~ 'head004' or 'none'
  outfit: string;   // 'outfit001' ~ 'outfit004' or 'none'
  set: string;      // 'set001' ~ 'set004' or 'none'
  // Legacy fields for backward compatibility with old Firestore data
  gender?: 'male' | 'female';
  skinTone?: string;
  hair?: string;
  accessory?: string;
}

export interface InventoryItem {
  itemId: string;
  acquiredAt: Date;
  equipped: boolean;
}

/** Default avatar config for new users */
export const DEFAULT_AVATAR: AvatarConfig = {
  body: 'body001',
  eye: 'eye001',
  eyebrow: 'eyebrow001',
  nose: 'nose001',
  lips: 'lips001',
  cheek: 'cheek001',
  beard: 'none',
  head: 'none',
  outfit: 'none',
  set: 'none',
};

/** Normalize legacy avatar configs to new format */
export function normalizeAvatar(avatar: Partial<AvatarConfig> & Record<string, unknown>): AvatarConfig {
  if (avatar.body) return avatar as AvatarConfig;
  return { ...DEFAULT_AVATAR };
}
