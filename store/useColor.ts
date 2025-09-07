// store/useColorStore.ts
import { ColorResult } from "react-color";
import { create } from "zustand";

interface ColorState {
  color: ColorResult | null;
  setColor: (color: ColorResult) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  color: null,
  setColor: (color) => set({ color }),
}));