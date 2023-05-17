import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";

import MainLayout from "../layouts/index";

const Loadable = (Component) => (props) => {
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
      path: "/",
      element: (
        <GuestGuard>
          <MainLayout />
        </GuestGuard>
      ),
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/product/:productId",
          element: <ProductDetailPage />,
        },
      ],
    },
  ]);
}

const HomePage = Loadable(lazy(() => import("../pages/Home.page.jsx")));
const ShopPage = Loadable(lazy(() => import("../pages/Shop.page.jsx")));
const ProductDetailPage = Loadable(
  lazy(() => import("../pages/ProductDetail.page.jsx"))
);
