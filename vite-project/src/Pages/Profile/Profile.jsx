import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";
import { useAuth } from "../../Components/AuthContext";

const Profile = () => {
  const { userData } = useAuth();

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-6 mb-8">
                <div className="bg-primary-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
                  {userData?.firstname_session?.charAt(0) || "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData?.firstname_session} {userData?.lastname_session}
                  </h2>
                  <p className="text-gray-600">{userData?.username_session}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-lg">{userData?.email_session}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-lg">{userData?.phone_session || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Username</h3>
                    <p className="mt-1 text-lg">{userData?.username_session}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <Link 
                  to="/my-orders" 
                  className="block w-full text-center bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  View My Orders
                </Link>
                
                <Link 
                  to="/cart" 
                  className="block w-full text-center border border-primary-600 text-primary-600 py-3 px-6 rounded-md hover:bg-primary-50 transition-colors duration-300"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile; 