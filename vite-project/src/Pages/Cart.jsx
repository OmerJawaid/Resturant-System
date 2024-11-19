import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import Headerbar from "../Components/Headerbar/Headerbar";
import CustomerHeader from "../Components/Navbar/Customer Header";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [User_Data, set_User_Data] = useState(null);
  const [Authenticate, changeAuthenticate] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateCheck = async () => {
      console.log("Authentication check started");
      try {
        const response = await axios.get(
          "http://localhost:8081/authentication",
          {
            withCredentials: true,
          }
        );

        if (typeof response.data.Authenticate === "boolean") {
          changeAuthenticate(response.data.Authenticate);
        } else {
          console.error("Unexpected response data:", response.data);
          changeAuthenticate(false); // Fallback to false if unexpected response
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        changeAuthenticate(false); // Set to false on error
      }
    };
    authenticateCheck();
  }, []);
  useEffect(() => {
    if (Authenticate === false) {
      navigate("/Login");
    }
  }, [Authenticate, navigate]);

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
