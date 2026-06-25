import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children, role }) => {
  const { isLoggedIn, role: userRole } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;