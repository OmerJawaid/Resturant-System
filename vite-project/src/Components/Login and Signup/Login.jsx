import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Base.css";
import Base from "./Base.jsx";
import Navbar from "./Navbar.jsx";
const Login = () => {
  const [Email, changeEmail] = useState("");
  const [Password, changepassword] = useState("");
  const [Authenticate, changeAuthenticate] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticationCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8081/authentication", {
          withCredentials: true,
        });

        console.log("Authentication response:", res.data);
        if (typeof res.data.Authenticate === "boolean") {
          changeAuthenticate(res.data.Authenticate);
        } else {
          console.error("Unexpected response data:", res.data);
          changeAuthenticate(false);
        }
      } catch (err) {
        console.log(err);
        changeAuthenticate(false);
      } finally {
        setLoading(false);
      }
    };
    authenticationCheck();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (Loading) return;

    console.log("Authenticate state:", Authenticate);
    if (Authenticate === false) {
      navigate("/");
    } else if (Authenticate === true) {
      navigate("/Home");
    } else navigate("/Signup");
  }, [Authenticate, Loading, navigate]);

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
      const response = await axios.post(
        "http://localhost:8081/login",
        {
          Email,
          Password,
        },
        {
          withCredentials: true,
        }
      );
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
    <div
      style={{ backgroundColor: "#f9f9f7", width: "100vw", height: "100vh" }}
    >
      <Navbar />
      <div className="Body">
        <Base />
        <form className="Frame">
          <div className="Form">
            <h4>Login / SignIn</h4>
            <div className="Inputs">
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
