import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useCart } from "../../Components/CartContext";
import { useAuth } from "../../Components/AuthContext";
import "./Menu.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      let endpoint = "http://localhost:8081/allproductshow";
      if (activeCategory !== "all") {
        endpoint = `http://localhost:8081/${activeCategory.toLowerCase()}`;
      }
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "breakfast", name: "Breakfast" },
    { id: "maindishes", name: "Main Dishes" },
    { id: "drinks", name: "Drinks" },
    { id: "desserts", name: "Desserts" },
  ];

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      navigate('/Login', { state: { from: '/Menu' } });
      return;
    }
    
    addToCart(product);
    alert(`${product.Name} added to cart!`);
  };

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
        
        {/* Category Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link 
              to={`/Product/${product.ID}`} 
              key={product.ID}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.Mainimage}
                  alt={product.Name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 text-xl font-semibold mb-2">{product.Name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.Description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 text-lg font-bold">${product.Price}</span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                    >
                      {isAuthenticated ? 'Add to Cart' : 'Login to Add'}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
