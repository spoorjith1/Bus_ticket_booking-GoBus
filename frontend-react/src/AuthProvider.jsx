import React, { useState, createContext, useEffect } from 'react';
import axiosInstance from './axiosInstance'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  useEffect(() => {
    const loadUser = async ()=> {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }
      try {
        const response = await axiosInstance.get('/profile/me/');
        setUser(response.data);
        setRole(response.data.role);
        localStorage.setItem('role', response.data.role);
        setIsLoggedIn(true);
      }
      catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null);
        setRole(null);
        localStorage.removeItem('role');
        setIsLoggedIn(false);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };