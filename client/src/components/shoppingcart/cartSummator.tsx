import { useCart } from '../../hooks';

function CartSummator() {
  const { totalPrice } = useCart();

  return (
    <>
      <h5>Cart Total</h5>
      <ul className='summary-table'>
        <li>
          <span>subtotal:</span> <span>${totalPrice}</span>
        </li>
        <li>
          <span>delivery:</span> <span>Free</span>
        </li>
        <li>
          <span>total:</span> <span>${totalPrice}</span>
        </li>
      </ul>
    </>
  );
}

export default CartSummator;
