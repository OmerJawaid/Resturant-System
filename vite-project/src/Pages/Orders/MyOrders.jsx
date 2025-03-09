import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useAuth } from "../../Components/AuthContext";

const MyOrders = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewData, setReviewData] = useState({
    orderId: null,
    productId: null,
    rating: 5,
    comment: "",
    showForm: false
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8081/orders", {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load your orders. Please try again later.");
      
      // For demo purposes, load sample orders if API fails
      const sampleOrders = [
        {
          _id: '123456',
          orderNumber: '123456',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Delivered',
          totalAmount: 42.50,
          items: [
            { productId: 1, name: 'Chicken Burger', quantity: 2, price: 12.99 },
            { productId: 2, name: 'French Fries', quantity: 1, price: 4.99 },
            { productId: 3, name: 'Soda', quantity: 2, price: 2.99 }
          ]
        },
        {
          _id: '789012',
          orderNumber: '789012',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Delivered',
          totalAmount: 35.75,
          items: [
            { productId: 4, name: 'Margherita Pizza', quantity: 1, price: 14.99 },
            { productId: 5, name: 'Caesar Salad', quantity: 1, price: 8.99 },
            { productId: 6, name: 'Garlic Bread', quantity: 1, price: 5.99 },
            { productId: 7, name: 'Iced Tea', quantity: 1, price: 2.99 }
          ]
        },
        {
          _id: '345678',
          orderNumber: '345678',
          createdAt: new Date().toISOString(),
          status: 'Processing',
          totalAmount: 28.97,
          items: [
            { productId: 8, name: 'Beef Steak', quantity: 1, price: 22.99 },
            { productId: 9, name: 'Mashed Potatoes', quantity: 1, price: 3.99 },
            { productId: 10, name: 'Water', quantity: 1, price: 1.99 }
          ]
        }
      ];
      setOrders(sampleOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (orderId, productId) => {
    setReviewData({
      orderId,
      productId,
      rating: 5,
      comment: "",
      showForm: true
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would send this to your backend
      await axios.post("http://localhost:8081/reviews", {
        orderId: reviewData.orderId,
        productId: reviewData.productId,
        rating: reviewData.rating,
        comment: reviewData.comment
      }, { withCredentials: true });
      
      alert("Thank you for your review!");
      setReviewData(prev => ({
        ...prev,
        showForm: false
      }));
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          
          {reviewData.showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-8 w-8 ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="4"
                      value={reviewData.comment}
                      onChange={handleReviewChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setReviewData(prev => ({ ...prev, showForm: false }))}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchOrders}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link 
                to="/Menu" 
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold">Order #{order.orderNumber}</h2>
                        <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-md font-medium mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              {order.status === 'Delivered' && (
                                <button 
                                  onClick={() => handleReviewClick(order._id, item.productId)}
                                  className="text-primary-600 hover:text-primary-700 text-sm"
                                >
                                  Write Review
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                      <p className="font-bold">Total</p>
                      <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    
                    {order.status === 'Processing' && (
                      <div className="mt-6 flex justify-end">
                        <button className="text-primary-600 hover:text-primary-700">
                          Track Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders; 