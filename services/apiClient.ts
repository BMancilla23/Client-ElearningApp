import axios from "axios";

const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_SERVER_URL as string) || "/api/v1",
  withCredentials: true,
});

export default apiClient;