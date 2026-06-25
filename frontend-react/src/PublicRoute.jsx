import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PublicRoute = ({ children }) => {
  const { isLoggedIn, role } = useContext(AuthContext);

  if (!isLoggedIn) {
    return children;
  }
  if (role === 'customer') {
    return <Navigate to="/customer/dashboard" replace />;
  }
  if (role === 'operator') {
    return <Navigate to="/operator/dashboard" replace />;
  }
  if (role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/" replace />;
};

export default PublicRoute;