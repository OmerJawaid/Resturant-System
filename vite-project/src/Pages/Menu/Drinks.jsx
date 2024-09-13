import React from "react";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import Title from "../../Components/Menu/Title";

const Drinks = () => {
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
    </div>
  );
};

export default Drinks;
