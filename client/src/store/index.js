import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/categorySlice";

const rootReducer = {
  category: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
