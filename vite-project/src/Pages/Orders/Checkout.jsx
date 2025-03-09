import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useCart } from "../../Components/CartContext";
import { useAuth } from "../../Components/AuthContext";
import axios from "axios";

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.ID,
          name: item.Name,
          price: item.Price,
          quantity: item.quantity
        })),
        totalAmount: getCartTotal() + 5, // Adding $5 for shipping
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        paymentMethod: formData.paymentMethod
      };

      // Send order to backend
      const response = await axios.post(
        "http://localhost:8081/orders", 
        orderData,
        { withCredentials: true }
      );
      
      // Redirect to order confirmation page
      navigate("/order-confirmation", { 
        state: { 
          orderNumber: response.data.orderNumber,
          orderDate: response.data.createdAt,
          totalAmount: response.data.totalAmount
        } 
      });
    } catch (error) {
      console.error("Error processing order:", error);
      setError("There was an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
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
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty. Please add some items before checking out.</p>
            <button
              onClick={() => navigate("/Menu")}
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
            >
              Browse Menu
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <div className="md:flex md:space-x-8">
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={`${userData?.firstname_session || ''} ${userData?.lastname_session || ''}`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData?.email_session || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600 bg-gray-100"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                          required
                        />
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-4 mt-8">Payment Information</h2>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={formData.paymentMethod === "creditCard"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Credit Card
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          PayPal
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={formData.paymentMethod === "cash"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === "creditCard" && (
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                            required={formData.paymentMethod === "creditCard"}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                            required={formData.paymentMethod === "creditCard"}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                              required={formData.paymentMethod === "creditCard"}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="XXX"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                              required={formData.paymentMethod === "creditCard"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full mt-8 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.ID} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.Name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.Price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <p>Subtotal</p>
                      <p className="font-medium">${getCartTotal().toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Shipping</p>
                      <p className="font-medium">$5.00</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <p>Total</p>
                      <p>${(getCartTotal() + 5).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout; 