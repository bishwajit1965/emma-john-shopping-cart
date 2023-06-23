import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";
import Inventory from "./components/inventory/Inventory";
import Login from "./components/login/Login";
import cartProductsLoader from "./components/loaders/CartProductsLoader";
import Checkout from "./components/checkout/Checkout";
import SignUp from "./components/signUp/SignUp";
import AuthProvider from "./components/providers/AuthProvider";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Products />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "/order",
        element: <Orders />,
        loader: cartProductsLoader,
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
