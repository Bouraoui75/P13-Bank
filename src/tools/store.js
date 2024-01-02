import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});
