/**
 * Avatar part definitions matching SVG files in /public/images/avatar/
 *
 * Naming convention:
 * - Files with _front suffix render in front of the body
 * - Files with _back suffix render behind the body
 * - _front and _back files are one logical item (selected together)
 */

// Body colors (body001 ~ body016)
export const BODY_COLORS: { id: string; color: string }[] = [
  { id: 'body001', color: '#E366AD' },
  { id: 'body002', color: '#FE0000' },
  { id: 'body003', color: '#A84C0F' },
  { id: 'body004', color: '#FE8300' },
  { id: 'body005', color: '#FEC300' },
  { id: 'body006', color: '#88C83A' },
  { id: 'body007', color: '#56741B' },
  { id: 'body008', color: '#1A9459' },
  { id: 'body009', color: '#0092CC' },
  { id: 'body010', color: '#3849DD' },
  { id: 'body011', color: '#18227C' },
  { id: 'body012', color: '#A138DD' },
  { id: 'body013', color: '#530E7A' },
  { id: 'body014', color: '#424242' },
  { id: 'body015', color: '#FFFFFF' },
  { id: 'body016', color: '#000000' },
];

// Face parts
export const FACE_PARTS = {
  eye: ['eye001', 'eye002', 'eye003', 'eye004'],
  eyebrow: ['eyebrow001', 'eyebrow002', 'eyebrow003', 'eyebrow004'],
  nose: ['nose001', 'nose002', 'nose003', 'nose004', 'nose005'],
  lips: ['lips001', 'lips002', 'lips003', 'lips004', 'lips005'],
  cheek: ['cheek001', 'cheek002', 'cheek003', 'cheek004'],
  beard: ['beard001', 'beard002', 'beard003', 'beard004'],
} as const;

export type FaceCategory = keyof typeof FACE_PARTS;
export const FACE_CATEGORIES: FaceCategory[] = ['eye', 'eyebrow', 'nose', 'lips', 'cheek', 'beard'];

// Head accessories
export interface HeadItem {
  id: string;
  hasBack: boolean;
}

export const HEAD_ITEMS: HeadItem[] = [
  { id: 'head001', hasBack: false },
  { id: 'head002', hasBack: true },
  { id: 'head003', hasBack: true },
  { id: 'head004', hasBack: true },
];

// Accessories (장신구)
export const ACCESSORY_ITEMS: string[] = [];

// Outfits
export const OUTFIT_ITEMS = ['outfit001', 'outfit002', 'outfit003', 'outfit004'];

// Complete sets
export interface SetItem {
  id: string;
  hasFrontBack: boolean;
}

export const SET_ITEMS: SetItem[] = [
  { id: 'set001', hasFrontBack: false },
  { id: 'set002', hasFrontBack: true },
  { id: 'set003', hasFrontBack: true },
  { id: 'set004', hasFrontBack: true },
];

// Thumbnail crop areas for each category (x, y, w, h in SVG coordinate space 2900x2600)
export const THUMBNAIL_CROPS: Record<string, { x: number; y: number; w: number; h: number }> = {
  eye:     { x: 1150, y: 850, w: 600, h: 300 },
  eyebrow: { x: 1050, y: 780, w: 800, h: 250 },
  nose:    { x: 1250, y: 860, w: 400, h: 400 },
  lips:    { x: 1200, y: 1100, w: 500, h: 300 },
  cheek:   { x: 1000, y: 900, w: 900, h: 350 },
  beard:   { x: 1050, y: 1000, w: 800, h: 800 },
  head:    { x: 700, y: 0, w: 1500, h: 1000 },
  outfit:  { x: 200, y: 400, w: 2500, h: 2100 },
  accessory: { x: 300, y: 300, w: 2300, h: 2000 },
  set:     { x: 100, y: 100, w: 2700, h: 2400 },
};

/** Get the SVG file path for a face part */
export function getFacePartPath(category: FaceCategory, partId: string): string {
  return `/images/avatar/face/${category}/${partId}.svg`;
}

/** Get the SVG path for a head item (front or back) */
export function getHeadPath(headId: string, side: 'front' | 'back'): string {
  return `/images/avatar/head/${headId}_${side}.svg`;
}

/** Get the SVG path for an outfit */
export function getOutfitPath(outfitId: string): string {
  return `/images/avatar/outfit/${outfitId}.svg`;
}

/** Get the SVG path(s) for a set item */
export function getSetPath(setId: string, side?: 'front' | 'back'): string {
  const setItem = SET_ITEMS.find((s) => s.id === setId);
  if (!setItem || setItem.id === 'none') return '';
  if (setItem.hasFrontBack && side) {
    return `/images/avatar/set/${setId}_${side}.svg`;
  }
  return `/images/avatar/set/${setId}.svg`;
}

/** Get the thumbnail path for display in the item selector */
export function getThumbnailPath(category: string, partId: string): string {
  if (category === 'head') return `/images/avatar/head/${partId}_front.svg`;
  if (category === 'outfit') return `/images/avatar/outfit/${partId}.svg`;
  if (category === 'set') {
    const setItem = SET_ITEMS.find((s) => s.id === partId);
    if (setItem?.hasFrontBack) return `/images/avatar/set/${partId}_front.svg`;
    return `/images/avatar/set/${partId}.svg`;
  }
  // Face parts
  return `/images/avatar/face/${category}/${partId}.svg`;
}

/** Check if a head item has a _back variant */
export function headHasBack(headId: string): boolean {
  return HEAD_ITEMS.find((h) => h.id === headId)?.hasBack ?? false;
}

/** Check if a set item has _front/_back variants */
export function setHasFrontBack(setId: string): boolean {
  return SET_ITEMS.find((s) => s.id === setId)?.hasFrontBack ?? false;
}
