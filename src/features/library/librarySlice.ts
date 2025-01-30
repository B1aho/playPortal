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
    removeFromFavs: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter(game => game.slug !== action.payload)
    },
    loadFavorites: (state, action: PayloadAction<GameMinimalCardInfo[]>) => {
      state.favs = action.payload;
    },
    clearLibrary: (state) => {
      state.favs = [];
      state.customCollections = [];
    },
  },
})

export const { addFavorite, removeFromFavs, loadFavorites, clearLibrary } = librarySlice.actions
export const selectFavs = (state: RootState) => state.library.favs

export type LibActions = ReturnType<typeof librarySlice.actions[keyof typeof librarySlice.actions]>;

export default librarySlice.reducer