import axios, { type AxiosError } from 'axios';
import { refreshTokenCall } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_ENDPOINTS = ['auth/login', 'auth/register', 'auth/refresh'];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

  if (token && !isPublic && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    const isPublic = PUBLIC_ENDPOINTS.some((url) => originalRequest?.url?.includes(url));

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRefresh &&
      !isPublic
    ) {
      originalRequest._isRefresh = true;
      try {
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await refreshTokenCall(refreshToken);
        const newAccessToken =
          refreshResponse?.data?.accessToken ||
          refreshResponse?.data?.access_token ||
          refreshResponse?.accessToken;

        if (!newAccessToken) {
          throw new Error('Failed to retrieve new access token');
        }

        localStorage.setItem('ACCESS_TOKEN', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        // If not on login or home, redirect
        if (!['/', '/login', '/register'].includes(window.location.pathname)) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

