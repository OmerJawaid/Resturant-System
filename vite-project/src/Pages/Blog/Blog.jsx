import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Headerbar from "../../Components/Headerbar/Headerbar";
import CustomerHeader from "../../Components/Navbar/Customer Header";

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Art of Mediterranean Cuisine",
      author: "Chef Maria Rodriguez",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      excerpt: "Discover the rich flavors and healthy ingredients that make Mediterranean cuisine one of the most beloved food traditions in the world.",
      content: "Mediterranean cuisine is renowned for its health benefits, vibrant flavors, and fresh ingredients. Originating from the countries surrounding the Mediterranean Sea, this culinary tradition emphasizes olive oil, fresh vegetables, legumes, and moderate amounts of fish and meat. The Mediterranean diet has been recognized by UNESCO as an Intangible Cultural Heritage of Humanity and is often recommended by health professionals for its numerous benefits. From Spanish paella to Greek moussaka, Italian pasta to Moroccan tagine, the diversity of Mediterranean dishes reflects the rich cultural history of the region. In this blog, we explore the key ingredients, cooking techniques, and signature dishes that define this beloved culinary tradition."
    },
    {
      id: 2,
      title: "Farm to Table: The Sustainable Food Movement",
      author: "Emma Johnson",
      date: "June 22, 2023",
      image: "https://images.unsplash.com/photo-1595351298020-7f1db2569fd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      excerpt: "How the farm-to-table movement is changing the way we eat and supporting local communities.",
      content: "The farm-to-table movement represents a significant shift in how we think about food production and consumption. By prioritizing locally sourced ingredients and direct relationships between farmers and restaurants, this approach reduces the environmental impact of food transportation while supporting local economies. Restaurants embracing the farm-to-table philosophy often feature seasonal menus that change based on what's available from nearby farms. This not only ensures fresher, more flavorful dishes but also helps preserve traditional farming practices and heirloom varieties of fruits and vegetables. As consumers become more conscious of where their food comes from, the farm-to-table movement continues to grow, fostering stronger connections between urban diners and rural producers."
    },
    {
      id: 3,
      title: "The Science of Baking Perfect Bread",
      author: "Dr. James Wilson",
      date: "July 10, 2023",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      excerpt: "Understanding the chemistry and techniques behind creating the perfect loaf of bread.",
      content: "Bread baking is both an art and a science, with success depending on understanding the complex interactions between flour, water, yeast, and salt. The process begins with fermentation, where yeast converts sugars into carbon dioxide, creating the bubbles that give bread its characteristic texture. Gluten development, achieved through kneading, provides the structure that traps these gas bubbles. Temperature and humidity play crucial roles in how dough rises and develops flavor. Even the way bread is scored before baking affects its final appearance and texture. Modern bakers are combining traditional techniques with scientific knowledge to create breads with complex flavors and perfect textures. Whether you're a novice baker or an experienced professional, understanding these principles can help you troubleshoot problems and consistently produce delicious bread."
    },
    {
      id: 4,
      title: "Exploring Street Food Around the World",
      author: "Sophia Chen",
      date: "August 5, 2023",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      excerpt: "A culinary journey through the vibrant street food scenes of different countries.",
      content: "Street food represents the heart and soul of a region's culinary identity, offering authentic flavors at accessible prices. From Thai pad thai to Mexican tacos, Indian chaat to Turkish kebabs, street food vendors around the world serve up dishes that have been perfected over generations. These culinary traditions often reflect local ingredients, historical influences, and cultural preferences. Beyond the delicious flavors, street food culture provides a unique window into everyday life in different countries. The bustling markets, the specialized cooking equipment, and the social rituals surrounding street dining all contribute to unforgettable food experiences. For travelers seeking authentic culinary adventures, exploring a city's street food scene offers both delicious meals and meaningful cultural connections."
    }
  ]);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    setSelectedBlog(null);
    window.scrollTo(0, 0);
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
        {selectedBlog ? (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBackClick}
              className="flex items-center text-primary-600 mb-6 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to all blogs
            </button>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title} 
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <span className="mr-4">By {selectedBlog.author}</span>
                  <span>{selectedBlog.date}</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed">{selectedBlog.content}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-12">Our Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => handleBlogClick(blog)}
                >
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <span className="mr-4">By {blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                    <button className="text-primary-600 font-medium hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog; 