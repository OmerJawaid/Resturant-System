import React from "react";
import MenuNavButton from "./MenuNavButton";
import "./Title.css";

const Title = () => {
  return (
    <div>
      <div className="Headings">
        <h1>Our Menu</h1>
        <h5>
          We consider all the drivers of change gives you the components you
          need to change to create a truly happens.
        </h5>
      </div>
      <div className="MenuNav">
        <MenuNavButton label="All" to="/Menu" />
        <MenuNavButton label="Breakfast" to="/Menu/Breakfast" />
        <MenuNavButton label="Main Dishes" to="/Menu/Main-Dishes" />
        <MenuNavButton label="Drinks" to="/Menu/Drinks" />
        <MenuNavButton label="Desserts" to="/Menu/Desserts" />
      </div>
    </div>
  );
};

export default Title;
