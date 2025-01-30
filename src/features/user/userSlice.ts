import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface UserState {
  isAuthenticated: boolean
  username: string;
  errorName: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: '',
  errorName: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ username: string; password: string }>) => { },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      state.errorName = null
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.username = '';
      state.errorName = action.payload;
    },

    signup: (state, action: PayloadAction<{ username: string; password: string }>) => { },
    signupSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.username = action.payload
      state.errorName = null
    },
    signupFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.errorName = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      state.username = ''
    },
    clearError: state => {
      state.errorName = null;
    }
  },
})

export const { logIn, loginSuccess, loginFail, signup, signupSuccess, signupFail, logout, clearError } = userSlice.actions
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectUsername = (state: RootState) => state.user.username
export const selectErrorName = (state: RootState) => state.user.errorName

export type UserActions = ReturnType<typeof userSlice.actions[keyof typeof userSlice.actions]>;

export default userSlice.reducer