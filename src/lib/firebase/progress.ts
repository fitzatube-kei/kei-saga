import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from './config';
import { GameProgress } from '@/types/game';

export async function saveProgress(
  uid: string,
  progress: GameProgress
): Promise<void> {
  const ref = doc(db, 'users', uid, 'progress', progress.eventId);
  await setDoc(
    ref,
    {
      ...progress,
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function loadProgress(
  uid: string,
  eventId: string
): Promise<GameProgress | null> {
  const ref = doc(db, 'users', uid, 'progress', eventId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    eventId: data.eventId,
    currentStep: data.currentStep,
    quizAnswers: data.quizAnswers,
    completed: data.completed,
    earnedPoints: data.earnedPoints,
    lastUpdated: data.lastUpdated?.toDate?.() ?? new Date(),
  } as GameProgress;
}

export async function markEventComplete(
  uid: string,
  eventId: string,
  earnedPoints: number
): Promise<void> {
  const progressRef = doc(db, 'users', uid, 'progress', eventId);
  await setDoc(
    progressRef,
    {
      completed: true,
      earnedPoints,
      lastUpdated: serverTimestamp(),
    },
    { merge: true }
  );

  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    totalPoints: increment(earnedPoints),
  });
}

export async function getAllUserProgress(
  uid: string
): Promise<GameProgress[]> {
  const colRef = collection(db, 'users', uid, 'progress');
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      eventId: data.eventId,
      currentStep: data.currentStep,
      quizAnswers: data.quizAnswers ?? [],
      completed: data.completed ?? false,
      earnedPoints: data.earnedPoints ?? 0,
      lastUpdated: data.lastUpdated?.toDate?.() ?? new Date(),
    } as GameProgress;
  });
}
