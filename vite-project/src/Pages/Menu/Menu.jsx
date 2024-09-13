import axios from "axios";
import React, { useEffect, useState } from "react";
import Headerbar from "../../Components/Headerbar/Headerbar";
import Cards from "../../Components/Menu/MenuCards";
import Title from "../../Components/Menu/Title";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import Products from "../../Components/Products";

import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [product, changeproduct] = useState([]);
  useEffect(() => {
    const displayproduct = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:8081/allproductshow"
        );
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
      <div className="Main">
        <Title />
        <div className="HeadCards">
          {product.map((Products) => {
            return (
              <NavLink key={Products.getID()} className="Cards">
                <Cards
                  mainimage={Products.getMainimage()}
                  price={Products.getPrice()}
                  title={Products.getName()}
                  description={Products.getDescription()}
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
