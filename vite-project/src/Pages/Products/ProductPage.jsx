import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Correct imports for useParams
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import "./ProductPage.css";

const ProductPage = () => {
  const { ProductID } = useParams();
  const [product, setProduct] = useState(null);
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
  }, [ProductID]);

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
                <button>Add to Cart</button>
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
