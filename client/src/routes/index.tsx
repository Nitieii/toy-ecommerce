import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import GuestGuard from '../guards/GuestGuard';
import MainLayout from '../layouts';

const Loadable = (Component: React.ComponentType<any>) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: (
        <GuestGuard>
          <MainLayout />
        </GuestGuard>
      ),
      children: [
        { path: '/', element: <Navigate to='/home' replace /> },
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'shop',
          element: <ShopPage />,
        },
        {
          path: 'product/:id',
          element: <ProductDetailPage />,
        },
        {
          path: 'cart',
          element: <ShoppingCart />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
  ]);
}

const HomePage = Loadable(React.lazy(() => import('../pages/Home.page.tsx')));
const ShopPage = Loadable(React.lazy(() => import('../pages/Shop.page.tsx')));
const ProductDetailPage = Loadable(
  React.lazy(() => import('../pages/ProductDetail.page.tsx'))
);
const ShoppingCart = Loadable(
  React.lazy(() => import('../pages/ShoppingCart.page.tsx'))
);

const Login = Loadable(React.lazy(() => import('../pages/Login.page.tsx')));
const Signup = Loadable(React.lazy(() => import('../pages/Signup.page.tsx')));
