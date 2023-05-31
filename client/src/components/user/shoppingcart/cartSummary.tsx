import CartSummator from './cartSummator.tsx';
import { useCart } from '../../../hooks';

function CartSummary() {
  const { numProducts } = useCart();
  return (
    <div className='cart-summary'>
      <CartSummator />

      {numProducts > 0 ? (
        <div className='cart-btn mt-100'>
          <a href={'checkout'} className='btn amado-btn w-100'>
            Checkout
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default CartSummary;
