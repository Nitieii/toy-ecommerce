import * as URL from '../../../routes/url.ts';
import { useOrder, useUser } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NavBar() {
  const location = window.location.pathname;

  const { isAuthenticated, handleLogout } = useUser();

  const { totalLength, handleGetUserOrders } = useOrder();

  const { is_admin } = JSON.parse(localStorage.getItem('user') || '{}');

  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    handleGetUserOrders();
  }, []);

  return (
    <nav className='amado-nav'>
      <ul>
        {is_admin ? (
          <>
            <li className={location === '/admin/products' ? 'active' : ''}>
              <a onClick={() => handleNavigation('/admin/products')}>
                Products
              </a>
            </li>
            <li className={location === '/admin/orders' ? 'active' : ''}>
              <a onClick={() => handleNavigation('/admin/orders')}>Orders</a>
            </li>
            <li className={location === '/admin/users' ? 'active' : ''}>
              <a onClick={() => handleNavigation('/admin/users')}>Users</a>
            </li>
          </>
        ) : (
          <>
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
            <li className={location === '/cart' ? 'active' : ''}>
              <a href={URL.CART}>Cart</a>
            </li>
          </>
        )}

        {isAuthenticated ? (
          <>
            <li className={location === '/orders' ? 'active' : ''}>
              <a href='/orders'>Orders ({totalLength})</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <a href={'/myprofile'}>My Profile</a>
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
