import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  console.log("AUTH:", auth);

  return children;
};

export default PublicRoute;