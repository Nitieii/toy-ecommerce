import { useOrder } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/layouts/spinner/spinner';

const OrderDetailPage = () => {
  const { getOrder, loadingOrder, order } = useOrder();

  const orderId = window.location.pathname.split('/')[3];

  useEffect(() => {
    getOrder(orderId);
  }, []);

  if (loadingOrder) return <Spinner />;

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='cart-title mt-50'>
        <h2>Order Tracking</h2>
      </div>
      <div className='card-body'>
        <h6>
          Order ID: <span id='orderId'>{order?._id}</span>
        </h6>
        <article className='card'>
          <div className='card-body row'>
            <div className='col'>
              <strong>Estimated delivery date:</strong> <br />
              <span id='estimateDate'>
                {/*+ 15 days from createdAt date*/}
                {new Date(
                  new Date(order?.createdAt).getTime() +
                    15 * 24 * 60 * 60 * 1000
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
                  : 'Delivered'}
              </span>
            </div>
          </div>
        </article>
        <div className='track' id='track'></div>
        <hr />

        <ul className='row' id='productItemsContainer'>
          {order?.products.map((item: any, index: number) => (
            <li className='col-md-4' key={index}>
              <figure className='itemside mb-3'>
                <div>
                  <img
                    src={item?.product.images[0]}
                    className='img-sm rounded'
                  />
                </div>
                <figcaption className=' info align-self-center'>
                  <p className='title'>{item?.product.name}</p>{' '}
                  <span className='text-muted'>
                    $ {item?.product.price} * {item?.quantity} = ${' '}
                    {item?.product.price * item?.quantity}
                  </span>
                  <span></span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <hr />

        <button
          className='btn amado-btn'
          // onClick='confirmOrder()'
          id='btn-confirm'
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
