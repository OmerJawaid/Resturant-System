import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import Productsadd from "./Components/Productsadd.jsx";
import { CartProvider } from "./Components/CartContext";
import { AuthProvider } from "./Components/AuthContext";
import About from "./Pages/About.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login and Signup/Login.jsx";
import Signup from "./Pages/Login and Signup/Signup.jsx";
import Breakfast from "./Pages/Menu/Breakfast.jsx";
import Desserts from "./Pages/Menu/Desserts.jsx";
import Drinks from "./Pages/Menu/Drinks.jsx";
import MainDishes from "./Pages/Menu/MainDishes.jsx";
import Menu from "./Pages/Menu/Menu.jsx";
import ProductPage from "./Pages/Products/ProductPage.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Checkout from "./Pages/Orders/Checkout.jsx";
import OrderConfirmation from "./Pages/Orders/OrderConfirmation.jsx";
import MyOrders from "./Pages/Orders/MyOrders.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Blog from "./Pages/Blog/Blog.jsx";

// Admin Components
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import AdminProducts from "./Pages/Admin/Products.jsx";
import AdminOrders from "./Pages/Admin/Orders.jsx";
import AdminUsers from "./Pages/Admin/Users.jsx";
import AdminReviews from "./Pages/Admin/Reviews.jsx";
import AdminContacts from "./Pages/Admin/Contacts.jsx";
import AdminBlog from "./Pages/Admin/Blog.jsx";
import AdminAnalytics from "./Pages/Admin/Analytics.jsx";

function App() {
  const router = createBrowserRouter([
    // Customer Routes
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/About",
      element: <About />,
    },
    {
      path: "/Contact",
      element: <Contact />,
    },
    {
      path: "/Menu",
      element: <Menu />,
    },
    {
      path: "/Blog",
      element: <Blog />,
    },
    {
      path: "/AddProduct",
      element: <Productsadd />,
    },
    {
      path: "/Menu/Breakfast",
      element: <Breakfast />,
    },
    {
      path: "/Menu/Main-Dishes",
      element: <MainDishes />,
    },
    {
      path: "/Menu/Drinks",
      element: <Drinks />,
    },
    {
      path: "/Menu/Desserts",
      element: <Desserts />,
    },
    { 
      path: "/Product/:ProductID", 
      element: <ProductPage /> 
    },
    { 
      path: "/cart", 
      element: <Cart /> 
    },
    { 
      path: "/profile", 
      element: <ProtectedRoute><Profile /></ProtectedRoute> 
    },
    { 
      path: "/checkout", 
      element: <ProtectedRoute><Checkout /></ProtectedRoute> 
    },
    { 
      path: "/order-confirmation", 
      element: <ProtectedRoute><OrderConfirmation /></ProtectedRoute> 
    },
    { 
      path: "/my-orders", 
      element: <ProtectedRoute><MyOrders /></ProtectedRoute> 
    },
    
    // Admin Routes
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/products",
      element: <AdminProducts />,
    },
    {
      path: "/admin/orders",
      element: <AdminOrders />,
    },
    {
      path: "/admin/users",
      element: <AdminUsers />,
    },
    {
      path: "/admin/reviews",
      element: <AdminReviews />,
    },
    {
      path: "/admin/contacts",
      element: <AdminContacts />,
    },
    {
      path: "/admin/blog",
      element: <AdminBlog />,
    },
    {
      path: "/admin/analytics",
      element: <AdminAnalytics />,
    },
    {
      path: "/admin",
      element: <Navigate to="/admin/dashboard" replace />,
    },
    
    // Redirect any unknown routes to home
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
