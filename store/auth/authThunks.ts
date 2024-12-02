import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../middleware/apiClient";
import { clearAuth, setAuth } from "./authSlice";

export const renewAccessToken = createAsyncThunk(
  "auth/renewAccessToken",
  async (_, { dispatch }) => {
    try {
      const response = await apiClient.post("/users/auth/refresh-token");
      const { accessToken, user } = response.data;
      dispatch(setAuth({ accessToken, user }));
    } catch (error) {
      console.error("Error renewing access token", error);
      dispatch(clearAuth());
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await apiClient.post("/users/auth/login", credentials);
      const { accessToken, user } = response.data;
      dispatch(setAuth({ accessToken, user }));
      return response.data;
    } catch (error) {
      console.error("Error logging in", error);
      dispatch(clearAuth());
      throw error;
    }
  }
);
