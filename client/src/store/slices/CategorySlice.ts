import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  _id: string;
  categoryImg: string;
  priceMin: number;
}

interface CategoryState {
  categories: Category[] | [];
  selectedCategory: string | null;
  loading: boolean;
}

const initalState: CategoryState = {
  categories: [],
  selectedCategory: 'All',
  loading: false,
};

const slice = createSlice({
  name: 'category',
  initialState: initalState,
  reducers: {
    SET_CATEGORIES: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    SET_SELECTED_CATEGORY: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_CATEGORIES, HANDLE_LOADING, SET_SELECTED_CATEGORY } =
  actions;

export type { CategoryState, Category };

export default reducer;
