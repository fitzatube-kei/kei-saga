import { create } from 'zustand';
import type { UserProfile, AvatarConfig, PlacedTreasure } from '@/types/user';

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
  updateNickname: (nickname: string) => void;
  updateProfileBg: (profileBg: string) => void;
  updateProfileImage: (profileImage: string) => void;
  updateProfileBgColor: (profileBgColor: string) => void;
  updateProfileTreasures: (profileTreasures: PlacedTreasure[]) => void;
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

  updateNickname: (nickname) =>
    set((state) => ({
      user: state.user ? { ...state.user, nickname } : null,
    })),

  updateProfileBg: (profileBg) =>
    set((state) => ({
      user: state.user ? { ...state.user, profileBg } : null,
    })),

  updateProfileImage: (profileImage) =>
    set((state) => ({
      user: state.user ? { ...state.user, profileImage } : null,
    })),

  updateProfileBgColor: (profileBgColor) =>
    set((state) => ({
      user: state.user ? { ...state.user, profileBgColor } : null,
    })),

  updateProfileTreasures: (profileTreasures) =>
    set((state) => ({
      user: state.user ? { ...state.user, profileTreasures } : null,
    })),
}));
