import impPayPal from '../../assets/img/core-img/paypal.png';
import CartSummator from '../shoppingcart/cartSummator';

function CheckoutTotal() {
  return (
    <div className='col-12 col-lg-4'>
      <div className='cart-summary'>
        <CartSummator />

        <div className='payment-method'>
          <div className='custom-control custom-checkbox mr-sm-2'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='cod'
              checked
            />
            <label className='custom-control-label' htmlFor='cod'>
              Cash on Delivery
            </label>
          </div>

          <div className='custom-control custom-checkbox mr-sm-2'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='paypal'
            />
            <label className='custom-control-label' htmlFor='paypal'>
              Paypal
              <img className='ml-15' src={impPayPal} alt='' />
            </label>
          </div>
        </div>

        <div className='cart-btn mt-100'>
          <a href='#' className='btn amado-btn w-100'>
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}

export default CheckoutTotal;
