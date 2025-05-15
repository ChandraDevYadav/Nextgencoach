import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Make a request to your backend to get user profile or verify token
        const { data } = await axios.get("/api/users/profile", {
          withCredentials: true, // send cookie if using cookie auth
        });
        setUser(data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
