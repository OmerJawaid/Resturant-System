import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Headerbar from "../Components/Headerbar/Headerbar";
import CustomerHeader from "../Components/Navbar/Customer Header";
import { useCart } from "../Components/CartContext";
import { useAuth } from "../Components/AuthContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const User_Data_Server = async () => {
      try {
        const result = await axios.get("http://localhost:8081/getuserdata");
        console.log("API Response: ", result.data.Userdata);
      } catch (err) {
        console.log("Err in getting user data client side: ", err);
      }
    };
    User_Data_Server();
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/Login', { state: { from: '/checkout' } });
      return;
    }
    
    navigate('/checkout');
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link 
              to="/Menu" 
              className="bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-700"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.ID} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.Mainimage} alt={item.Name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.Name}</h3>
                    <p className="text-gray-600">${item.Price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.ID, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.ID, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-primary-600 hover:text-primary-700"
                    onClick={() => removeFromCart(item.ID)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-8 flex justify-between items-center">
              <div className="text-xl font-semibold">
                Total: ${getCartTotal().toFixed(2)}
              </div>
              <button 
                onClick={handleCheckout}
                className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
