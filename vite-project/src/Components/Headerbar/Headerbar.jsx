import React from "react";
import "./Headerbar.css";

const Headerbar = (props) => {
  return (
    <div className="Headerbar">
      <div className="Phone">
        <img
          src="https://i.postimg.cc/rw74BKLz/phone.png"
          alt="phone"
          style={{ height: 18, width: 18 }}
        ></img>
        <label className="PhoneLabel">{props.phone}</label>
      </div>
      <div className="Email">
        <img
          src="https://i.postimg.cc/bv3hG2Nw/mail.png"
          alt="email"
          style={{ height: 18, width: 18 }}
        ></img>
        <label className="EmailLabel">{props.email}</label>
      </div>
      <div className="SocialLinks">
        <a href="www.google.com">
          <img
            src="https://i.postimg.cc/1tVVJSdw/twitter-1.png"
            className="socialimg"
            href={props.twitter}
            alt="twitter"
          ></img>
        </a>
        <a href="www.google.com">
          <img
            src="https://i.postimg.cc/zGphf0Wb/facebook-2.png"
            className="socialimg"
            href={props.facebook}
            alt="facebook"
          ></img>
        </a>
        <a href="www.google.com">
          <img
            src="https://i.postimg.cc/FFJ0xbt8/instagram-3.png"
            className="socialimg"
            href={props.instagram}
            alt="instagram"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default Headerbar;
