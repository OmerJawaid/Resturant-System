import React from "react";
import Footer from "../Components/Footer/Footer";
import Headerbar from "../Components/Headerbar/Headerbar";
import CustomerHeader from "../Components/Navbar/Customer Header";

const Contact = () => {
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
      Contact
      <Footer />
    </div>
  );
};

export default Contact;
