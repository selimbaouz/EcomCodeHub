import { create } from "zustand";

interface PaymentModalState {
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (isOpen: boolean) => void;
}

export const usePaymentModalStore = create<PaymentModalState>((set) => ({
  isPaymentModalOpen: false,
  setIsPaymentModalOpen: (isOpen) => set({ isPaymentModalOpen: isOpen }),
}));
