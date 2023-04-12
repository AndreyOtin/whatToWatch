import { AUTH_TOKEN_KEY_NAME } from '../consts/app';

const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export { getToken, setToken, removeToken };
