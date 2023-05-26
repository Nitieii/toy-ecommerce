import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import GuestGuard from '../guards/GuestGuard';
import MainLayout from '../layouts';
import AuthGuard from '../guards/AuthGuard.tsx';
import OrdersPage from '../pages/admin/orders.pages.tsx';
import UsersPage from '../pages/admin/users.page.tsx';

const Loadable = (Component: React.ComponentType<any>) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // User Routes
    {
      path: '/',
      element: (
        // <GuestGuard>
        <MainLayout />
        // </GuestGuard>
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
          path: 'search',
          element: <SearchPage />,
        },
        {
          path: 'product/:id',
          element: <ProductDetailPage />,
        },
        {
          path: 'cart',
          element: (
            <GuestGuard>
              <ShoppingCart />
            </GuestGuard>
          ),
        },
        {
          path: 'checkout',
          element: (
            <GuestGuard>
              <Checkout />
            </GuestGuard>
          ),
        },
      ],
    },

    // Admin Routes
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/admin/products',
          element: <ProductsPage />,
        },
        {
          path: '/admin/products/:id/',
          element: <ProductDetailAdmin />,
        },
        {
          path: '/admin/orders',
          element: <OrdersPage />,
        },
        {
          path: '/admin/users',
          element: <UsersPage />,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: '/signup',
      element: (
        <GuestGuard>
          <Signup />
        </GuestGuard>
      ),
    },
  ]);
}

const HomePage = Loadable(
  React.lazy(() => import('../pages/user/Home.page.tsx'))
);
const ShopPage = Loadable(
  React.lazy(() => import('../pages/user/Shop.page.tsx'))
);
const ProductDetailPage = Loadable(
  React.lazy(() => import('../pages/user/ProductDetail.page.tsx'))
);

const ProductDetailAdmin = Loadable(
  React.lazy(() => import('../pages/admin/productdetail.page.tsx'))
);
const ShoppingCart = Loadable(
  React.lazy(() => import('../pages/user/ShoppingCart.page.tsx'))
);

const Login = Loadable(
  React.lazy(() => import('../pages/user/Login.page.tsx'))
);
const Signup = Loadable(
  React.lazy(() => import('../pages/user/Signup.page.tsx'))
);
const Checkout = Loadable(
  React.lazy(() => import('../pages/user/Checkout.page.tsx'))
);
const SearchPage = Loadable(
  React.lazy(() => import('../pages/user/Search.page.tsx'))
);
const ProductsPage = Loadable(
  React.lazy(() => import('../pages/admin/products.page.tsx'))
);
