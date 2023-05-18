import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/CategorySlice';
import productReducer from './slices/ProductsSlice';
import cartReducer from './slices/CartSlice';

const rootReducer = {
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
