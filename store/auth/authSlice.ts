import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";

// Manejar autenticación
export interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
    isVerified: boolean;
    provider: string;
  } | null;
}

// Extiende el estado para incluir PersistPartial
export type AuthPersistedState = AuthState & PersistPartial;

const initialState: AuthPersistedState = {
  accessToken: null,
  user: null,
  _persist: {
    rehydrated: false, // Esto es manejado por redux-persist
    version: 1, // Versionado del estado persistido
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ accessToken: string; user: AuthState["user"] }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
