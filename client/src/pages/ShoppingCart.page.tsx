import Shoppingcart from '../components/shoppingcart/shoppingcart';
import { useCart } from '../hooks';
import { useEffect } from 'react';
import Spinner from '../components/spinner/spinner';

const ShoppingCartPage = () => {
  const { getCart, loadingCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  if (loadingCart) return <Spinner />;

  return <Shoppingcart />;
};

export default ShoppingCartPage;
