import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="mainFooter">
        <div className="firstElement">
          <a
            href="Home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://i.postimg.cc/Wz9QggM8/japanese-food.png"
              className="h-8"
              alt="Resturant"
              height={56}
              width={35}
            />
            <span
              id="LogoName"
              className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
              style={{ color: "white" }}
            >
              Resturant
            </span>
          </a>
          <div>
            In the new era of technology we look a in the future with certainty
            and pride to for our company and.
          </div>
          <div>
            <button>
              <img src="https://i.postimg.cc/zG9Q9yVw/Facebook.png"></img>
            </button>
            <button>
              <img src="https://i.postimg.cc/ydKb82hk/Instagram.png"></img>
            </button>
            <button>
              <img src="https://i.postimg.cc/xdMZY9zw/Twitter.png"></img>
            </button>
          </div>
        </div>
        <div className="secondElement">
          <div>
            <div>Pages</div>
            <ul className="list1">
              <li className="list1">
                <NavLink to="./">Home</NavLink>
              </li>
              <li>
                <NavLink to="./About">About</NavLink>
              </li>
              <li>
                <NavLink to="./Menu">Menu</NavLink>
              </li>
              <li>
                <NavLink to="./Pricing">Pricing</NavLink>
              </li>
              <li>
                <NavLink to="./Blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="./Contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="./Delivery">Delivery</NavLink>
              </li>
            </ul>
          </div>
          <div className="secondList">
            <div>Utility Pages</div>
            <ul>
              <li>
                <NavLink>Start Here</NavLink>
              </li>
              <li>
                <NavLink>Styleguide</NavLink>
              </li>
              <li>
                <NavLink>Password Protected</NavLink>
              </li>
              <li>
                <NavLink>404 Not Found</NavLink>
              </li>
              <li>
                <NavLink>Licenses</NavLink>
              </li>
              <li>
                <NavLink>Changelog</NavLink>
              </li>
              <li>
                <NavLink>View More</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="lastElement">
          <span>Follow Us On Instagram</span>
          <div>
            <img src="https://i.postimg.cc/ThMrG5Wm/Image1.png"></img>
            <img src="https://i.postimg.cc/MZj3kyCn/Image2.png"></img>
            <img src="https://i.postimg.cc/W3q8vvfB/Image3.png"></img>
            <img src="https://i.postimg.cc/7YkVpj1R/Image-4.png"></img>
          </div>
        </div>
      </div>
      <div className="Copyright">
        Copyright © 2024 Resturant. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
