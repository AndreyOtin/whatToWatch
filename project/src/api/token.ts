import { AUTH_TOKEN_KEY_NAME } from '../consts/app';

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

export const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
