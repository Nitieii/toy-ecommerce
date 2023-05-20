import React from 'react';
import * as URL from '../../routes/url';

function NavBar() {
  const location = window.location.pathname;

  return (
    <nav className='amado-nav'>
      <ul>
        <li className={location === '/home' ? 'active' : ''}>
          <a href={URL.ROOT}>Home</a>
        </li>
        <li
          className={
            location === '/shop' || location === '/shop/:category'
              ? 'active'
              : ''
          }
        >
          <a href={URL.SHOP}>Shop</a>
        </li>
        {/*<li><a href={ URL.DETAILS }>Product</a></li>*/}
        <li className={location === '/cart' ? 'active' : ''}>
          <a href={URL.CART}>Cart</a>
        </li>
        <li className={location === '/checkout' ? 'active' : ''}>
          <a href={URL.CHECKOUT}>Checkout</a>
        </li>
        <li>
          <a href={URL.ROOT}>Login / Sign up</a>
        </li>
        <li>
          <a href={URL.ROOT}>My Profile</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
