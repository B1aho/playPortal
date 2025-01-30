import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

type Collection = {
  name: string;
  gamesId: string[];
};

type LibraryState = {
  favs: string[];
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
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favs = [...new Set([...state.favs, action.payload])];
    },
    removeFromFavs: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter(id => id !== action.payload)
    },
    loadFavorites: (state, action: PayloadAction<string[]>) => {
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
export const isGameInFavorites = (state: RootState, gameId: string) => {
  return state.library.favs.some(id => id === gameId);
};
export type LibActions = ReturnType<typeof librarySlice.actions[keyof typeof librarySlice.actions]>;

export default librarySlice.reducer