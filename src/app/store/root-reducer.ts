import { combineReducers } from '@reduxjs/toolkit';
import { favoritesReducer } from '@entities/favorites/model/favorites';
import { filtersReducer } from '@features/filters/model/filters';
import { contactsApi } from '@shared/api';

export const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  favorites: favoritesReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
