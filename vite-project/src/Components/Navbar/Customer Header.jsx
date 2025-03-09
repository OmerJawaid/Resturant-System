import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Customer Header.css";
import NavButton from "./NavButton";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";

const CustomerHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, userData } = useAuth();
  const { cartItems } = useCart();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://i.postimg.cc/Wz9QggM8/japanese-food.png"
            className="h-8"
            alt="Restaurant"
            height={56}
            width={35}
          />
          <span
            id="LogoName"
            className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
          >
            Restaurant
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-primary-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavButton to="/" label="Home" />
            </li>
            <li>
              <NavButton to="/Menu" label="Menu" />
            </li>
            <li>
              <NavButton to="/About" label="About" />
            </li>
            <li>
              <NavButton to="/Contact" label="Contact" />
            </li>
            <li>
              <NavButton to="/Blog" label="Blog" />
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavButton to="/profile" label="Profile" />
                </li>
                <li>
                  <NavButton to="/my-orders" label="My Orders" />
                </li>
                <li>
                  <NavLink
                    to="/"
                    id="NavElementLogout"
                    onClick={handleLogout}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/Login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Signup"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-600 md:p-0 dark:text-white md:dark:hover:text-primary-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink to="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/checkout" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-colors duration-200">
            Book a Table
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default CustomerHeader;
