import UserInput from './userInput';
import CheckoutTotal from './checkoutTotal';

function CheckoutForm() {
  return (
    <div className='cart-table-area section-padding-100'>
      <div className='container-fluid'>
        <div className='row'>
          <UserInput />
          <CheckoutTotal />
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
