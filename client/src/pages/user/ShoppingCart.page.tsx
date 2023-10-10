import ShoppingCart from '../../components/user/shoppingcart/shoppingCart.tsx';
import { useCart } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/layouts/spinner/spinner.tsx';

const ShoppingCartPage = () => {
  const { getCart, loadingCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (loadingCart) return <Spinner />;

  return <ShoppingCart />;
};

export default ShoppingCartPage;
