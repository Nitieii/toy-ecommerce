import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  _id: string;
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
}

const initalState: ProductState = {
  products: [],
  loading: false,
  currentPage: 1,
  totalPages: 0,
  totalLength: 0,
  product: {
    _id: '',
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    ratings: 0,
    images: [''],
    category: '',
  },
};

const slice = createSlice({
  name: 'product',
  initialState: initalState,
  reducers: {
    SET_PRODUCTS: (state, action: PayloadAction<any>) => {
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.totalLength = action.payload.totalLength;
    },

    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    SET_PRODUCT: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_PRODUCTS, HANDLE_LOADING, SET_CURRENT_PAGE, SET_PRODUCT } =
  actions;

export type { ProductState, Product };

export default reducer;
