import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import "./ProductPage.css";

const ProductPage = () => {
  const { ProductID } = useParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/product/${ProductID}`
        ); // Adjust backend server port

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // changeItemID(ProductID);
  }, [ProductID /*, product.ID*/]);
  // const [ItemID, changeItemID] = useState();
  const AddToCart = async (e) => {
    e.preventDefault();
    console.log(product);
    const ItemID = product.ID;
    await axios.post("http://localhost:8081/cartitemdata/", { ItemID });
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching

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
      <iframe
      //  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1704421.0588515978!2d73.36273471334496!3d33.450677410701395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfe9b4e8f54775%3A0xa3002f9286d049ff!2sSt%2015%2C%20Bahria%20Enclave%20Sector%20C%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1731065121228!5m2!1sen!2s"
      //  width="600"
      //  height="450"
      //  style={{ border: "0" }}
      //  allowfullscreen=""
      //  loading="lazy"
      //  referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div>
        {error ? (
          <p>Error: {error}</p> // Display error message if there is an error
        ) : product ? (
          <div className="productpage">
            <div>
              <img
                src={product.Mainimage}
                style={{ borderRadius: "1.5vw", width: "35vw" }}
              ></img>
              <div className="Details">
                <p>Product ID: {product.ID}</p>
                <h6>{product.Name}</h6>

                <p>Price: {product.Price}</p>
                <p>Category: {product.Category}</p>
                <button onClick={AddToCart}>Add to Cart</button>
              </div>
            </div>
            <p>Product Description: {product.Description}</p>
          </div>
        ) : (
          <p>No product found</p> // Show this if no product is returned
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
