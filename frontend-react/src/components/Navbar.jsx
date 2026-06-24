import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <img src='mybus-white.png' className='navbar-image' />
        <Link to='/profile'><FontAwesomeIcon icon={faCircleUser} size="2x" style={{ color: "white" }} className='navbar-user-icon' /></Link>
    </div>
  )
}

export default Navbar
