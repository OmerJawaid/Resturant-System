import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Get admin token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin authentication required");
      }
      
      const response = await axios.get("http://localhost:8081/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin authentication required");
      }
      
      await axios.put(
        `http://localhost:8081/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Orders Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="px-4 py-2 border rounded-md w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button 
              className="admin-button admin-button-primary"
              onClick={fetchOrders}
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4">
          <span className="text-gray-600">Total: {filteredOrders.length} orders</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>
                    <div>
                      <div className="font-medium">{order.user.name}</div>
                      <div className="text-sm text-gray-600">{order.user.email}</div>
                    </div>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <button 
                      className="admin-button admin-button-secondary"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                    <select
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && currentOrder && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                Order Details - {currentOrder.orderNumber}
              </h2>
              <button 
                className="admin-modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <p><strong>Name:</strong> {currentOrder.user.name}</p>
                <p><strong>Email:</strong> {currentOrder.user.email}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                <p><strong>Order Date:</strong> {formatDate(currentOrder.createdAt)}</p>
                <p><strong>Payment Method:</strong> {currentOrder.paymentMethod}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(currentOrder.status)}`}>
                    {currentOrder.status}
                  </span>
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p>{currentOrder.shippingAddress.address}</p>
                <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.zipCode}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Item</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2">{item.name}</td>
                        <td className="text-center py-2">{item.quantity}</td>
                        <td className="text-right py-2">{formatCurrency(item.price)}</td>
                        <td className="text-right py-2">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                    <tr className="border-t">
                      <td colSpan="3" className="text-right py-2 font-semibold">Total</td>
                      <td className="text-right py-2 font-semibold">{formatCurrency(currentOrder.totalAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Update Status</h3>
                <div className="flex items-center space-x-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={currentOrder.status}
                    onChange={(e) => handleStatusChange(currentOrder._id, e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button 
                    className="admin-button admin-button-primary"
                    onClick={() => handleStatusChange(currentOrder._id, currentOrder.status)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-button admin-button-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders; 