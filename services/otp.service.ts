// Verificar OTP

import { OtpSchema } from "@/types/otp-schema";
import apiClient from "./apiClient";

// Verificar OTP
export const verifyOtp = async (payload: OtpSchema) => {
  try {
    const response = await apiClient.post("/users/auth/verify-otp", payload);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Error al vrificar OTP");
  }
};

// Reenviar OTP
export const resendOtp = async () => {
  try {
    const response = await apiClient.post("/users/auth/resend-otp", null);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Error al reenviar OTP");
  }
};
