import axios, { type AxiosError } from "axios";
import { refreshTokenCall } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const NO_AUTH_ENDPOINTS = [
  "auth/login",
  "auth/register",
  "auth/refresh",
  "auth/forgot-password",
  "auth/reset-password",
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const isNoAuth = NO_AUTH_ENDPOINTS.some((url) => config.url?.includes(url));

  if (token && !isNoAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (!originalRequest) return Promise.reject(error);

    const isNoAuth = NO_AUTH_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

    if (error.response?.status === 401 && !originalRequest._isRefresh && !isNoAuth) {
      originalRequest._isRefresh = true;
      try {
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await refreshTokenCall(refreshToken);
        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem("ACCESS_TOKEN", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("USER_DATA");
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register") &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;