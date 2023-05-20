import React from 'react';
import * as URL from '../../routes/url';
import { useUser } from '../../hooks';

function NavBar() {
  const location = window.location.pathname;

  const { isAuthenticated, handleLogout } = useUser();

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
        {isAuthenticated ? (
          <>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <a href={'/profile'}>My Profile</a>
            </li>
          </>
        ) : (
          <li>
            <a href={'/login'}>Login / Sign up</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
