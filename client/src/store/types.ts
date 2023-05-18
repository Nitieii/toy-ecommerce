import { CategoryState } from './slices/CategorySlice';
import { ProductState } from './slices/ProductsSlice';
import { CartState } from './slices/CartSlice';

export interface RootState {
  category: CategoryState;
  product: ProductState;
  cart: CartState;
}
