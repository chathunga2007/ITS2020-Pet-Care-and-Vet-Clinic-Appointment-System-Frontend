import axios from "axios";
import api from "./api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  MeResponse,
  RefreshResponse,
} from "../types/auth.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    email: credentials.email.trim(),
    password: credentials.password,
  });
  return res.data;
};

export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password,
    phone: data.phone?.trim() || "",
    roles: data.roles || ["USER"],
  });
  return res.data;
};

export const getMyDetails = async (): Promise<MeResponse> => {
  const res = await api.get<MeResponse>("/auth/me");
  return res.data;
};

export const refreshTokenCall = async (refreshToken: string): Promise<RefreshResponse> => {
  const res = await axios.post<RefreshResponse>(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return res.data;
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/forgot-password", {
    email: email.trim(),
  });
  return res.data;
};

export const resetPassword = async (payload: {
  email: string;
  otp: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/reset-password", {
    email: payload.email.trim(),
    otp: payload.otp.trim(),
    newPassword: payload.newPassword,
  });
  return res.data;
};