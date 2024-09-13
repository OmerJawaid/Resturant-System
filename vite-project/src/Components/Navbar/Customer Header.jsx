import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Customer Header.css";
import NavButton from "./NavButton";

const CustomerHeader = () => {
  const navigate = useNavigate;
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8081/destroy",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="Home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://i.postimg.cc/Wz9QggM8/japanese-food.png"
            className="h-8"
            alt="Resturant"
            height={56}
            width={35}
          />
          <span
            id="LogoName"
            className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
          >
            Resturant
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <NavLink
                to="/Login"
                id="NavElementLogout"
                onClick={handleLogout}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="bookingButton">Booking</button>
      </div>
    </nav>
  );
};

export default CustomerHeader;
