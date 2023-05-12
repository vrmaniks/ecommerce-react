import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home/home';
import SignUp from './signup/signup';
import Login from './login/login';
import Buynow from './components/buyNow/buynow';
import Orders from './components/myorders/orders';
import Seller from './components/becomeSeller/becomeSeller';
import Cart from './components/cart/cart';
import SellerLogin from './components/sellerSignupLogin/sellerLogin';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ForgotPassword from './components/forgotPassword/forgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/becomeSeller',
    element: <Seller />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/viewProduct/:id',
    element: <Cart />
  },
  {
    path: "/buynow",
    element: <Buynow />
  },
  {
    path: '/myorders',
    element: <Orders />
  },
  {
    path: '/sellerLogin',
    element: <SellerLogin />
  },
  {
    path:'/forgotPassword',
    element:<ForgotPassword/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

