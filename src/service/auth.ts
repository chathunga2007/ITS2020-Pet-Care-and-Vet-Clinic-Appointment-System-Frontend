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

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * 1. User Login
 */
export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", {
    email: credentials.email.trim(),
    password: credentials.password,
  });
  return res.data;
};

/**
 * 2. User Registration
 */
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

/**
 * 3. Fetch current logged-in user profile
 */
export const getMyDetails = async (): Promise<MeResponse> => {
  const res = await api.get<MeResponse>("/auth/me");
  return res.data;
};

/**
 * 4. Refresh access token using refresh token
 */
export const refreshTokenCall = async (refreshToken: string): Promise<RefreshResponse> => {
  const res = await axios.post<RefreshResponse>(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return res.data;
};

