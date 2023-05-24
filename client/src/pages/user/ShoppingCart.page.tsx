import Shoppingcart from '../../components/user/shoppingcart/shoppingcart.tsx';
import { useCart } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/layouts/spinner/spinner.tsx';

const ShoppingCartPage = () => {
  const { getCart, loadingCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (loadingCart) return <Spinner />;

  return <Shoppingcart />;
};

export default ShoppingCartPage;
