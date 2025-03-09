import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: ""
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8081/admin/blog", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      // Use sample data if API fails
      const samplePosts = [
        {
          _id: "1",
          title: "The Art of Mediterranean Cuisine",
          author: "Chef Maria Rodriguez",
          content: "Mediterranean cuisine is renowned for its health benefits, vibrant flavors, and fresh ingredients. Originating from the countries surrounding the Mediterranean Sea, this culinary tradition emphasizes olive oil, fresh vegetables, legumes, and moderate amounts of fish and meat. The Mediterranean diet has been recognized by UNESCO as an Intangible Cultural Heritage of Humanity and is often recommended by health professionals for its numerous benefits. From Spanish paella to Greek moussaka, Italian pasta to Moroccan tagine, the diversity of Mediterranean dishes reflects the rich cultural history of the region. In this blog, we explore the key ingredients, cooking techniques, and signature dishes that define this beloved culinary tradition.",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          createdAt: "2023-05-15T14:48:00.000Z"
        },
        {
          _id: "2",
          title: "Farm to Table: The Sustainable Food Movement",
          author: "Emma Johnson",
          content: "The farm-to-table movement represents a significant shift in how we think about food production and consumption. By prioritizing locally sourced ingredients and direct relationships between farmers and restaurants, this approach reduces the environmental impact of food transportation while supporting local economies. Restaurants embracing the farm-to-table philosophy often feature seasonal menus that change based on what's available from nearby farms. This not only ensures fresher, more flavorful dishes but also helps preserve traditional farming practices and heirloom varieties of fruits and vegetables. As consumers become more conscious of where their food comes from, the farm-to-table movement continues to grow, fostering stronger connections between urban diners and rural producers.",
          image: "https://images.unsplash.com/photo-1595351298020-7f1db2569fd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          createdAt: "2023-06-22T10:30:00.000Z"
        },
        {
          _id: "3",
          title: "The Science of Baking Perfect Bread",
          author: "Dr. James Wilson",
          content: "Bread baking is both an art and a science, with success depending on understanding the complex interactions between flour, water, yeast, and salt. The process begins with fermentation, where yeast converts sugars into carbon dioxide, creating the bubbles that give bread its characteristic texture. Gluten development, achieved through kneading, provides the structure that traps these gas bubbles. Temperature and humidity play crucial roles in how dough rises and develops flavor. Even the way bread is scored before baking affects its final appearance and texture. Modern bakers are combining traditional techniques with scientific knowledge to create breads with complex flavors and perfect textures. Whether you're a novice baker or an experienced professional, understanding these principles can help you troubleshoot problems and consistently produce delicious bread.",
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
          createdAt: "2023-07-10T18:15:00.000Z"
        }
      ];
      setPosts(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPost = () => {
    setCurrentPost(null);
    setFormData({
      title: "",
      content: "",
      author: "",
      image: ""
    });
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      image: post.image
    });
    setShowModal(true);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:8081/admin/blog/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        console.error("Error deleting blog post:", error);
        // For demo, just remove from state
        setPosts(posts.filter(post => post._id !== postId));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("adminToken");
      
      if (currentPost) {
        // Update existing post
        await axios.put(
          `http://localhost:8081/admin/blog/${currentPost._id}`, 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(posts.map(post => 
          post._id === currentPost._id ? { ...post, ...formData } : post
        ));
      } else {
        // Add new post
        const response = await axios.post(
          "http://localhost:8081/admin/blog", 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts([...posts, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving blog post:", error);
      // For demo, update state anyway
      if (currentPost) {
        setPosts(posts.map(post => 
          post._id === currentPost._id ? { ...post, ...formData } : post
        ));
      } else {
        const newPost = {
          _id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        setPosts([...posts, newPost]);
      }
      setShowModal(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Blog Management</h2>
          <button 
            className="admin-button admin-button-primary"
            onClick={handleAddPost}
          >
            Add New Post
          </button>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <span className="text-gray-600">Total: {filteredPosts.length} posts</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">By {post.author}</p>
                  <p className="text-gray-500 text-sm mb-3">{formatDate(post.createdAt)}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="admin-button admin-button-secondary"
                      onClick={() => handleEditPost(post)}
                    >
                      Edit
                    </button>
                    <button 
                      className="admin-button admin-button-danger"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {currentPost ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button 
                className="admin-modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                {formData.image && (
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="admin-form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    rows="10"
                  ></textarea>
                </div>
                
                <div className="admin-form-actions">
                  <button 
                    type="button" 
                    className="admin-button admin-button-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="admin-button admin-button-primary"
                  >
                    {currentPost ? "Update Post" : "Add Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Blog; 