import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Productsadd from "./Components/Productsadd.jsx";
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

function App() {
  const [label, setlabel] = useState("All");

  const router = createBrowserRouter([
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
    { path: "/Product/:ProductID", element: <ProductPage /> },
    { path: "/Cart/:_id", element: <Cart /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
