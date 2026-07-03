import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../AuthProvider';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  const DashboardPath = {
    customer: '/customer/dashboard',
    operator: '/operator/dashboard',
    admin: '/admin/dashboard',
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <img src='/mybus-white.png' className='navbar-image' />

      <div className='navbar-links-box'>
        <NavLink to='/' className='nav-link-tag'>
            {({ isActive }) => isActive ? (<span className='nav-link active'>Home</span>) : (<span className='nav-link'>Home</span>) }
          </NavLink>
          <NavLink to='/search-buses' className='nav-link-tag'>
            {({ isActive }) => isActive ? (<span className='nav-link active'>Search Buses</span>) : (<span className='nav-link'>Search Buses</span>) }
          </NavLink>
          <NavLink to='/help-contact' className='nav-link-tag'>
            {({ isActive }) => isActive ? (<span className='nav-link active'>Help & Contact</span>) : (<span className='nav-link'>Help & Contact</span>) }
          </NavLink>
      </div>

      {isLoggedIn ? (
        <NavLink to={DashboardPath[user.role]} className='nav-user-navlink'>
        {({ isActive }) => isActive ? 
        (<div className='nav-user-box active'>
          <span className='nav-username'>{user.username}</span><img src={user.profile_pic} className='navbar-user-img' />
        </div>) : 
        (<div className='nav-user-box'>
          <span className='nav-username'>{user.username}</span><img src={user.profile_pic} className='navbar-user-img' />
        </div>)}
        </NavLink>
        ) : (
        <div className='nav-sign-box'>
            <NavLink to="/login" className='nav-login-btn'>Login</NavLink>/
            <NavLink to="/register" className='nav-register-btn'>Register</NavLink>
        </div>
      )}
    </div>
  );
}
export default Navbar;