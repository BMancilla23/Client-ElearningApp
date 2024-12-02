import { create } from "zustand";

type ModalType = "login" | "register" | "otp" | null;

interface ModalState {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (modalType) => set({ activeModal: modalType }),
  closeModal: () => set({ activeModal: null }),
}));
