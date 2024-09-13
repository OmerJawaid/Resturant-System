import axios from "axios";
import React, { useState } from "react";
import Base from "./Base";
import "./Base.css";
import Navbar from "./Navbar";

const Signup = () => {
  const [FirstName, changeFirstName] = useState("");
  const [LastName, changeLastName] = useState("");
  const [Username, changeUsername] = useState("");
  const [Email, changeEmail] = useState("");
  const [Phone, changePhone] = useState("");
  const [Password, chnagePassword] = useState("");

  const SubmitSignUp = async (e) => {
    e.preventDefault();

    try {
      const newUser = { FirstName, LastName, Username, Email, Phone, Password };
      await axios.post("http://localhost:8081/registeruser", newUser);
      alert("User Rejisterd");
    } catch (err) {
      console.log("Not added: " + err);
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "FirstName":
        changeFirstName(value);
        break;
      case "LastName":
        changeLastName(value);
        break;
      case "Username":
        changeUsername(value);
        break;
      case "Email":
        changeEmail(value);
        break;
      case "Phone":
        changePhone(value);
        break;
      case "Password":
        chnagePassword(value);
        break;
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
            <h4>SignUp</h4>
            <div>
              <div className="FirstLastHead">
                <div className="FirstLast">
                  <label>First</label>
                  <input
                    value={FirstName}
                    name="FirstName"
                    onChange={HandleChange}
                  ></input>
                </div>
                <div className="FirstLast">
                  <label>Last</label>
                  <input
                    value={LastName}
                    name="LastName"
                    onChange={HandleChange}
                  ></input>
                </div>
              </div>
              <div className="Inputs">
                <label>Email</label>
                <input
                  value={Email}
                  name="Email"
                  onChange={HandleChange}
                  type="email"
                ></input>
                <div className="FirstLastHead">
                  <div className="FirstLast">
                    <label>Phone</label>
                    <input
                      value={Phone}
                      name="Phone"
                      onChange={HandleChange}
                    ></input>
                  </div>
                  <div className="FirstLast">
                    <label>Username</label>
                    <input
                      value={Username}
                      name="Username"
                      onChange={HandleChange}
                    ></input>
                  </div>
                </div>
                <label>Password</label>
                <input
                  value={Password}
                  name="Password"
                  onChange={HandleChange}
                ></input>
              </div>
            </div>
            <button onClick={SubmitSignUp}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
