import { create } from "zustand";

export type RegisterSchema = {
  name: string;
  email: string;
  password: string;
};

interface RegisterState {
  userData: RegisterSchema | null;
  setUserData: (data: RegisterSchema) => void;
  clearUserData: () => void;
}

export const userRegisterStore = create<RegisterState>((set) => ({
  userData: null, // Datos temporales del usuario
  setUserData: (data: RegisterSchema) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));
