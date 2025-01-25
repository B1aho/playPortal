import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface UserState {
  isAuthenticated: boolean
  username: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.username = action.payload
    },
    logout: state => {
      state.isAuthenticated = false
      state.username = ''
    },
  },
})

export const { login, logout } = userSlice.actions
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectUsername = (state: RootState) => state.user.username

export default userSlice.reducer