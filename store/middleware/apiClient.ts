import axios from "axios";
import { store } from "..";
import { renewAccessToken } from "../auth/authThunks";

const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_SERVER_URL as string) || "/api/v1",
  withCredentials: true,
});

// Interceptor de solicitudes
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor de respuestas
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(renewAccessToken());
        const state = store.getState();
        originalRequest.headers.Authorization = `Bearer ${state.auth.accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        console.error("Error al renovar el token:", error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
