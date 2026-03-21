import { auth, db } from './config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, AvatarConfig } from '@/types';

const PREMIUM_EMAILS = ['han0726k@gmail.co', 'han0726k@gmail.com'];

export async function signUp(email: string, password: string, nickname: string): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const isPremium = PREMIUM_EMAILS.includes(email.toLowerCase());
  const profile: UserProfile = {
    uid: cred.user.uid,
    email,
    nickname,
    avatar: { gender: 'male', skinTone: '#F5D0A9', hair: 'default', outfit: 'default', accessory: 'none' },
    points: isPremium ? 99999 : 0,
    cash: isPremium ? 99999 : 0,
    level: isPremium ? 7 : 1,
    createdAt: new Date(),
  };
  await setDoc(doc(db, 'users', cred.user.uid), { ...profile, createdAt: serverTimestamp() });
  return profile;
}

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  const profile = { ...data, uid, createdAt: data.createdAt?.toDate?.() || new Date() } as UserProfile;

  // Auto-upgrade premium users
  if (profile.email && PREMIUM_EMAILS.includes(profile.email.toLowerCase()) && (profile.points < 99999 || profile.cash < 99999)) {
    await updateDoc(doc(db, 'users', uid), { points: 99999, cash: 99999, level: 7 });
    profile.points = 99999;
    profile.cash = 99999;
    profile.level = 7;
  }

  return profile;
}

export async function updateUserAvatar(uid: string, avatar: AvatarConfig) {
  await setDoc(doc(db, 'users', uid), { avatar }, { merge: true });
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
