import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define el estado inicial de la autenticación
interface UserState {
  user: { id: string; name: string; email: string } | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// Define el slice de la autenticación en Redux
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, setLoading, setError, logout } =
  authSlice.actions;

export default authSlice.reducer;
