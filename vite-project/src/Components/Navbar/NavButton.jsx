import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavButton.css";

const NavButton = (props) => {
  const location = useLocation();
  const isActive =
    location.pathname === props.to ||
    location.pathname.startsWith(props.to + "/");
  const activeStyle = { backgroundColor: "#DBDFD0" };
  const inactiveStyle = { backgroundColor: "none" };
  return (
    <div>
      <NavLink
        to={props.to}
        id="NavElement"
        className="block py-2 px-3 text-black bg-grey-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-grey-500"
        aria-current="page"
        style={isActive ? activeStyle : inactiveStyle}
      >
        {props.label}
      </NavLink>
    </div>
  );
};

export default NavButton;
