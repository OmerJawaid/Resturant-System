import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="mainFooter">
        <div className="firstElement">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://i.postimg.cc/Wz9QggM8/japanese-food.png"
              className="h-8"
              alt="Restaurant"
              height={56}
              width={35}
            />
            <span
              id="LogoName"
              className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
              style={{ color: "white" }}
            >
              Restaurant
            </span>
          </Link>
          <div>
            In the new era of technology we look a in the future with certainty
            and pride to for our company and.
          </div>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://i.postimg.cc/zG9Q9yVw/Facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://i.postimg.cc/ydKb82hk/Instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://i.postimg.cc/xdMZY9zw/Twitter.png" alt="Twitter" />
            </a>
          </div>
        </div>
        <div className="secondElement">
          <div>
            <div>Pages</div>
            <ul className="list1">
              <li className="list1">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Menu">Menu</Link>
              </li>
              <li>
                <Link to="/Blog">Blog</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/my-orders">My Orders</Link>
              </li>
            </ul>
          </div>
          <div className="secondList">
            <div>Utility Pages</div>
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="lastElement">
          <span>Follow Us On Instagram</span>
          <div>
            <img src="https://i.postimg.cc/ThMrG5Wm/Image1.png" alt="Instagram 1" />
            <img src="https://i.postimg.cc/MZj3kyCn/Image2.png" alt="Instagram 2" />
            <img src="https://i.postimg.cc/W3q8vvfB/Image3.png" alt="Instagram 3" />
            <img src="https://i.postimg.cc/7YkVpj1R/Image-4.png" alt="Instagram 4" />
          </div>
        </div>
      </div>
      <div className="Copyright">
        Copyright © {new Date().getFullYear()} Restaurant. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
