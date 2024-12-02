import { apiSlice } from "../api/apiSlice";

// Define los endpoints de autenticación
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint de inicio de sesión
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Endpoint de obtención del perfil
    getProfile: builder.query({
      query: () => "/users/auth/profile",
    }),
    // Endpoint de cierre de sesión
    logout: builder.mutation({
      query: () => ({
        url: "/users/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useLogoutMutation } =
  authApi;
