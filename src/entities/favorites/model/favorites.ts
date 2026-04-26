import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteContactsDto } from './types';
import type { ContactDto } from '@entities/contact';

export interface FavoritesState {
  ids: FavoriteContactsDto;
}

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteContactIds(state, action: PayloadAction<FavoriteContactsDto>) {
      state.ids = action.payload;
    },
    toggleFavoriteContactId(state, action: PayloadAction<ContactDto['id']>) {
      const contactId = action.payload;
      const isAlreadyFavorite = state.ids.includes(contactId);

      if (isAlreadyFavorite) {
        state.ids = state.ids.filter((favoriteId) => favoriteId !== contactId);
        return;
      }

      state.ids.push(contactId);
    },
  },
});

export const { setFavoriteContactIds, toggleFavoriteContactId } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteContactIds = (state: {
  favorites: FavoritesState;
}) => {
  return state.favorites.ids;
};

export const selectIsFavorite = (contactId: ContactDto['id']) => {
  return (state: { favorites: FavoritesState }) => {
    return state.favorites.ids.includes(contactId);
  };
};
