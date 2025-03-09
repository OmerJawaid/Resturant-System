import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      try {
        const authResponse = await axios.get('http://localhost:8081/authentication', { withCredentials: true });
        setIsAuthenticated(authResponse.data.Authenticate);
        
        if (authResponse.data.Authenticate) {
          const userDataResponse = await axios.get('http://localhost:8081/getuserdata', { withCredentials: true });
          setUserData(userDataResponse.data);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8081/login', { Email: email, Password: password }, { withCredentials: true });
      setIsAuthenticated(true);
      
      // Fetch user data after successful login
      const userDataResponse = await axios.get('http://localhost:8081/getuserdata', { withCredentials: true });
      setUserData(userDataResponse.data);
      
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8081/destroy', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserData(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: error.response?.data?.message || 'Logout failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8081/registeruser', userData);
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userData, 
      loading,
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 