import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const checkAdminAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (token) {
          const response = await axios.get("http://localhost:8081/admin/verify", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.valid) {
            navigate("/admin/dashboard");
          }
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
      }
    };

    checkAdminAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8081/admin/login", {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminName", response.data.name);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Restaurant Admin</h1>
          <p>Login to manage your restaurant</p>
        </div>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 