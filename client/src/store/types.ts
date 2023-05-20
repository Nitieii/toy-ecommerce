import { CategoryState } from './slices/CategorySlice';
import { ProductState } from './slices/ProductsSlice';
import { CartState } from './slices/CartSlice';
import { UserState } from './slices/UserSlice';

export interface RootState {
  category: CategoryState;
  product: ProductState;
  cart: CartState;
  user: UserState;
}
