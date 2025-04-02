import React, { createContext, useState, useEffect } from 'react';
import { authPassword } from '../password';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated via localStorage
    const authStatus = localStorage.getItem('packagetracker');
    if (authStatus === 'token') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    if (password === authPassword.password) {
      const storageItem = {
        value: 'token',
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
      };

      localStorage.setItem('packagetracker', JSON.stringify(storageItem));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('packagetracker');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
