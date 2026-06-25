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
import Profile from './pages/Profile'
import Navbar from './components/Navbar';
import HelpAndContact from './pages/HelpAndContact'


function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
      <Route path='/search-buses' element={<PublicRoute><SearchBuses /></PublicRoute>} />
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/help-contact' element={<PublicRoute><HelpAndContact /></PublicRoute>} />
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
