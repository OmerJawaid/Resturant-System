import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavButton.css";

const NavButton = (props) => {
  const location = useLocation();
  const isActive =
    location.pathname === props.to ||
    location.pathname.startsWith(props.to + "/");
  
  return (
    <div>
      <NavLink
        to={props.to}
        id="NavElement"
        className={`block py-2 px-3 text-black rounded md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-primary-600 focus:text-primary-600 ${
          isActive ? "text-primary-600 font-semibold" : "text-gray-700 dark:text-gray-300"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {props.label}
      </NavLink>
    </div>
  );
};

export default NavButton;
