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


function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
      <Route path='/searchbuses' element={<PublicRoute><SearchBuses /></PublicRoute>} />
      <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
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
