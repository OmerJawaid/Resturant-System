import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import { CategoryContext } from "../../Components/Menu/CategoryContext";
import Product from "../../Components/Menu/Product";
import Title from "../../Components/Menu/Title";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import "./Menu.css";

const Menu = () => {
  const [label, setlabel] = useState("All");

  return (
    <div>
      <Headerbar
        phone="+923325377010"
        email="omerjawaid0@gmail.com"
        twitter="www.twitter.com"
        facebook="www.facebook.com"
        instagram="www.instagram.com"
      />
      <CustomerHeader />

      {/* Ensure that both label and setlabel are passed correctly */}
      <CategoryContext.Provider value={{ label, setlabel }}>
        <div className="Main">
          <Title />
          <Product />
        </div>
      </CategoryContext.Provider>

      <Footer />
    </div>
  );
};

export default Menu;
