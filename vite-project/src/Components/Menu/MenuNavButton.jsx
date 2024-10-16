import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CategoryContext } from "./CategoryContext";
import "./MenuNavButton.css";

const MenuNavButton = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;

  // Get setlabel from UserContext
  const { label, setlabel } = useContext(CategoryContext);

  // Check if setlabel exists before trying to use it
  if (!setlabel) {
    console.error(
      "setlabel is undefined, check if it's passed via UserContext."
    );
  }

  useEffect(() => {
    if (isActive && setlabel) {
      setlabel(props.label); // Make sure setlabel is a function before calling it
    }
  }, [isActive, props.label, setlabel]);

  const Active = { backgroundColor: "#AD343E", color: "white" };
  const InActive = { backgroundColor: "white", color: "black" };

  return (
    <div>
      <li className="SubNav" style={isActive ? Active : InActive}>
        <NavLink to={props.to}>{props.label}</NavLink>
      </li>
    </div>
  );
};

export default MenuNavButton;
