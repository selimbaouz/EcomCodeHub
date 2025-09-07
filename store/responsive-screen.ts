import { View } from "@/types/types";
import { create } from "zustand";

interface ResponsiveStore {
  views: Record<string, View>;
  setView: (snippetId: string, view: View) => void;
  getView: (snippetId: string) => View;
}

export const useResponsiveStore = create<ResponsiveStore>((set, get) => ({
  views: {},

  setView: (snippetId, view) =>
    set((state) => ({
      views: { ...state.views, [snippetId]: view },
    })),

  getView: (snippetId) => get().views[snippetId] || "desktop",
}));