import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OpenModal {
    isModal: boolean;
    setIsModal: (isModal: boolean) => void;
    modeSelected: number;
    setModeSelected: (modeSelected: number) => void;
}

export const useModalStore = create<OpenModal>()(
    persist(
        (set) => ({
            isModal: false,
            setIsModal: (isModal) => set({ isModal }),
            modeSelected: 0,
            setModeSelected: (modeSelected) => set({ modeSelected }),
        }),
        {
            name: 'modal-store', // Nom de la clé dans le localStorage
        }
    )
);