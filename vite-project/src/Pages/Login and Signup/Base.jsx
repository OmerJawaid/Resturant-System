import React from "react";
import "./Base.css";

const Base = () => {
  return (
    <>
      <div className="Body">
        <div className="BodyContent">
          <div className="Content">
            <h1 style={{ fontSize: "4.8vw" }}>
              We provide healthy food for your family.
            </h1>

            <p style={{ fontSize: "1.25vw" }}>
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in city&apos;s rich culinary culture, we aim to
              honor our local roots while infusing a global palate.
            </p>
            <p style={{ fontSize: "1.1.5vw" }}>
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
