import { apiSlice } from '../api/api';

export const selectCheckAuthQuery = apiSlice.endpoints.checkAuth.select();
