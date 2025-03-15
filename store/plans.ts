import { create } from 'zustand';

interface OpenModal {
    isModal: boolean;
    setIsModal: (isModal: boolean) => void;
    modeSelected: number;
    setModeSelected: (modeSelected: number) => void;
}

export const useModalStore = create<OpenModal>((set) => ({
    isModal: false,
    setIsModal: (isModal) => set({ isModal }),
    modeSelected: 0,
    setModeSelected: (modeSelected) => set({ modeSelected }),
}))