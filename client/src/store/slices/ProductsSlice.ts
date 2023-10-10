import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  ratings: number;
  images: [string];
  category: string;
}

interface ProductState {
  products: Product[];
  product: Product;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalLength: number;
  searchMode: boolean;
}

const initalState: ProductState = {
  products: [],
  loading: false,
  currentPage: 1,
  totalPages: 0,
  totalLength: 0,
  product: {
    id: '',
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    ratings: 0,
    images: [''],
    category: '',
  },
  searchMode: false,
};

const slice = createSlice({
  name: 'product',
  initialState: initalState,
  reducers: {
    SET_PRODUCTS: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    SET_TOTAL_PAGES: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    SET_TOTAL_LENGTH: (state, action: PayloadAction<number>) => {
      state.totalLength = action.payload;
    },

    SET_PRODUCT: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    SET_SEARCH_MODE: (state, action: PayloadAction<boolean>) => {
      state.searchMode = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const {
  SET_SEARCH_MODE,
  SET_PRODUCTS,
  HANDLE_LOADING,
  SET_CURRENT_PAGE,
  SET_PRODUCT,
  SET_TOTAL_LENGTH,
  SET_TOTAL_PAGES,
} = actions;

export type { ProductState, Product };

export default reducer;
