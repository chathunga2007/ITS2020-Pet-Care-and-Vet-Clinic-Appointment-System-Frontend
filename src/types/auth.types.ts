export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roles?: string[];
}

export interface LoginResponseData {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phone?: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  message: string;
  data: LoginResponseData;
}

export interface RegisterResponse {
  message: string;
}

export interface MeResponse {
  message: string;
  data: User;
}

export interface RefreshResponse {
  message: string;
  data: {
    accessToken: string;
  };
}

