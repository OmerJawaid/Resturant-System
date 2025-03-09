import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import "./Admin.css";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    salesTrend: {},
    customerDemographics: {},
    productPerformance: {},
    orderAnalytics: {}
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // In a real application, you would fetch this data from your backend
      // For now, we'll use mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data based on selected time range
      const salesTrendData = generateSalesTrendData();
      const demographicsData = generateDemographicsData();
      const productData = generateProductPerformanceData();
      const orderData = generateOrderAnalyticsData();
      
      setAnalyticsData({
        salesTrend: salesTrendData,
        customerDemographics: demographicsData,
        productPerformance: productData,
        orderAnalytics: orderData
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };

  const generateSalesTrendData = () => {
    // Generate different data based on time range
    const labels = timeRange === "weekly" 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : timeRange === "monthly" 
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['2018', '2019', '2020', '2021', '2022', '2023'];
    
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: labels.map(() => Math.floor(Math.random() * 10000) + 1000),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Orders',
          data: labels.map(() => Math.floor(Math.random() * 100) + 10),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    };
  };

  const generateDemographicsData = () => {
    return {
      labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
      datasets: [
        {
          label: 'Customer Age Groups',
          data: [15, 35, 25, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const generateProductPerformanceData = () => {
    return {
      labels: ['Burgers', 'Pizza', 'Salads', 'Desserts', 'Beverages'],
      datasets: [
        {
          label: 'Sales by Category',
          data: [30, 25, 15, 10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const generateOrderAnalyticsData = () => {
    return {
      labels: ['Completed', 'Processing', 'Cancelled'],
      datasets: [
        {
          label: 'Order Status',
          data: [70, 25, 5],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="admin-analytics-container">
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <div className="time-range-selector">
            <label>Time Range:</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-range-select"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading analytics data...</div>
        ) : (
          <div className="analytics-grid">
            <div className="analytics-card sales-trend">
              <h2>Sales Trend</h2>
              <Line 
                data={analyticsData.salesTrend} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Sales Trend` }
                  }
                }} 
              />
            </div>

            <div className="analytics-card customer-demographics">
              <h2>Customer Demographics</h2>
              <Pie 
                data={analyticsData.customerDemographics}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Customer Age Groups' }
                  }
                }}
              />
            </div>

            <div className="analytics-card product-performance">
              <h2>Product Performance</h2>
              <Bar 
                data={analyticsData.productPerformance}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Sales by Category' }
                  }
                }}
              />
            </div>

            <div className="analytics-card order-analytics">
              <h2>Order Analytics</h2>
              <Pie 
                data={analyticsData.orderAnalytics}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'right' },
                    title: { display: true, text: 'Order Status Distribution' }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Analytics; 