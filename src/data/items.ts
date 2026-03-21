import type { AvatarConfig } from '@/types';

export interface AvatarItem {
  id: string;
  name: string;
  category: 'hair' | 'outfit' | 'accessory';
  gender: 'male' | 'female' | 'both';
  price: number; // points, 0 = free/default
  preview: string; // description
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const avatarItems: AvatarItem[] = [
  // Hair - Male
  { id: 'hair-m-default', name: '기본 머리', category: 'hair', gender: 'male', price: 0, preview: '깔끔한 단발', rarity: 'common' },
  { id: 'hair-m-topknot', name: '상투', category: 'hair', gender: 'male', price: 200, preview: '전통 상투 스타일', rarity: 'common' },
  { id: 'hair-m-warrior', name: '무사 머리', category: 'hair', gender: 'male', price: 500, preview: '늠름한 무사 스타일', rarity: 'rare' },
  { id: 'hair-m-scholar', name: '선비 머리', category: 'hair', gender: 'male', price: 300, preview: '단정한 선비 스타일', rarity: 'common' },
  // Hair - Female
  { id: 'hair-f-default', name: '기본 머리', category: 'hair', gender: 'female', price: 0, preview: '긴 생머리', rarity: 'common' },
  { id: 'hair-f-braid', name: '땋은 머리', category: 'hair', gender: 'female', price: 200, preview: '예쁜 땋은 머리', rarity: 'common' },
  { id: 'hair-f-royal', name: '궁중 머리', category: 'hair', gender: 'female', price: 800, preview: '화려한 궁중 스타일', rarity: 'epic' },
  { id: 'hair-f-ribbon', name: '댕기 머리', category: 'hair', gender: 'female', price: 400, preview: '댕기로 묶은 머리', rarity: 'rare' },
  // Outfits
  { id: 'outfit-default', name: '기본 한복', category: 'outfit', gender: 'both', price: 0, preview: '깨끗한 기본 한복', rarity: 'common' },
  { id: 'outfit-scholar', name: '선비 도포', category: 'outfit', gender: 'male', price: 500, preview: '학자의 도포', rarity: 'rare' },
  { id: 'outfit-warrior', name: '무관 갑옷', category: 'outfit', gender: 'male', price: 1000, preview: '용맹한 무관의 갑옷', rarity: 'epic' },
  { id: 'outfit-hanbok-f', name: '색동 한복', category: 'outfit', gender: 'female', price: 500, preview: '화려한 색동 한복', rarity: 'rare' },
  { id: 'outfit-queen', name: '왕비 예복', category: 'outfit', gender: 'female', price: 1500, preview: '우아한 왕비의 예복', rarity: 'legendary' },
  { id: 'outfit-king', name: '왕의 곤룡포', category: 'outfit', gender: 'male', price: 2000, preview: '용이 수놓인 곤룡포', rarity: 'legendary' },
  // Accessories
  { id: 'acc-none', name: '없음', category: 'accessory', gender: 'both', price: 0, preview: '장신구 없음', rarity: 'common' },
  { id: 'acc-gat', name: '갓', category: 'accessory', gender: 'male', price: 300, preview: '선비의 갓', rarity: 'common' },
  { id: 'acc-norigae', name: '노리개', category: 'accessory', gender: 'female', price: 300, preview: '예쁜 노리개', rarity: 'common' },
  { id: 'acc-crown', name: '면류관', category: 'accessory', gender: 'both', price: 3000, preview: '왕의 면류관', rarity: 'legendary' },
  { id: 'acc-fan', name: '부채', category: 'accessory', gender: 'both', price: 200, preview: '우아한 접부채', rarity: 'common' },
  { id: 'acc-sword', name: '보검', category: 'accessory', gender: 'both', price: 1000, preview: '빛나는 보검', rarity: 'epic' },
];

export function getItemsByCategory(category: AvatarItem['category'], gender: AvatarConfig['gender']) {
  return avatarItems.filter(i => i.category === category && (i.gender === 'both' || i.gender === gender));
}

export function getItemById(id: string) {
  return avatarItems.find(i => i.id === id);
}

export const rarityColors = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
};
