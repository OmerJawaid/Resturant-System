import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    recentOrders: [],
    topProducts: []
  });
  const [salesPeriod, setSalesPeriod] = useState("weekly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real application, you would fetch this data from your backend
        // For now, we'll use mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockStats = {
          totalOrders: 156,
          totalRevenue: 8945.75,
          totalUsers: 87,
          totalProducts: 42,
          pendingOrders: 12,
          recentOrders: [
            { id: "ORD123456", customer: "John Doe", date: "2023-10-15", total: 78.50, status: "Delivered" },
            { id: "ORD123455", customer: "Jane Smith", date: "2023-10-14", total: 45.25, status: "Processing" },
            { id: "ORD123454", customer: "Mike Johnson", date: "2023-10-14", total: 92.00, status: "Delivered" },
            { id: "ORD123453", customer: "Sarah Williams", date: "2023-10-13", total: 34.75, status: "Shipped" },
            { id: "ORD123452", customer: "David Brown", date: "2023-10-12", total: 65.30, status: "Delivered" }
          ],
          topProducts: [
            { id: 1, name: "Chicken Burger", sales: 45, revenue: 584.55 },
            { id: 2, name: "Margherita Pizza", sales: 38, revenue: 569.62 },
            { id: 3, name: "Caesar Salad", sales: 32, revenue: 287.68 },
            { id: 4, name: "Chocolate Cake", sales: 28, revenue: 251.72 },
            { id: 5, name: "Iced Coffee", sales: 25, revenue: 99.75 }
          ]
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Generate sales data based on selected period
  const generateSalesData = () => {
    let labels = [];
    let data = [];
    
    switch (salesPeriod) {
      case "daily":
        labels = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
        data = [120, 85, 45, 210, 350, 280, 450, 380];
        break;
      case "weekly":
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        data = [750, 820, 930, 880, 1200, 1450, 1100];
        break;
      case "monthly":
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        data = [4500, 5200, 4800, 5100, 5800, 6200, 6800, 7100, 6500, 7200, 6900, 7500];
        break;
      case "yearly":
        labels = ["2018", "2019", "2020", "2021", "2022", "2023"];
        data = [45000, 52000, 48000, 61000, 72000, 85000];
        break;
      default:
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        data = [750, 820, 930, 880, 1200, 1450, 1100];
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Sales ($)',
          data,
          borderColor: '#AD343E',
          backgroundColor: 'rgba(173, 52, 62, 0.1)',
          tension: 0.4
        }
      ]
    };
  };

  // Generate category sales data
  const generateCategorySalesData = () => {
    return {
      labels: ['Breakfast', 'Main Dishes', 'Desserts', 'Drinks'],
      datasets: [
        {
          label: 'Sales by Category',
          data: [3200, 4500, 2800, 1900],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${salesPeriod.charAt(0).toUpperCase() + salesPeriod.slice(1)} Sales`,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales by Category',
      },
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Orders</div>
          <div className="admin-stat-value">{stats.totalOrders}</div>
          <div className="admin-stat-change positive">↑ 12% from last month</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Revenue</div>
          <div className="admin-stat-value">{formatCurrency(stats.totalRevenue)}</div>
          <div className="admin-stat-change positive">↑ 8% from last month</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Users</div>
          <div className="admin-stat-value">{stats.totalUsers}</div>
          <div className="admin-stat-change positive">↑ 5% from last month</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Pending Orders</div>
          <div className="admin-stat-value">{stats.pendingOrders}</div>
          <div className="admin-stat-change negative">↓ 3% from last month</div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="admin-chart-container">
        <div className="admin-chart-header">
          <h2 className="admin-chart-title">Sales Overview</h2>
          <div className="admin-chart-period">
            <button 
              className={salesPeriod === "daily" ? "active" : ""} 
              onClick={() => setSalesPeriod("daily")}
            >
              Daily
            </button>
            <button 
              className={salesPeriod === "weekly" ? "active" : ""} 
              onClick={() => setSalesPeriod("weekly")}
            >
              Weekly
            </button>
            <button 
              className={salesPeriod === "monthly" ? "active" : ""} 
              onClick={() => setSalesPeriod("monthly")}
            >
              Monthly
            </button>
            <button 
              className={salesPeriod === "yearly" ? "active" : ""} 
              onClick={() => setSalesPeriod("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        <div style={{ height: "300px" }}>
          <Line options={lineChartOptions} data={generateSalesData()} />
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Orders</h2>
            <button className="admin-button admin-button-secondary">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Sales */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Sales by Category</h2>
          </div>
          <div style={{ height: "300px" }}>
            <Bar options={barChartOptions} data={generateCategorySalesData()} />
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Top Selling Products</h2>
          <button className="admin-button admin-button-secondary">View All Products</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stats.topProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{formatCurrency(product.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 