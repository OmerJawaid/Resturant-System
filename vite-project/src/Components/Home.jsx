import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./Navbar/Customer Header";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateCheck = async () => {
      const responce = await axios.get("http://localhost:8081/authentication", {
        withCredentials: true,
      });
      if (responce.data.Authenticate) {
        navigate("/");
      }
    };
    authenticateCheck();
  }, [navigate]);
  return (
    <div>
      <CustomerHeader />
    </div>
  );
};

export default Home;
