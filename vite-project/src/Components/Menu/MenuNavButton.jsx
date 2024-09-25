import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { UserContext } from "./CategoryContext";
import "./MenuNavButton.css";
const MenuNavButton = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const Active = { backgroundColor: "#AD343E", color: "white" };
  const InActive = { backgroundColor: "white", color: "black" };
  const value = useContext(UserContext);
  const { label, setlabel } = value;
  useEffect(() => {
    if (isActive) {
      setlabel(props.label);
    }
  }, []);
  return (
    <div>
      <li className="SubNav" style={isActive ? Active : InActive}>
        <NavLink to={props.to}>{props.label}</NavLink>
      </li>
    </div>
  );
};

export default MenuNavButton;
