import impPayPal from '../../../assets/img/core-img/paypal.png';
import CartSummator from '../shoppingcart/cartSummator.tsx';
import { useCart, useOrder } from '../../../hooks';

function CheckoutTotal() {
  const { numProducts, totalPrice } = useCart();
  const { handleCreateOrder } = useOrder();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const order = {
      shippingAddress: '47 Tam Khuong, Hanoi',
      phone: '0931681614',
      totalCost: totalPrice,
    };

    const transaction = {
      paymentMethod: 'Paypal',
      status: 'pending',
      amount: totalPrice,
      type: 'debit',
      orderId:' '
    }

    handleCreateOrder(order);
  };

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
              readOnly
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
              readOnly
            />
            <label className='custom-control-label' htmlFor='paypal'>
              Paypal
              <img className='ml-15' src={impPayPal} alt='' />
            </label>
          </div>
        </div>
        {numProducts > 0 ? (
          <div className={`cart-btn mt-100`}>
            <a onClick={(e) => handleSubmit(e)} className='btn amado-btn w-100'>
              Checkout
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CheckoutTotal;
