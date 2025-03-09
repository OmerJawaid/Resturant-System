import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Get admin name
    const name = localStorage.getItem("adminName");
    if (name) {
      setAdminName(name);
    }

    // Verify token
    const verifyToken = async () => {
      try {
        await axios.get("http://localhost:8081/admin/verify", {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminName");
        navigate("/admin/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/products", label: "Products", icon: "🍔" },
    { path: "/admin/orders", label: "Orders", icon: "📦" },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/reviews", label: "Reviews", icon: "⭐" },
    { path: "/admin/contacts", label: "Contact Submissions", icon: "📝" },
    { path: "/admin/blog", label: "Blog Posts", icon: "📰" },
    { path: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Restaurant Admin</h2>
        </div>
        <ul className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="admin-sidebar-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `admin-sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="admin-sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="admin-content">
        <header className="admin-header">
          <h1>{menuItems.find(item => item.path === location.pathname)?.label || "Admin Panel"}</h1>
          <div className="admin-user-menu">
            <span className="admin-user-name">Welcome, {adminName}</span>
            <button onClick={handleLogout} className="admin-logout-button">
              Logout
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 