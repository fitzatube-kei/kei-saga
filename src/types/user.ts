export interface UserProfile {
  uid: string;
  email: string;
  nickname: string;
  avatar: AvatarConfig;
  points: number;
  cash: number;
  level: number;
  lastPlayedEraId?: string;
  createdAt: Date;
}

export interface AvatarConfig {
  gender: 'male' | 'female';
  skinTone: string;
  hair: string;
  outfit: string;
  accessory: string;
}

export interface InventoryItem {
  itemId: string;
  acquiredAt: Date;
  equipped: boolean;
}
