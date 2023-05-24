import Spinner from '../../layouts/spinner/spinner.tsx';
import { useEffect, useState } from 'react';

import { useProduct, useCart } from '../../../hooks';

function ProductDetails() {
  const { product, loading, handleGetProduct } = useProduct();
  const { handleAddToCart, loadingCart } = useCart();
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productId = window.location.pathname.split('/')[2];

    if (productId) {
      handleGetProduct(productId);
    } else {
      window.location.pathname = '/shop';
    }
  }, []);

  if (loading || loadingCart) return <Spinner />;

  function handlerAddToCart() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      alert('Please login to add to cart');

      localStorage.setItem('redirect_url', window.location.pathname);

      window.location.pathname = '/login';

      return;
    }

    handleAddToCart(product?._id, quantity);
  }

  function renderBigImage() {
    return product?.images.map((item: any, index: any) => {
      if (index === Number(currentCarouselImage)) {
        return (
          <img
            className='d-block w-100'
            src={`${item}`}
            alt='Third slide'
            key={item}
          />
        );
      }
    });
  }

  function renderCarouselImgs() {
    return product?.images.map((item: any, index: any) => {
      return (
        <li
          key={item}
          onClick={() => setCurrentCarouselImage(index)}
          className={index === Number(currentCarouselImage) ? 'active' : ''}
          data-target='#product_details_slider'
          data-slide-to='0'
          style={{
            backgroundImage: `url(${item})`,
          }}
        ></li>
      );
    });
  }

  function renderDesc() {
    return (
      <div className='short_overview my-5'>
        <p>{product?.description}</p>
      </div>
    );
  }

  function handleChangeQuantity(method: string) {
    if (method === 'plus') {
      if (quantity >= product?.quantity) {
        // alert quantity cannot be more than available
        alert('Quantity cannot be more than available');
      } else {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        // alert quantity cannot be less than 1
        alert('Quantity cannot be less than 1');
      }
    }
  }

  return (
    <div className='single-product-area section-padding-100 clearfix'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='row'>
            <div className='col-12'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb mt-50'>
                  <li className='breadcrumb-item'>
                    <a href={'/'}>HOME</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href={'/shop'}>SHOP</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href={'/shop'}>{product?.category}</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    {product?.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/*CONTENT*/}
        <div className='row'>
          <div className='col-12 col-lg-7'>
            <div className='single_product_thumb'>
              <div
                id='product_details_slider'
                className='carousel slide'
                data-ride='carousel'
              >
                {/* carousel-indicators*/}
                <ol className='carousel-indicators'>{renderCarouselImgs()}</ol>

                {/*carousel-inner*/}
                <div className='carousel-inner'>
                  <div className='carousel-item active'>{renderBigImage()}</div>
                </div>
              </div>
            </div>
          </div>

          {/*DESCRIPTION*/}
          <div className='col-12 col-lg-5'>
            <div className='single_product_desc'>
              <div className='product-meta-data'>
                <div className='line'></div>
                <p className='product-price'>${product?.price}</p>
                <a href=''>
                  <h6>{product?.name}</h6>
                </a>
                <div className='ratings-review mb-15 d-flex align-items-center justify-content-between'>
                  <div className='ratings'>
                    <i className='fa fa-star' aria-hidden='true'></i>
                    <i className='fa fa-star' aria-hidden='true'></i>
                    <i className='fa fa-star' aria-hidden='true'></i>
                    <i className='fa fa-star' aria-hidden='true'></i>
                    <i className='fa fa-star' aria-hidden='true'></i>
                  </div>
                  <div className='review'>
                    <a href='#'>Write A Review</a>
                  </div>
                </div>
                <p className='avaibility'>
                  <i className='fa fa-circle'></i>{' '}
                  {product?.quantity > 10
                    ? 'In stock'
                    : product?.quantity <= 10
                    ? 'Running low'
                    : 'Out of stock'}{' '}
                  - {product?.quantity} products available
                </p>
              </div>

              {renderDesc()}

              <div className='cart clearfix'>
                <div className='cart-btn d-flex mb-50'>
                  <p>Qty</p>
                  <div className='quantity'>
                    <span
                      className='qty-minus'
                      onClick={() => handleChangeQuantity('minus')}
                    >
                      <i className='fa fa-caret-down' aria-hidden='true'></i>
                    </span>

                    <input
                      type='number'
                      className='qty-text'
                      id='qty'
                      step='1'
                      min='1'
                      name='quantity'
                      value={quantity}
                    />

                    <span
                      className='qty-plus'
                      onClick={() => handleChangeQuantity('plus')}
                    >
                      <i className='fa fa-caret-up' aria-hidden='true'></i>
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlerAddToCart}
                  name='addtocart'
                  value='5'
                  className='btn amado-btn'
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
