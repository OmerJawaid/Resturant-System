import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Products from "../Products";
import "./Cards.css";
import { UserContext } from "./CategoryContext";
import MenuCards from "./MenuCards";

const Product = () => {
  const [label, changelabel] = useContext(UserContext);
  const [url, changeurl] = useState("http://localhost:8081/allproductshow");
  const [product, changeproduct] = useState([]);
  const urlChange = () => {
    if (label == "All") {
      changeurl("http://localhost:8081/allproductshow");
    } else if (label == "Breakfast") {
      changeurl("http://localhost:8081/breakfast");
    } else if (label == "MainDishes") {
      changeurl("http://localhost:8081/maindishes");
    } else if (label == "Drinks") {
      changeurl("http://localhost:8081/drinks");
    } else if (label == "Desserts") {
      changeurl("http://localhost:8081/desserts");
    }
  };

  useEffect(() => {
    const displayproduct = async () => {
      urlChange();
      try {
        const responce = await axios.get(url);
        const products = responce.data;
        console.log(products);
        const prod = products.map(
          (tempproduct) =>
            new Products(
              tempproduct.ID,
              tempproduct.Name,
              tempproduct.Price,
              tempproduct.Description,
              tempproduct.Category,
              tempproduct.Mainimage
            )
        );
        changeproduct(prod);
      } catch (err) {
        console.log("Could not load products ", err);
      }
    };
    displayproduct();
  }, [url]);
  return (
    <div className="HeadCards">
      {product.map((Products) => {
        return (
          <NavLink key={Products.getID()} className="Cards">
            <MenuCards
              mainimage={Products.getMainimage()}
              price={Products.getPrice()}
              title={Products.getName()}
              description={Products.getDescription()}
            />
          </NavLink>
        );
      })}
      {label}
    </div>
  );
};

export default Product;
