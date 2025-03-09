import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    ID: "",
    Name: "",
    Description: "",
    Price: "",
    Category: "Breakfast",
    Mainimage: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/allproductshow");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Use sample data if API fails
      const sampleProducts = [
        {
          ID: 1,
          Name: "Chicken Burger",
          Description: "Juicy chicken patty with lettuce, tomato, and special sauce",
          Price: 12.99,
          Category: "MainDishes",
          Mainimage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80"
        },
        {
          ID: 2,
          Name: "Margherita Pizza",
          Description: "Classic pizza with tomato sauce, mozzarella, and basil",
          Price: 14.99,
          Category: "MainDishes",
          Mainimage: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
          ID: 3,
          Name: "Caesar Salad",
          Description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
          Price: 8.99,
          Category: "MainDishes",
          Mainimage: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
          ID: 4,
          Name: "Pancakes",
          Description: "Fluffy pancakes served with maple syrup and butter",
          Price: 7.99,
          Category: "Breakfast",
          Mainimage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
        },
        {
          ID: 5,
          Name: "Chocolate Cake",
          Description: "Rich chocolate cake with chocolate ganache",
          Price: 8.99,
          Category: "Desserts",
          Mainimage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80"
        },
        {
          ID: 6,
          Name: "Iced Coffee",
          Description: "Cold brewed coffee served over ice",
          Price: 3.99,
          Category: "Drinks",
          Mainimage: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        }
      ];
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Price" ? parseFloat(value) : value
    });
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      ID: Math.max(0, ...products.map(p => p.ID)) + 1,
      Name: "",
      Description: "",
      Price: "",
      Category: "Breakfast",
      Mainimage: ""
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      ID: product.ID,
      Name: product.Name,
      Description: product.Description,
      Price: product.Price,
      Category: product.Category,
      Mainimage: product.Mainimage
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8081/products/${productId}`);
        setProducts(products.filter(product => product.ID !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        // For demo, just remove from state
        setProducts(products.filter(product => product.ID !== productId));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentProduct) {
        // Update existing product
        await axios.put(`http://localhost:8081/products/${formData.ID}`, formData);
        setProducts(products.map(product => 
          product.ID === formData.ID ? formData : product
        ));
      } else {
        // Add new product
        await axios.post("http://localhost:8081/products", formData);
        setProducts([...products, formData]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      // For demo, update state anyway
      if (currentProduct) {
        setProducts(products.map(product => 
          product.ID === formData.ID ? formData : product
        ));
      } else {
        setProducts([...products, formData]);
      }
      setShowModal(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.Category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Products Management</h2>
          <button 
            className="admin-button admin-button-primary"
            onClick={handleAddProduct}
          >
            Add New Product
          </button>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="MainDishes">Main Dishes</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>
          <div>
            <span className="text-gray-600">Total: {filteredProducts.length} products</span>
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
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.ID}>
                  <td>{product.ID}</td>
                  <td>
                    <img 
                      src={product.Mainimage} 
                      alt={product.Name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{product.Name}</td>
                  <td>{product.Category}</td>
                  <td>{formatCurrency(product.Price)}</td>
                  <td className="admin-table-actions">
                    <button 
                      className="admin-button admin-button-secondary"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="admin-button admin-button-danger"
                      onClick={() => handleDeleteProduct(product.ID)}
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

      {/* Product Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {currentProduct ? "Edit Product" : "Add New Product"}
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
                  <label htmlFor="ID">Product ID</label>
                  <input
                    type="number"
                    id="ID"
                    name="ID"
                    value={formData.ID}
                    onChange={handleInputChange}
                    required
                    readOnly={!!currentProduct}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="Name">Product Name</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    id="Description"
                    name="Description"
                    value={formData.Description}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label htmlFor="Price">Price</label>
                    <input
                      type="number"
                      id="Price"
                      name="Price"
                      value={formData.Price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="Category">Category</label>
                    <select
                      id="Category"
                      name="Category"
                      value={formData.Category}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="MainDishes">Main Dishes</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="Mainimage">Image URL</label>
                  <input
                    type="url"
                    id="Mainimage"
                    name="Mainimage"
                    value={formData.Mainimage}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                {formData.Mainimage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                    <img 
                      src={formData.Mainimage} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
                
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
                    {currentProduct ? "Update Product" : "Add Product"}
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

export default Products; 