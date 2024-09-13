import React from "react";
import "./MenuCards.css";

const Cards = (props) => {
  return (
    <div>
      <div className="Image">
        <img src={props.mainimage}></img>
      </div>
      <div className="Content">
        <div>${props.price}</div>
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </div>
  );
};

export default Cards;
