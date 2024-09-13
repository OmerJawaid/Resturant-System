import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
const Card = (props) => {
  return (
    <div className="card">
      <img src={props.link} alt="image" className="cardimage"></img>
      <div className="cardcontent">
        <h4>{props.title} </h4>
        <p>{props.content}</p>
      </div>
      <Link to="/Menu" className="explorebuttom">
        Explore Menu
      </Link>
    </div>
  );
};

export default Card;
