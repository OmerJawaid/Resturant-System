import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useCart } from "../../Components/CartContext";

const OrderConfirmation = () => {
  const { cartItems, getCartTotal } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order details from location state or generate defaults
  const orderNumber = location.state?.orderNumber || Math.floor(100000 + Math.random() * 900000);
  const orderDate = location.state?.orderDate ? new Date(location.state.orderDate) : new Date();
  const totalAmount = location.state?.totalAmount || (getCartTotal() + 5);
  
  // Add 30 minutes for estimated delivery time
  const deliveryTime = new Date(orderDate.getTime() + 30 * 60000);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // If there's no cart items and no location state, redirect to home
  useEffect(() => {
    if (cartItems.length === 0 && !location.state) {
      navigate('/');
    }
  }, [cartItems, location.state, navigate]);
  
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
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order. Your order has been received and is now being processed.
              </p>
              
              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold">{orderNumber}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{formatDate(orderDate)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-semibold">${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : totalAmount}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold">{formatTime(deliveryTime)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <Link 
                  to="/my-orders" 
                  className="block w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  View Order Status
                </Link>
                
                <Link 
                  to="/Menu" 
                  className="block w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-md hover:bg-primary-50 transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <p className="text-sm text-gray-500">
                If you have any questions about your order, please contact our customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation; 