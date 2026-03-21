import { create } from 'zustand';
import type { UserProfile, AvatarConfig } from '@/types/user';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
}

interface AuthActions {
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  updateAvatar: (avatar: AvatarConfig) => void;
  updatePoints: (points: number) => void;
  updateCash: (cash: number) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),

  setInitialized: (initialized) => set({ initialized }),

  updateAvatar: (avatar) =>
    set((state) => ({
      user: state.user ? { ...state.user, avatar } : null,
    })),

  updatePoints: (points) =>
    set((state) => ({
      user: state.user ? { ...state.user, points } : null,
    })),

  updateCash: (cash) =>
    set((state) => ({
      user: state.user ? { ...state.user, cash } : null,
    })),
}));
