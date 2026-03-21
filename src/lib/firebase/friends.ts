import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// ─── Types ───────────────────────────────────────────────────────────

export interface FriendRequest {
  id: string;
  fromUid: string;
  fromNickname: string;
  fromAvatar: Record<string, string>;
  toUid: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
}

export interface FriendProfile {
  uid: string;
  nickname: string;
  avatar: Record<string, string>;
  level: number;
  addedAt: Timestamp;
}

export interface UserSearchResult {
  uid: string;
  nickname: string;
  avatar: Record<string, string>;
  level: number;
}

// ─── Send Friend Request ─────────────────────────────────────────────

export async function sendFriendRequest(
  fromUser: { uid: string; nickname: string; avatar: Record<string, string> },
  toUid: string
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'friendRequests'), {
      fromUid: fromUser.uid,
      fromNickname: fromUser.nickname,
      fromAvatar: fromUser.avatar,
      toUid,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('친구 요청 전송 실패:', error);
    throw error;
  }
}

// ─── Get Pending Requests ────────────────────────────────────────────

export async function getPendingRequests(uid: string): Promise<FriendRequest[]> {
  try {
    const q = query(
      collection(db, 'friendRequests'),
      where('toUid', '==', uid),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FriendRequest[];
  } catch (error) {
    console.error('친구 요청 조회 실패:', error);
    throw error;
  }
}

// ─── Accept Friend Request ───────────────────────────────────────────

export async function acceptFriendRequest(
  requestId: string,
  fromUid: string,
  toUid: string
): Promise<void> {
  try {
    // Update request status
    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: 'accepted' });

    // Get both user profiles for friend data
    const [fromSnap, toSnap] = await Promise.all([
      getDoc(doc(db, 'users', fromUid)),
      getDoc(doc(db, 'users', toUid)),
    ]);

    const fromData = fromSnap.data();
    const toData = toSnap.data();

    // Add each user to the other's friends subcollection
    const addFriendPromises: Promise<void>[] = [];

    if (toData) {
      addFriendPromises.push(
        setDoc(doc(db, 'users', fromUid, 'friends', toUid), {
          uid: toUid,
          nickname: toData.nickname ?? '',
          avatar: toData.avatar ?? {},
          level: toData.level ?? 1,
          addedAt: serverTimestamp(),
        })
      );
    }

    if (fromData) {
      addFriendPromises.push(
        setDoc(doc(db, 'users', toUid, 'friends', fromUid), {
          uid: fromUid,
          nickname: fromData.nickname ?? '',
          avatar: fromData.avatar ?? {},
          level: fromData.level ?? 1,
          addedAt: serverTimestamp(),
        })
      );
    }

    await Promise.all(addFriendPromises);
  } catch (error) {
    console.error('친구 요청 수락 실패:', error);
    throw error;
  }
}

// ─── Reject Friend Request ──────────────────────────────────────────

export async function rejectFriendRequest(requestId: string): Promise<void> {
  try {
    const requestRef = doc(db, 'friendRequests', requestId);
    await updateDoc(requestRef, { status: 'rejected' });
  } catch (error) {
    console.error('친구 요청 거절 실패:', error);
    throw error;
  }
}

// ─── Get Friends List ────────────────────────────────────────────────

export async function getFriends(uid: string): Promise<FriendProfile[]> {
  try {
    const snapshot = await getDocs(collection(db, 'users', uid, 'friends'));
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as FriendProfile[];
  } catch (error) {
    console.error('친구 목록 조회 실패:', error);
    throw error;
  }
}

// ─── Remove Friend ──────────────────────────────────────────────────

export async function removeFriend(uid: string, friendUid: string): Promise<void> {
  try {
    await Promise.all([
      deleteDoc(doc(db, 'users', uid, 'friends', friendUid)),
      deleteDoc(doc(db, 'users', friendUid, 'friends', uid)),
    ]);
  } catch (error) {
    console.error('친구 삭제 실패:', error);
    throw error;
  }
}

// ─── Search Users ───────────────────────────────────────────────────

export async function searchUsers(queryStr: string): Promise<UserSearchResult[]> {
  try {
    if (!queryStr.trim()) return [];

    const q = query(
      collection(db, 'users'),
      where('nickname', '>=', queryStr),
      where('nickname', '<=', queryStr + '\uf8ff'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        nickname: data.nickname ?? '',
        avatar: data.avatar ?? {},
        level: data.level ?? 1,
      };
    });
  } catch (error) {
    console.error('유저 검색 실패:', error);
    throw error;
  }
}
