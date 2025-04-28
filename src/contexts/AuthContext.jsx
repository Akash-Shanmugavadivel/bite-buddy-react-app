
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check if user is stored in localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  // Mock login function - in a real app, this would call an API
  const login = (email, password) => {
    // Simple validation
    if (email && password) {
      // Just for demo - create a mock user object
      const mockUser = {
        id: '123',
        name: 'Akash S',
        email: email,
        phone: '9876543210',
        address: 'DCL LAB 2nd floor, GJ park building, Department of Computer Science, MIT Chromepet',
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };
  
  const signup = (name, email, password) => {
    // Simple validation
    if (name && email && password) {
      const mockUser = {
        id: '123',
        name: name,
        email: email,
        phone: '',
        address: ''
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const updateUserProfile = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      signup, 
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
