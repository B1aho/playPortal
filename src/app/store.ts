import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import libraryReducer from '../features/library/librarySlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';
import { traktApi } from '@/services/traktApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tmdbApi } from '@/services/tmdbApi';

export const store = configureStore({
  reducer: {
    [traktApi.reducerPath]: traktApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    user: userReducer,
    library: libraryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(traktApi.middleware, tmdbApi.middleware, localStorageMiddleware);
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

setupListeners(store.dispatch)