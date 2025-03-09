import { create } from 'zustand';

interface OpenAccountSettings {
    isOpenAccount: boolean;
    setIsOpenAccount: (isOpenAccount: boolean) => void;
}

export const useOpenAccountStore = create<OpenAccountSettings>((set) => ({
    isOpenAccount: false,
    setIsOpenAccount: (isOpenAccount) => set({ isOpenAccount }),
  }))