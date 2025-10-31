import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminDashBoard from './pages/admin/AdminDashBoard.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCloth from './pages/admin/AddCloth.jsx'
import OdersDetails from './pages/admin/OdersDetails.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import UpdateCloth from './pages/admin/UpdateCloth.jsx'
import HomePage from './pages/HomePage.jsx'
import AllCloth from './pages/user/AllCloth.jsx'
import CartPage from './pages/user/CartPage.jsx'
import CheckOut from './components/checkout/CheckOut.jsx'
import MyOrders from './pages/user/MyOrders.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dash_board", element: <AdminDashBoard /> },
  { path: "/add_new_cloth", element: <AddCloth /> },
  { path: "/orders", element: <OdersDetails /> },
  { path: "/update_cloth/:id", element: <UpdateCloth /> },
  { path: "/home", element: <HomePage /> },
  { path: "/all_cloths", element: <AllCloth /> },
  { path: "/all_cloths/:category", element: <AllCloth /> },
  { path: "/all_cloths/:category/:type", element: <AllCloth /> },
  { path: "/cart", element:<CartPage /> },
  { path: "/checkout", element: <CheckOut /> },
  { path: "/my_orders", element: <MyOrders /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:id", element: <BlogDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
