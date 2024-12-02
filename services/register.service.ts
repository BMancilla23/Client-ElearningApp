import { RegisterSchema } from "@/types/register-schema";
import apiClient from "./apiClient";

export const registerUser = async (userData: RegisterSchema) => {
  try {
    const response = await apiClient.post("/users/auth/register", userData);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error en el registro");
    }

    throw new Error("Error de conexión al servidor");
  }
};
