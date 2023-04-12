import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api';
import { redirect } from './middlewares/redirect/redirect';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, redirect)
});
