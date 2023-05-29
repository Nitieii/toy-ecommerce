import imgCart from '../../../../../assets/img/core-img/cart.png';

import { useProduct } from '../../../../../hooks';
import { Product } from '../../../../../store/slices/ProductsSlice.ts';

function ProductItem() {
  const { products } = useProduct();

  // let itemStatus;
  function handlerAddToCart() {
    // let name = e.currentTarget.getAttribute('name');
    // let title = e.currentTarget.getAttribute('title');
    // let image = e.currentTarget.getAttribute('image');
    // let price = e.currentTarget.getAttribute('price');
    // let available = e.currentTarget.getAttribute('available');
    // let quantity = 1;
  }

  return products.map((item: Product) => {
    return (
      <div key={item._id} className='col-12 col-sm-6 col-md-12 col-xl-6'>
        <div className='single-product-wrapper'>
          <div className='product-img'>
            <a href={`product/${item._id}`}>
              <img
                src={item.images[0]}
                alt=''
                style={{
                  height: '300px',
                  objectFit: 'contain',
                }}
              />
            </a>
          </div>

          <div className='product-description d-flex align-items-center justify-content-between'>
            <div className='product-meta-data'>
              <div className='line'></div>
              <p className='product-price'>${item.price}</p>
              <a href={`product/${item._id}`}>
                <h6>{item.name}</h6>
              </a>
            </div>
            <div className='ratings-cart text-right'>
              <div className='ratings'>
                <i className='fa fa-star' aria-hidden='true'></i>
                <i className='fa fa-star' aria-hidden='true'></i>
                <i className='fa fa-star' aria-hidden='true'></i>
                <i className='fa fa-star' aria-hidden='true'></i>
                <i className='fa fa-star' aria-hidden='true'></i>
              </div>
              <div className='cart'>
                <img
                  style={{ cursor: 'pointer' }}
                  onClick={handlerAddToCart}
                  src={imgCart}
                  alt=''
                  id={item._id}
                />
                {/*<p>{itemStatus}</p>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default ProductItem;
