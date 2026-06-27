import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ProfileEdit() {
  return (
    <div className='page-container'>
      <Link to='/customer/dashboard' className='back-arrow'><FontAwesomeIcon icon={faArrowLeft} /></Link>
      Edit Profile
    </div>
  )
}

export default ProfileEdit