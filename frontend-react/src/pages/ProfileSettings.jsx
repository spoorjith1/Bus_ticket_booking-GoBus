import React from 'react'
import Logout from '../components/Logout'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ProfileSettings() {
  return (
    <div className='page-container'>
      <Link to='/customer/dashboard' className='back-arrow'><FontAwesomeIcon icon={faArrowLeft} /></Link>
      Profile Settings
      <Logout />
    </div>
  )
}

export default ProfileSettings
