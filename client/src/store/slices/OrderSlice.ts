import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './ProductsSlice.ts';

interface Order {
  _id: string;
  user: string;
  products: [{ product: Product; quantity: number }];
  status: string;
  totalCost: number;
  shippingAddress: string;
  phone: string;
}

interface OrderState {
  orders: Order[];
  currentPage: number;
  totalPage: number;
  totalLength: number;
  loadingOrder: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentPage: 1,
  totalLength: 0,
  totalPage: 0,
  loadingOrder: false,
};

const slice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    SET_ORDER: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },

    SET_TOTAL_PAGE: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },

    SET_TOTAL_LENGTH: (state, action: PayloadAction<number>) => {
      state.totalLength = action.payload;
    },

    SET_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loadingOrder = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const {
  SET_ORDER,
  HANDLE_LOADING,
  SET_TOTAL_PAGE,
  SET_TOTAL_LENGTH,
  SET_CURRENT_PAGE,
} = actions;

export type { OrderState, Order };

export default reducer;
