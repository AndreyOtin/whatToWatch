import { apiSlice } from '../api/api';

export const getCheckAuthQuery = apiSlice.endpoints.checkAuth.select();

export const getInitMainScreenQuery = apiSlice.endpoints.initMainScreen.select();
