import api from './api';

export const login = async (email: string, password: string) => {
  const res = await api.post('auth/login', {
    email,
    password,
  });
  return res.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
  roles?: string[]
) => {
  const payload: any = {
    name,
    email,
    password,
  };
  if (phone) payload.phone = phone;
  if (roles && roles.length > 0) payload.roles = roles;

  const res = await api.post('auth/register', payload);
  return res.data;
};

export const getMyDetails = async () => {
  const res = await api.get('auth/me');
  return res.data;
};

export const refreshTokenCall = async (refreshToken: string) => {
  const res = await api.post('auth/refresh', {
    refreshToken,
  });
  return res.data;
};

