import axios from "axios";
import React, { useState } from "react";
import Base from "./Base";
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
    <div>
      <Navbar />
      <div>
        <Base />
        <form>
          <h4>SingUp</h4>
          <div>
            <div>
              <label>First</label>
              <input
                value={FirstName}
                name="FirstName"
                onChange={HandleChange}
              ></input>
            </div>
            <div>
              <label>Last</label>
              <input
                value={LastName}
                name="LastName"
                onChange={HandleChange}
              ></input>
            </div>
            <label>Email</label>
            <input
              value={Email}
              name="Email"
              onChange={HandleChange}
              type="email"
            ></input>
            <label>Phone</label>
            <input value={Phone} name="Phone" onChange={HandleChange}></input>
            <label>Username</label>
            <input
              value={Username}
              name="Username"
              onChange={HandleChange}
            ></input>
            <label>Password</label>
            <input
              value={Password}
              name="Password"
              onChange={HandleChange}
            ></input>
          </div>
          <button onClick={SubmitSignUp}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
