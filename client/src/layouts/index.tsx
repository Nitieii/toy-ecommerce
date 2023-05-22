import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { useUser } from '../hooks';
import { useEffect } from 'react';

export default function index() {
  const { handleAuthenticated, isAuthenticated } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    handleAuthenticated();
  }, [isAuthenticated]);

  return (
    <div>
      <div className='main-content-wrapper d-flex clearfix'>
        <Header />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
