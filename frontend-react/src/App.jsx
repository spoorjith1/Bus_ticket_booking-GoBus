import React, { useContext } from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Home from './pages/Home'
import Footer from './components/Footer'
import SearchBuses from './pages/SearchBuses';
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar';
import HelpAndContact from './pages/HelpAndContact'
import CustomerDashboard from './pages/CustomerDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProfileEdit from './pages/ProfileEdit'
import ProfileSettings from './pages/ProfileSettings'
import AdminManageOperators from './pages/AdminManageOperators';
import AdminManageRoutes from './pages/AdminManageRoutes';
 

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search-buses' element={<SearchBuses />} />
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
      <Route path='/help-contact' element={<HelpAndContact />} />
      <Route path='/customer/dashboard' element={<PrivateRoute role='customer'><CustomerDashboard /></PrivateRoute>} />
      <Route path='/operator/dashboard' element={<PrivateRoute role='operator'><OperatorDashboard /></PrivateRoute>} />
      <Route path='/admin/dashboard' element={<PrivateRoute role='admin'><AdminDashboard /></PrivateRoute>} />
      <Route path='/profile/settings' element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
      <Route path='/profile/edit' element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
      <Route path='/admin/operators-management' element={<PrivateRoute role='admin'><AdminManageOperators /></PrivateRoute>} />
      <Route path='/admin/routes-management' element={<PrivateRoute role='admin'><AdminManageRoutes /></PrivateRoute>} />
    </Routes>
    <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
