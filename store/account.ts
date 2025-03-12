import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface OpenAccountSettings {
    isOpenAccount: boolean;
    setIsOpenAccount: (isOpenAccount: boolean) => void;
}

export const useOpenAccountStore = create<OpenAccountSettings>((set) => ({
    isOpenAccount: false,
    setIsOpenAccount: (isOpenAccount) => set({ isOpenAccount }),
}))

interface NewEmailOfUser {
  newEmail: string;
  setNewEmail: (newEmail: string) => void;
}

export const useNewEmailStore = create<NewEmailOfUser>()(
  persist(
    (set) => ({
      newEmail: "",
      setNewEmail: (newEmail) => set({ newEmail }),
    }),
    {
      name: "new-email-storage", // Nom de la clé dans localStorage
      partialize: (state) => ({ newEmail: state.newEmail }), // On sauvegarde uniquement `newEmail`
    }
  )
);