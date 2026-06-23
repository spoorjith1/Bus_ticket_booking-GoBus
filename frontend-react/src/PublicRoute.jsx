import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  return children;
};

export default PublicRoute;