import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Base.css";
import Base from "./Base.jsx";
import Navbar from "./Navbar.jsx";
const Login = () => {
  const [Email, changeEmail] = useState("");
  const [Password, changepassword] = useState("");
  const [Authenticate, changeAuthenticate] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authenticationCheck = async () => {
      try {
        const responce = await axios.get("http://localhost:8081/athentication");
        changeAuthenticate(responce.data.Authenticate);
      } catch (err) {
        console.log(err);
        changeAuthenticate(false);
      }
    };
    authenticationCheck();
  }, []);

  useEffect(() => {
    if (Authenticate == false) {
      navigate("/");
    } else navigate("/Home");
  }, [Authenticate, navigate]);

  const EmailInputHandler = (e) => {
    changeEmail(e.target.value);
    console.log(Email);
  };
  const PasswordInputHandler = (e) => {
    changepassword(e.target.value);
    console.log(Password);
  };

  const LoginCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/login", {
        Email,
        Password,
      });
      if (response.data && response.data.message === "Login successful") {
        alert("Login Successful");
        navigate("/Home");
      } else {
        alert("Login Failed: " + response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Body">
        <Base />
        <form className="LoginFrame">
          <div className="LoginForm">
            <h4>Login / SignIn</h4>
            <div className="LoginInputs">
              <label>Email</label>
              <input
                placeholder="Enter your Email"
                value={Email}
                onChange={EmailInputHandler}
              ></input>
              <label>Password</label>
              <input
                placeholder="Enter your Password"
                value={Password}
                onChange={PasswordInputHandler}
              ></input>
            </div>
            <button className="LoginButtonLoginFrame" onClick={LoginCheck}>
              Login
            </button>
            <div className="LoginFrameSpacer"></div>
            <p>
              Create an account? <b>SignIn</b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
