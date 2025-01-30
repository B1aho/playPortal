import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { GameMinimalCardInfo } from '@/rawgTypes';

type Collection = {
  name: string;
  games: GameMinimalCardInfo[];
};

type LibraryState = {
  favs: GameMinimalCardInfo[];
  customCollections: Collection[];
};

const initialState: LibraryState = {
  favs: [],
  customCollections: [],
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<GameMinimalCardInfo>) => {
      state.favs.push(action.payload);
    },
  },
})

export const { addFavorite } = librarySlice.actions
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectUsername = (state: RootState) => state.user.username
export const selectErrorName = (state: RootState) => state.user.errorName

export type UserActions = ReturnType<typeof librarySlice.actions[keyof typeof librarySlice.actions]>;

export default librarySlice.reducer