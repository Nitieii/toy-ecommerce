import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/CategorySlice';
import productReducer from './slices/ProductsSlice';

const rootReducer = {
  category: categoryReducer,
  product: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
