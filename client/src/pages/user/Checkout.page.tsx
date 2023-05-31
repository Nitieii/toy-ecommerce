import CheckoutForm from '../../components/user/checkout/checkoutForm.tsx';
import { useOrder } from '../../hooks';
import Spinner from '../../components/layouts/spinner/spinner.tsx';

function Checkout() {
  const { loadingOrder } = useOrder();

  if (loadingOrder) return <Spinner />;

  return <CheckoutForm />;
}

export default Checkout;
