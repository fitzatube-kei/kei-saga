'use client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { onAuthChange, getUserProfile } from '@/lib/firebase/auth';

// Global flag to prevent multiple listeners
let listenerInitialized = false;

export function useAuth() {
  const { user, loading, initialized, setUser, setLoading, setInitialized } = useAuthStore();
  const unsubRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Only set up the listener once globally
    if (listenerInitialized) return;
    listenerInitialized = true;

    unsubRef.current = onAuthChange(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setUser(profile);
          } else {
            console.warn('User profile not found in Firestore, using fallback');
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              nickname: firebaseUser.email?.split('@')[0] || '모험가',
              avatar: { gender: 'male' as const, skinTone: '#F5D0A9', hair: 'default', outfit: 'default', accessory: 'none' },
              points: 0,
              cash: 0,
              level: 1,
              createdAt: new Date(),
            });
          }
        } catch (err) {
          console.error('Failed to load user profile:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            nickname: firebaseUser.email?.split('@')[0] || '모험가',
            avatar: { gender: 'male' as const, skinTone: '#F5D0A9', hair: 'default', outfit: 'default', accessory: 'none' },
            points: 0,
            cash: 0,
            level: 1,
            createdAt: new Date(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => {
      if (unsubRef.current) {
        unsubRef.current();
        unsubRef.current = null;
        listenerInitialized = false;
      }
    };
  }, [setUser, setLoading, setInitialized]);

  return { user, loading, initialized };
}
