import * as URL from '../../../routes/url.ts';
import { useUser } from '../../../hooks';

function NavBar() {
  const location = window.location.pathname;

  const { isAuthenticated, handleLogout } = useUser();

  const { is_admin } = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className='amado-nav'>
      <ul>
        {is_admin ? (
          <>
            <li className={location === '/admin/products' ? 'active' : ''}>
              <a href={'products'}>Products</a>
            </li>
            <li className={location === '/admin/orders' ? 'active' : ''}>
              <a href={'orders'}>Orders</a>
            </li>
            <li className={location === '/admin/users' ? 'active' : ''}>
              <a href={'users'}>Users</a>
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
