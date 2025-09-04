import { create } from 'zustand';

interface LoadingMoreState {
  loadingMore: boolean;
  setLoadingMore: (value: boolean) => void;
}

export const useLoadingMoreStore = create<LoadingMoreState>((set) => ({
  loadingMore: false,
  setLoadingMore: (value) => set({ loadingMore: value }),
}));
