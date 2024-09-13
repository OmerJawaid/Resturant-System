import axios from "axios";
import React, { useState } from "react";
import Products from "./Products";

const Productsadd = () => {
  const [ID, changeID] = useState(0);
  const [Name, changeName] = useState("");
  const [Price, changePrice] = useState(0);
  const [Description, changeDescription] = useState("");
  const [Category, changeCategory] = useState("");
  const [Image, changeImage] = useState("");
  const Product = [];
  const AddItem = async (e) => {
    e.preventDefault();
    try {
      const Item = new Products(ID, Name, Price, Description, Category, Image);
      Product.push(Item);
      console.log(Item);
      await axios.post("http://localhost:8081/products", Item);
      alert("Added item sucessfully");
    } catch (err) {
      console.log("Not added: " + err);
    }
  };

  const IDhandlechange = (e) => {
    changeID(e.target.value);
  };
  const Namehandlechange = (e) => {
    changeName(e.target.value);
  };
  const Pricehandlechange = (e) => {
    changePrice(e.target.value);
  };
  const Descriptionhandlechange = (e) => {
    changeDescription(e.target.value);
  };
  const Categoryhandlechange = (e) => {
    changeCategory(e.target.value);
  };
  const Imagehandlechange = (e) => {
    changeImage(e.target.value);
  };

  return (
    <div>
      <label>ID</label>
      <input value={ID} onChange={IDhandlechange}></input>
      <label>Name</label>
      <input value={Name} onChange={Namehandlechange}></input>
      <label>Description</label>
      <input value={Description} onChange={Descriptionhandlechange}></input>
      <label>Price</label>
      <input value={Price} onChange={Pricehandlechange}></input>
      <label>Category</label>
      <input value={Category} onChange={Categoryhandlechange}></input>
      <label>Image</label>
      <input value={Image} onChange={Imagehandlechange}></input>
      <button onClick={AddItem}>Add</button>
    </div>
  );
};

export default Productsadd;
