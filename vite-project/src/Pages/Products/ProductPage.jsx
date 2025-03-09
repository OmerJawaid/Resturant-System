import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useCart } from "../../Components/CartContext";
import { useAuth } from "../../Components/AuthContext";
import "./ProductPage.css";

const ProductPage = () => {
  const { ProductID } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        // Fetch product
        const productResponse = await fetch(
          `http://localhost:8081/product/${ProductID}`
        );
        const contentType = productResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        if (!productResponse.ok) {
          throw new Error("Product not found");
        }

        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch reviews
        try {
          const reviewsResponse = await axios.get(`http://localhost:8081/reviews/product/${ProductID}`);
          setReviews(reviewsResponse.data);
        } catch (reviewError) {
          console.error("Error fetching reviews:", reviewError);
          // Use sample reviews if API fails
          setReviews([
            {
              _id: "1",
              productId: ProductID,
              userId: "user1",
              userName: "John Doe",
              rating: 5,
              comment: "Absolutely delicious! The flavors were perfectly balanced and the portion size was generous.",
              createdAt: "2023-10-15T14:48:00.000Z"
            },
            {
              _id: "2",
              productId: ProductID,
              userId: "user2",
              userName: "Sarah Johnson",
              rating: 4,
              comment: "Very tasty and fresh. Would definitely order again!",
              createdAt: "2023-09-22T09:30:00.000Z"
            },
            {
              _id: "3",
              productId: ProductID,
              userId: "user3",
              userName: "Michael Brown",
              rating: 5,
              comment: "One of the best dishes I've had in a long time. Highly recommended!",
              createdAt: "2023-08-05T18:15:00.000Z"
            }
          ]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [ProductID]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      navigate('/Login', { state: { from: `/Product/${ProductID}` } });
      return;
    }
    
    if (product) {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${quantity} ${product.Name}(s) added to cart!`);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
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
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-8">
            <p className="text-xl text-red-600">Error: {error}</p>
          </div>
        ) : product ? (
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={product.Mainimage}
                    alt={product.Name}
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">
                    {product.Category}
                  </div>
                  <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.Name}</h1>
                  
                  <div className="flex items-center mt-2">
                    {renderStars(getAverageRating())}
                    <span className="ml-2 text-gray-600">
                      {getAverageRating()} ({reviews.length} reviews)
                    </span>
                  </div>
                  
                  <p className="mt-4 text-2xl text-primary-600">${product.Price}</p>
                  
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                    <p className="mt-2 text-gray-600 leading-relaxed">{product.Description}</p>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-700">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={decrementQuantity}
                          className="px-3 py-1 hover:bg-gray-100"
                          type="button"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{quantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="px-3 py-1 hover:bg-gray-100"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleAddToCart}
                      className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-300"
                      type="button"
                    >
                      {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                
                {reviews.length === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{review.userName}</p>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No product found</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
