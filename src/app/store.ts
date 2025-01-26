import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import { localStorageMiddleware }from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(localStorageMiddleware);
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store