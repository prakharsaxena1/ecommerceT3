import { create } from 'zustand'

type GlobalSlice = {
    isAuth: boolean;
    userId: number | null;
    lastUrl: string;
    userInterests: Record<string, boolean>;
    updateAuth: (auth: boolean) => void;
    updateUserId: (id: number) => void;
}

export const useGlobalStore = create<GlobalSlice>((set) => ({
  isAuth: false,
  userId: null,
  userInterests: {},
  lastUrl: '/',
  updateAuth: (auth: boolean) => set({ isAuth: auth }),
  updateUserId: (id: number) => set({ userId: id }),
}));
