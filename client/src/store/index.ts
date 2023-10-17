import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/CategorySlice';
import productReducer from './slices/ProductsSlice';
import cartReducer from './slices/CartSlice';
import userReducer from './slices/UserSlice';
import orderReducer from './slices/OrderSlice';
import transactionReducer from './slices/TransactionSlice';

const rootReducer = {
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  transaction: transactionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
