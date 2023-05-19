import CartSummary from './cartSummary';

import { useCart } from '../../hooks';
import { Product } from '../../store/slices/ProductsSlice.ts';

function Shoppingcart() {
  const { products, updateCart } = useCart();

  const handleQuantityChange = (e: any, productId: string, method: string) => {
    const currentQuantity =
      e.target.parentElement.parentElement.querySelector('#qty').value;

    if (method === 'plus') {
      updateCart(productId, parseInt(currentQuantity) + 1);
    } else {
      updateCart(productId, parseInt(currentQuantity) - 1);
    }
  };

  function renderCardItem() {
    return products?.map((item: any) => {
      return (
        <tr key={item.product._id}>
          <td className='cart_product_img'>
            <a href={`product/${item.product._id}`}>
              <img src={`${item.product.images[0]}`} alt='Product' />
            </a>
          </td>
          <td className='cart_product_desc'>
            <h5>{item.product.name}</h5>
          </td>
          <td className='price'>
            <span>${item.product.price}</span>
          </td>
          <td className='qty'>
            <div className='qty-btn d-flex'>
              <p>Qty</p>

              <div className='quantity'>
                <span
                  className='qty-minus'
                  onClick={(e) =>
                    handleQuantityChange(e, item.product._id, 'minus')
                  }
                >
                  <i className='fa fa-minus' aria-hidden='true'></i>
                </span>
                <input
                  type='number'
                  className='qty-text'
                  id='qty'
                  step='1'
                  min='1'
                  max='300'
                  name='quantity'
                  value={item.quantity}
                />

                <span
                  className='qty-plus'
                  onClick={(e) =>
                    handleQuantityChange(e, item.product._id, 'plus')
                  }
                >
                  <i className='fa fa-plus' aria-hidden='true'></i>
                </span>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <div className='cart-title mt-50'>
              <h2>Shopping Cart</h2>
            </div>

            <div className='cart-table clearfix'>
              <table
                className='table table-responsive'
                // tabIndex='1'
                style={{ overflow: 'hidden', outline: 'none' }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>{renderCardItem()}</tbody>
              </table>
            </div>
          </div>

          <div className='col-12 col-lg-4'>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shoppingcart;
