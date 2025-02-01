import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getPreloadState } from '@/app/middleware/utility';

interface UserState {
  isAuthenticated: boolean
  username: string;
  errorName: string | null;
  isConfirmOldPassword: boolean;
  isPasswordWasChanged: boolean;
}

const initialState: UserState = getPreloadState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ username: string; password: string }>) => { },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      state.errorName = null;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.username = '';
      state.errorName = action.payload;
    },

    signup: (state, action: PayloadAction<{ username: string; password: string }>) => { },
    signupSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      state.errorName = null;
    },
    signupFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.errorName = action.payload;
    },
    logout: (state, _: PayloadAction) => {
      state.isAuthenticated = false;
      state.username = '';
    },
    changeUsername: (state, action: PayloadAction<string>) => { },
    changePassword: (state, action: PayloadAction<string>) => { },
    changeUsernameSuccess: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    changeUsernameFail: (state, action: PayloadAction<string>) => {
      state.errorName = action.payload;
    },
    changePasswordFail: (state, action: PayloadAction<string>) => {
      state.errorName = action.payload;
    },
    clearError: (state, _: PayloadAction) => {
      state.errorName = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorName = action.payload;
    },
    afterPasswordChanged: (state, _: PayloadAction) => {
      state.isConfirmOldPassword = false;
    },
    checkOldPassword: (state, action: PayloadAction<string>) => { },
    setOldPasswordCheckRes: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOldPassword = action.payload;
    },
    setIsPasswordWasChanged: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOldPassword = action.payload;
    }
  }
})

export const { logIn, loginSuccess, loginFail, signup, signupSuccess, signupFail, logout, clearError, changeUsername, changePassword, setError, afterPasswordChanged, checkOldPassword, setOldPasswordCheckRes, setIsPasswordWasChanged } = userSlice.actions
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectUsername = (state: RootState) => state.user.username
export const selectErrorName = (state: RootState) => state.user.errorName
export const selectConfirmPassword = (state: RootState) => state.user.isConfirmOldPassword
export const selectIsPasswordWasChanged = (state: RootState) => state.user.isPasswordWasChanged

export type UserActions = ReturnType<typeof userSlice.actions[keyof typeof userSlice.actions]>;

export default userSlice.reducer