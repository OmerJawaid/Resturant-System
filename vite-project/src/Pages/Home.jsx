import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Card from "../Components/Home Components/Card";
import "./Home.css";

import Headerbar from "../Components/Headerbar/Headerbar";
import CustomerHeader from "../Components/Navbar/Customer Header";

const Home = () => {
  const navigate = useNavigate();
  const [Authenticate, changeAuthenticate] = useState(null); // Initial state set to null (loading state)

  useEffect(() => {
    const authenticateCheck = async () => {
      console.log("Authentication check started");
      try {
        const response = await axios.get(
          "http://localhost:8081/authentication",
          {
            withCredentials: true,
          }
        );

        if (typeof response.data.Authenticate === "boolean") {
          changeAuthenticate(response.data.Authenticate);
        } else {
          console.error("Unexpected response data:", response.data);
          changeAuthenticate(false); // Fallback to false if unexpected response
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        changeAuthenticate(false); // Set to false on error
      }
    };

    authenticateCheck();
  }, []);

  useEffect(() => {
    if (Authenticate === false) {
      navigate("/Login");
    } else if (Authenticate === true) {
      // If authenticated, stay on the home page
      // navigate("/") is unnecessary here unless your logic requires it
    }
    // No need for else navigate("/Signup"); unless required
  }, [Authenticate, navigate]);

  return (
    <div className="main" style={{ backgroundColor: "#f9f9f7" }}>
      <Headerbar
        phone="+923325377010"
        email="omerjawaid0@gmail.com"
        twitter="www.twitter.com"
        facebook="www.facebook.com"
        instagram="www.instagram.com"
      />
      <CustomerHeader />
      <div className="Banner1HeadElement">
        <img
          className="Banner1"
          src="https://i.postimg.cc/SR065DCj/Home-Banner-1.png"
          alt="Home-Banner-1"
          border="0"
        ></img>
        <div className="Banner1Content">
          <h2>Best food for your taste</h2>
          <p>
            Discover delectable cuisine and unforgettable moments in out
            welcoming, culinery haven.
          </p>
          <div>
            <button className="Banner1Button1">Book a Table</button>
            <button className="Banner1Button2">Explore Menu</button>
          </div>
        </div>
      </div>
      <div className="BrowserMenu">
        <h2>Browse Our Menu</h2>

        <div className="Cards">
          <Card
            className="Card"
            link="https://i.postimg.cc/5tqtGKmK/Breakfast-image.png"
            title="Breakfast"
            content="In the new era of technology we look in the future with certainty and pride for our life."
          />
          <Card
            className="Card"
            link="https://i.postimg.cc/2yqrz04D/Main-Dish-image.png"
            title="MainDishes"
            content="In the new era of technology we look in the future with certainty and pride for our life."
          />
          <Card
            className="Card"
            link="https://i.postimg.cc/zv953TjR/Drinks-image.png"
            title="Drinks"
            content="In the new era of technology we look in the future with certainty and pride for our life."
          />
          <Card
            className="Card"
            link="https://i.postimg.cc/8k3TyVSP/Dessert-image.png"
            title="Desserts"
            content="In the new era of technology we look in the future with certainty and pride for our life."
          />
        </div>
      </div>
      \
      <div className="MainBanner2">
        <div className="Banner2">
          <div>
            <img
              className="Banner2image1"
              src="https://i.postimg.cc/7hXwwLpW/Banner-2-main.png"
            ></img>
            <div className="Banner2imageContent">
              <h4>Come and visit us</h4>
              <div>
                <div>
                  <img src="https://i.postimg.cc/mZVPbZN4/phone-banner2.png"></img>
                  <p>(051) 444-8421</p>
                </div>
                <div>
                  <img src="https://i.postimg.cc/bNBdt6BF/mail-banner-2.png"></img>
                  <p>info@restaurant.com</p>
                </div>
                <div>
                  <img src="https://i.postimg.cc/SK7yDVg4/location-marker-banner-2.png"></img>
                  <p>
                    House 10, Street 15, Sector F-1, Bahria Enclave, Islamabad
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Banner2Content">
            <h2>We provide healthy food for your family.</h2>
            <h4>
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in city rich culinary culture, we aim to honor
              our local roots while infusing a global palate.
            </h4>
            <p>
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </p>
            <button>More About Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
