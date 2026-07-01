import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [ProfileLoading, setProfileLoading] = useState(false)
  const [ProfileError, setProfileError] = useState('')

  const fetchUserProfile = async ()=> {
    setProfileLoading(true)
    try {
      const response = await axiosInstance.get('/profile/me/')
      setUserProfile(response.data)
    }
    catch (error) {
      setProfileError('Failed to load profile data')
    }
    finally {
      setProfileLoading(false)
    }
  }

  useEffect(()=> {
    fetchUserProfile();
  }, [])

  if (ProfileLoading) {
    return <div className='page-container'>Loading...</div>;
  }

  return (
    <div className='page-container'>
      <Logout />
      <h2>Admin Dashboard</h2>
      {ProfileError && <div>{ProfileError}</div>}
      {userProfile && (
        <div>
          <img src={userProfile.profile_pic} className='user-profile-pic' />
          <h3>{userProfile.username}</h3>
          <p>{userProfile.first_name} {userProfile.last_name}</p>
        </div>
      )}
      <hr />
      <Link to='/admin/routes-management'>Manage Routes</Link><br />
      <Link to='/admin/operators-management'>Manage operators</Link>
    </div>
  )
}

export default AdminDashboard
