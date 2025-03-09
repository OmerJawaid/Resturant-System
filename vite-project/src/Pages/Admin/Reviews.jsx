import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8081/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Use sample data if API fails
      const sampleReviews = [
        {
          _id: "1",
          productId: 1,
          userId: "john@example.com",
          userName: "John Doe",
          rating: 5,
          comment: "Absolutely delicious! The flavors were perfectly balanced and the portion size was generous.",
          createdAt: "2023-10-15T14:48:00.000Z"
        },
        {
          _id: "2",
          productId: 2,
          userId: "jane@example.com",
          userName: "Jane Smith",
          rating: 4,
          comment: "Very tasty and fresh. Would definitely order again!",
          createdAt: "2023-09-22T09:30:00.000Z"
        },
        {
          _id: "3",
          productId: 3,
          userId: "mike@example.com",
          userName: "Mike Johnson",
          rating: 5,
          comment: "One of the best dishes I've had in a long time. Highly recommended!",
          createdAt: "2023-08-05T18:15:00.000Z"
        },
        {
          _id: "4",
          productId: 1,
          userId: "sarah@example.com",
          userName: "Sarah Williams",
          rating: 3,
          comment: "Good, but not great. The food was a bit cold when it arrived.",
          createdAt: "2023-10-10T12:30:00.000Z"
        },
        {
          _id: "5",
          productId: 4,
          userId: "david@example.com",
          userName: "David Brown",
          rating: 2,
          comment: "Disappointed with the quality. Not worth the price.",
          createdAt: "2023-10-08T16:45:00.000Z"
        }
      ];
      setReviews(sampleReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:8081/admin/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(reviews.filter(review => review._id !== reviewId));
      } catch (error) {
        console.error("Error deleting review:", error);
        // For demo, just remove from state
        setReviews(reviews.filter(review => review._id !== reviewId));
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === "All" || review.rating === parseInt(filterRating);
    return matchesSearch && matchesRating;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Reviews Management</h2>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search reviews..."
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div>
            <span className="text-gray-600">Total: {filteredReviews.length} reviews</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.productId}</td>
                  <td>
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-sm text-gray-600">{review.userId}</div>
                    </div>
                  </td>
                  <td>{renderStars(review.rating)}</td>
                  <td className="max-w-xs truncate">{review.comment}</td>
                  <td>{formatDate(review.createdAt)}</td>
                  <td className="admin-table-actions">
                    <button 
                      className="admin-button admin-button-danger"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Reviews; 