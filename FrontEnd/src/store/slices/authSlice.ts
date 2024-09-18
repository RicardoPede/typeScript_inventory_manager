import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  _id: number;
  name: string;
  username: string;
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string}>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    registerSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { login, logout, registerSuccess } = authSlice.actions;

export const register = (formData: any) => async (dispatch: any) => {
  try {
    const response = await axios.post('/auth/register', formData);
    dispatch(registerSuccess({ user: response.data.user, token: response.data.token }));
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario', error);
    throw error;
  }
}

export default authSlice.reducer;