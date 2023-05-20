import React, { useEffect } from 'react';
import imgCart from '../../assets/img/core-img/cart.png';
import imgSearch from '../../assets/img/core-img/search.png';
import * as URL from '../../routes/url';

import { useCart } from '../../hooks';

function NavSearch() {
  const { numProducts, getCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className='cart-fav-search mb-100'>
      <a href={URL.CART} className={`cart-nav`}>
        <img src={imgCart} alt='' /> Cart <span>({numProducts})</span>
      </a>

      <a href='#' className='search-nav'>
        <img src={imgSearch} alt='' /> Search
      </a>
    </div>
  );
}

export default NavSearch;
