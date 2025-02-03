import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getPreloadFavs } from '@/app/middleware/utility';

// Сохранят и доставть коллекции точно также как и favs. хранить username + %collectionName 
type Collection = {
  name: string;
  id: string[];
};

type LibraryState = {
  favs: string[];
  customCollections: Collection[];
};

const initialState: LibraryState = {
  favs: getPreloadFavs(),
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
export const isMovieInFavorites = (state: RootState, movId: string) => {
  return state.library.favs.some(id => id === movId);
};
export type LibActions = ReturnType<typeof librarySlice.actions[keyof typeof librarySlice.actions]>;

export default librarySlice.reducer