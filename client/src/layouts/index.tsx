import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default function index() {
  return (
    <>
      <div className='main-content-wrapper d-flex clearfix'>
        <Header />
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
