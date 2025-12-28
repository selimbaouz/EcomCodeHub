// store/product.ts
import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductStore {
  currentProduct: Product | null;
  setCurrentProduct: (product: Product) => void;
  clearCurrentProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));
