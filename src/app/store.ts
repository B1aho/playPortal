import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import libraryReducer from '../features/library/librarySlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';
import { rawgApi } from '@/services/rawgApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [rawgApi.reducerPath]: rawgApi.reducer,
    user: userReducer,
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(rawgApi.middleware, localStorageMiddleware);
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

setupListeners(store.dispatch)