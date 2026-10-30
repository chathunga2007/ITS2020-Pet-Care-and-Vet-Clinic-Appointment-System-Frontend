export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phone?: string;
}

export interface AuthResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    phone?: string;
    access_token: string;
    refresh_token: string;
  };
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roles?: string[];
}

export interface LoginDTO {
  email: string;
  password: string;
}
