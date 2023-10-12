import { Order } from '../../../store/slices/OrderSlice.ts';
import OrderInfo from './orderinfo.tsx';
import Tracking from './tracking.tsx';
import ProductItems from './productitems.tsx';

const OrderDetaiContainer = (props: { order: Order; confirmOrder: any }) => {
  const { order, confirmOrder } = props;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleConfirmOrder = () => {
    confirmOrder(order?._id);

    window.location.reload();
  };

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='cart-title mt-50'>
        <h2>Order Tracking</h2>
      </div>
      <div className='card-body'>
        <h6>
          Order ID: <span id='orderId'>{order?._id}</span>
          <br />
          User ID: <span id='userId'>{order?.user}</span>
        </h6>

        <OrderInfo order={order} />
        <hr />

        <Tracking status={order?.status} />
        <hr />

        <ProductItems products={order?.products ? order.products : []} />

        {order?.status === 'pending' && user?.isAdmin ? (
          <button
            className='btn amado-btn'
            onClick={handleConfirmOrder}
            id='btn-confirm'
          >
            Confirm Order
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetaiContainer;
