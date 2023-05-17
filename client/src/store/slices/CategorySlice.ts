import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  categoryImg: string;
  priceMin: number;
}

interface CategoryState {
  categories: Category[] | [];
  selectedCategory: Category | null;
  loading: boolean;
}

const initalState: CategoryState = {
  categories: [],
  selectedCategory: null,

  loading: false,
};

const slice = createSlice({
  name: "category",
  initialState: initalState,
  reducers: {
    SET_CATEGORIES: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_CATEGORIES, HANDLE_LOADING } = actions;

export type { CategoryState, Category };

export default reducer;
