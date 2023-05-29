import { Order } from '../../../store/slices/OrderSlice.ts';

const OrderInfo = (props: { order: Order }) => {
  const { order } = props;

  return (
    <article className='card'>
      <div className='card-body row'>
        <div className='col'>
          <strong>Estimated delivery date:</strong> <br />
          <span id='estimateDate'>
            {new Date(
              new Date(order?.createdAt).getTime() + 15 * 24 * 60 * 60 * 1000
            ).toDateString()}
          </span>
        </div>
        <div className='col'>
          <strong>Shipping TO:</strong> <br />
          <span id='address'>{order?.shippingAddress}</span>
        </div>
        <div className='col'>
          <strong>Total: </strong> <br />${' '}
          <span id='total'>{order?.totalCost}</span>
        </div>
        <div className='col'>
          <strong>Status: </strong> <br />
          <span id='status'>
            {order?.status === 'pending'
              ? 'Pending'
              : order?.status === 'shipped'
              ? 'Shipped'
              : 'Confirmed'}
          </span>
        </div>
      </div>
    </article>
  );
};

export default OrderInfo;
