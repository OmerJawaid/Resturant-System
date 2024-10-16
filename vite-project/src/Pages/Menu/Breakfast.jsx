import React from "react";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import Title from "../../Components/Menu/Title";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import "./Menu.css";

const Breakfast = () => {
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
      <div className="Main">
        <Title />
      </div>
      <Footer />
    </div>
  );
};

export default Breakfast;
