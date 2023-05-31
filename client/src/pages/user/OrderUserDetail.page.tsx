import { useOrder } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/layouts/spinner/spinner';
import OrderDetaiContainer from '../../components/admin/orderdetail/orderdetailcontainer.tsx';

const OrderUserDetailPage = () => {
  const { getOrder, loadingOrder, order, confirmOrder } = useOrder();

  const orderId = window.location.pathname.split('/')[2];

  useEffect(() => {
    getOrder(orderId);
  }, []);

  if (loadingOrder) return <Spinner />;

  return <OrderDetaiContainer order={order} confirmOrder={confirmOrder} />;
};

export default OrderUserDetailPage;
