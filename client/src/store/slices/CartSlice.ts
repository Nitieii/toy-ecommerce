import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './ProductsSlice.ts';

interface Cart {
  _id: string;
  products: [{ product: Product; quantity: number }];
  totalPrice: number;
}

interface CartState {
  _id: string;
  products: [{ product: Product; quantity: number }];
  totalPrice: number;
  loading: boolean;
}

const initalState: CartState = {
  _id: '',
  products: [
    {
      product: {
        _id: '',
        name: '',
        price: 0,
        description: '',
        category: '',
        quantity: 0,
        ratings: 0,
        images: [''],
      },
      quantity: 0,
    },
  ],
  totalPrice: 0,
  loading: false,
};

const slice = createSlice({
  name: 'cart',
  initialState: initalState,
  reducers: {
    SET_CART: (state, action: PayloadAction<Cart>) => {
      state._id = action.payload._id;
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },

    HANDLE_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    HANDLE_ADD_TO_CART: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product, quantity: 1 });
      }

      state.totalPrice += product.price;
    },
  },
});

const { reducer, actions } = slice;

export const { SET_CART, HANDLE_LOADING, HANDLE_ADD_TO_CART } = actions;

export type { CartState, Cart };

export default reducer;
