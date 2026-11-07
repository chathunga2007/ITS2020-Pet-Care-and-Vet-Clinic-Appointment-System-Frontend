import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { getMyDetails } from "../service/auth";
import type { User, LoginResponseData } from "../types/auth.types";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginUser: (data: LoginResponseData) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("USER_DATA");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getMyDetails();
      if (res && res.data) {
        setUser(res.data);
        localStorage.setItem("USER_DATA", JSON.stringify(res.data));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth verification failed:", err);
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("USER_DATA");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const loginUser = (data: LoginResponseData) => {
    localStorage.setItem("ACCESS_TOKEN", data.access_token);
    localStorage.setItem("REFRESH_TOKEN", data.refresh_token);
    const userInfo: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      roles: data.roles,
      phone: data.phone,
    };
    setUser(userInfo);
    localStorage.setItem("USER_DATA", JSON.stringify(userInfo));
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER_DATA");
    setUser(null);
  };

  const isAuthenticated = Boolean(user && localStorage.getItem("ACCESS_TOKEN"));
  const isAdmin = Boolean(user?.roles?.includes("ADMIN"));

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        isAdmin,
        loginUser,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

