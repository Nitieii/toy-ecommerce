import CartSummator from './cartSummator';

function CartSummary() {
  return (
    <div className='cart-summary'>
      <CartSummator />

      <div className='cart-btn mt-100'>
        <a href={'checkout'} className='btn amado-btn w-100'>
          Checkout
        </a>
      </div>
    </div>
  );
}

export default CartSummary;
