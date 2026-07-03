import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminDashboard.css'

function AdminDashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [ProfileLoading, setProfileLoading] = useState(false)
  const [ProfileError, setProfileError] = useState('')
  const navigate = useNavigate()

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
        <div className='admin-top'>
          <h2 className='admin-title'>Admin Dashboard</h2>
          <Logout />
        </div>
      <div className='admin-info-wrap'>
      {ProfileError && <div>{ProfileError}</div>}
      {userProfile && (
        <div className='admin-info'>
          <img src={userProfile.profile_pic} className='user-profile-pic' />
          <div>
            <h3 className='admin-username'>{userProfile.username}</h3>
            <p>{userProfile.first_name} {userProfile.last_name}</p>
          </div>
        </div>
      )}
      </div>
      <div className='admin-manage-links-container'>
        <div onClick={()=> navigate('/admin/routes-management')} className='admin-manage-link-box'>
          <h3 className='manage-title'>Manage Routes</h3>
        </div>
        <div onClick={()=> navigate('/admin/operators-management')} className='admin-manage-link-box'>
          <h3 className='manage-title'>Manage Operators</h3>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
