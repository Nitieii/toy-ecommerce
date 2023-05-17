import { createSlice, current } from "@reduxjs/toolkit";

const initalState = {
  categories: [],
  selectedCategory: null,

  loading: false,
};

const slice = createSlice({
  name: "category",
  initialState: initalState,
  reducers: {
    SET_CATEGORIES: (state, action) => {
      state.categories = action.payload;
    },

    HANDLE_LOADING: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_CATEGORIES, HANDLE_LOADING } = actions;

export default reducer;
