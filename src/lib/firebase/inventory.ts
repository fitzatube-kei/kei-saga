import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { InventoryItem, AvatarConfig } from '@/types';

/**
 * Fetch all inventory items for a user.
 */
export async function getUserInventory(uid: string): Promise<InventoryItem[]> {
  const colRef = collection(db, 'users', uid, 'inventory');
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      itemId: data.itemId,
      acquiredAt: data.acquiredAt?.toDate?.() ?? new Date(),
      equipped: data.equipped ?? false,
    } as InventoryItem;
  });
}

/**
 * Purchase an item: check points, deduct, and add to inventory subcollection.
 * Returns true on success, throws on failure.
 */
export async function purchaseItem(
  uid: string,
  itemId: string,
  price: number
): Promise<boolean> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const userData = userSnap.data();
  const currentPoints = userData.points ?? 0;

  if (currentPoints < price) {
    throw new Error('포인트가 부족합니다.');
  }

  // Check if already owned
  const itemRef = doc(db, 'users', uid, 'inventory', itemId);
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    throw new Error('이미 보유한 아이템입니다.');
  }

  // Deduct points and add item in a batch
  const batch = writeBatch(db);

  batch.update(userRef, {
    points: increment(-price),
  });

  batch.set(itemRef, {
    itemId,
    acquiredAt: serverTimestamp(),
    equipped: false,
  });

  await batch.commit();
  return true;
}

/**
 * Equip an item: set equipped=true on the target item,
 * unequip all other items in the same category,
 * and update the user's avatar config.
 */
export async function equipItem(
  uid: string,
  itemId: string,
  category: 'hair' | 'outfit' | 'accessory'
): Promise<void> {
  const inventoryRef = collection(db, 'users', uid, 'inventory');
  const snap = await getDocs(inventoryRef);

  const batch = writeBatch(db);

  // Determine the avatar key value from itemId
  // e.g. 'hair-m-warrior' -> 'warrior', 'outfit-default' -> 'default', 'acc-none' -> 'none'
  let avatarValue: string;
  if (category === 'hair') {
    // hair-m-default -> default, hair-f-royal -> royal
    const parts = itemId.split('-');
    avatarValue = parts.slice(2).join('-') || 'default';
  } else if (category === 'outfit') {
    // outfit-default -> default, outfit-scholar -> scholar
    const parts = itemId.split('-');
    avatarValue = parts.slice(1).join('-') || 'default';
  } else {
    // acc-none -> none, acc-crown -> crown
    const parts = itemId.split('-');
    avatarValue = parts.slice(1).join('-') || 'none';
  }

  // Unequip all items that belong to the same category prefix
  const categoryPrefixes: Record<string, string[]> = {
    hair: ['hair-'],
    outfit: ['outfit-'],
    accessory: ['acc-'],
  };
  const prefixes = categoryPrefixes[category] ?? [];

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const belongsToCategory = prefixes.some((p) => data.itemId.startsWith(p));
    if (belongsToCategory && data.equipped) {
      batch.update(doc(db, 'users', uid, 'inventory', docSnap.id), {
        equipped: false,
      });
    }
  }

  // Equip the target item (only if it exists in inventory or is a free/default item)
  const targetRef = doc(db, 'users', uid, 'inventory', itemId);
  const targetSnap = await getDoc(targetRef);

  if (targetSnap.exists()) {
    batch.update(targetRef, { equipped: true });
  } else {
    // Free default items may not be in inventory - add them
    batch.set(targetRef, {
      itemId,
      acquiredAt: serverTimestamp(),
      equipped: true,
    });
  }

  // Update user avatar config
  const avatarField = category === 'hair' ? 'hair' : category === 'outfit' ? 'outfit' : 'accessory';
  const userRef = doc(db, 'users', uid);
  batch.update(userRef, {
    [`avatar.${avatarField}`]: avatarValue,
  });

  await batch.commit();
}
