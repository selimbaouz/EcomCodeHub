import { create } from 'zustand';

type HideFlashPromo = {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const useHideFlashPromoStore = create<HideFlashPromo>((set) => ({
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
}));
