import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


axiosClient.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_API_STATIC_TOKEN; 
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});