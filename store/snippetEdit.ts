import { BenefitsSnippet } from "@/types/types";
import { create } from "zustand";

type SnippetEditState = {
  snippets: Record<string, BenefitsSnippet>;
  setSnippetData: (snippetId: string, data: BenefitsSnippet) => void;
  updateSnippet: (snippetId: string, index: number, updated: Partial<{ title: string; text: string; image: string }>) => void;
  addSnippet: (snippetId: string, newSnippet: { title: string; text: string; image: string }) => void;
  removeSnippet: (snippetId: string, index: number) => void;
};

export const useSnippetEditStore = create<SnippetEditState>((set) => ({
  snippets: {},
  setSnippetData: (snippetId, data) =>
    set((state) => ({
      snippets: { ...state.snippets, [snippetId]: data },
    })),
  updateSnippet: (snippetId, index, updated) =>
    set((state) => {
      const snippetObj = state.snippets[snippetId] || { sectionTitle: '', snippets: [] };
      const oldSnippets = snippetObj.snippets || [];
      const newSnippets = [...oldSnippets];
      newSnippets[index] = { ...newSnippets[index], ...updated };
      return {
        snippets: {
          ...state.snippets,
          [snippetId]: {
            ...snippetObj,
            snippets: newSnippets,
          },
        },
      };
    }),
  addSnippet: (snippetId, newSnippet) =>
    set((state) => {
      const snippetObj = state.snippets[snippetId] || { sectionTitle: '', snippets: [] };
      return {
        snippets: {
          ...state.snippets,
          [snippetId]: {
            ...snippetObj,
            snippets: [...snippetObj.snippets, newSnippet],
          },
        },
      };
    }),
  removeSnippet: (snippetId, index) =>
    set((state) => {
      const snippetObj = state.snippets[snippetId] || { sectionTitle: '', snippets: [] };
      const newSnippets = snippetObj.snippets.filter((_, i) => i !== index);
      return {
        snippets: {
          ...state.snippets,
          [snippetId]: {
            ...snippetObj,
            snippets: newSnippets,
          },
        },
      };
    }),
}));
