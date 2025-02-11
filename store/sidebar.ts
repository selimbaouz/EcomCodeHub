import { create } from 'zustand';

interface OpenSidebarState {
    isOpenSidebar: boolean;
    setIsOpenSidebar: (isOpenSidebar: boolean) => void;
}

export const useOpenSidebarStore = create<OpenSidebarState>((set) => ({
    isOpenSidebar: false,
    setIsOpenSidebar: (isOpenSidebar) => set({ isOpenSidebar }),
  }))