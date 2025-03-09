import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Base.css";
import Base from "./Base.jsx";
import Navbar from "./Navbar.jsx";
import { useAuth } from "../../Components/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to home
  const from = location.state?.from || "/";

  useEffect(() => {
    // If already authenticated and not loading, redirect
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#f9f9f7", width: "100vw", height: "100vh" }}
    >
      <Navbar />
      <div className="Body">
        <Base />
        <form className="Frame" onSubmit={handleLogin}>
          <div className="Form">
            <h4>Login</h4>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="Inputs">
              <label>Email</label>
              <input
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmailChange}
                type="email"
                required
              />
              <label>Password</label>
              <input
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                required
              />
            </div>
            <button type="submit" className="LoginButtonLoginFrame">
              Login
            </button>
            <div className="LoginFrameSpacer"></div>
            <p>
              Don't have an account? <Link to="/Signup" className="font-bold text-primary-600">Sign Up</Link>
            </p>
            {from !== "/" && (
              <p className="mt-2 text-sm text-gray-600">
                You'll be redirected back after login
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
