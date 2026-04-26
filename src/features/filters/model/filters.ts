import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterFormValues } from './types';

export interface FiltersState {
  nameQuery: string;
  groupId: string;
}

const initialState: FiltersState = {
  nameQuery: '',
  groupId: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: {
      reducer(state, action: PayloadAction<FiltersState>) {
        state.nameQuery = action.payload.nameQuery;
        state.groupId = action.payload.groupId;
      },
      prepare(values: Partial<FilterFormValues>) {
        return {
          payload: {
            nameQuery: values.name ?? '',
            groupId: values.groupId ?? '',
          },
        };
      },
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { resetFilters, setFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

export const selectFilters = (state: { filters: FiltersState }) => {
  return state.filters;
};
