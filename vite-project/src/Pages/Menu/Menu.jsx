import React, { useState } from "react";
import Headerbar from "../../Components/Headerbar/Headerbar";

import Title from "../../Components/Menu/Title";
import CustomerHeader from "../../Components/Navbar/Customer Header";

import Footer from "../../Components/Footer/Footer";
import { UserContext } from "../../Components/Menu/CategoryContext";
import Product from "../../Components/Menu/Product";
import "./Menu.css";

const Menu = () => {
  const [label, changelabel] = useState();
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
      <UserContext.Provider value={[label, changelabel]}>
        <div className="Main">
          <Title />
          <Product />
        </div>
      </UserContext.Provider>
      <Footer />
    </div>
  );
};

export default Menu;
