import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import Headerbar from "../Components/Headerbar/Headerbar";
import CustomerHeader from "../Components/Navbar/Customer Header";

const Cart = () => {
  const [User_Data, set_User_Data] = useState(null);
  const User_Data_Server = async () => {
    try {
      const result = await axios.get("http://localhost:8081/getuserdata", {
        withCredentials: true,
      });
      set_User_Data(result.data);
      // setUser_Data(result.data.Userdata);
    } catch (err) {
      console.log("Err in getting user data client side: ", err);
    }
    console.log("Runs sucess");
  };
  useEffect(() => {
    User_Data_Server();
  }, []);

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
      <div></div>
      <Footer />
    </div>
  );
};

export default Cart;
