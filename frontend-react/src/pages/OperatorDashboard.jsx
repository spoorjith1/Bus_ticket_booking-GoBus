import React, { useState, useEffect } from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import '../styles/OperatorDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faUserPen, faCircleCheck, faBusSimple, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

function OperatorDashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [ProfileLoading, setProfileLoading] = useState(false)
  const [ProfileError, setProfileError] = useState('')
  const [operatorProfile, setOperatorProfile] = useState(null)
  const [operatorLoading, setOperatorLoading] = useState(false)
  const [operatorError, setOperatorError] = useState('')
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

  const fetchOperatorProfile = async ()=> {
    setOperatorLoading(true)
    try {
      const response = await axiosInstance.get('/operator/me/profile/')
      setOperatorProfile(response.data)
    }
    catch (error) {
      setOperatorError('Failed to load profile data')
    }
    finally {
      setOperatorLoading(false)
    }
  }

  useEffect(()=> {
    fetchUserProfile();
    fetchOperatorProfile();
  }, [])

  if (ProfileLoading) {
    return <div className='page-container'>Loading...</div>;
  }

  return (
    <div className='page-container operator-page'>

      <div className='op-top'>
        <h2>Operator Dashboard</h2>
        <Logout />
      </div>

      {ProfileError && <div>{ProfileError}</div>}

      <div className='op-second-top'>
        <div className='op-second-left'>
        {operatorError && <div>{operatorError}</div>}
        {operatorProfile && (
          <>
            <div>
              <img src={`http://127.0.0.1:8000${operatorProfile.op_logo}`} className='op-logo-pic' />
            </div>
            <div>
              <p className='op-name'>{operatorProfile.op_name} <FontAwesomeIcon icon={faCircleCheck} className='op-verified-icon' /></p>
              <p className='op-username'>username : <span className='op-username-span'>{userProfile?.username}</span></p>
              <p className='op-email'>{operatorProfile.op_email}</p>
              <p className='op-numbers'>{operatorProfile.op_mobile_no1} - {operatorProfile.op_mobile_no2}</p>
            </div>
          </>
        )}
        </div>
        <div className='op-second-right'>
          <div className='op-second-right-boxes'>
            <div className='op-right-inner-box'>
              <FontAwesomeIcon icon={faGear} className='op-right-icon' />
              <div className='op-right-txt-box'>
                <h4 className='op-right-heading'>Manage Operator</h4>
                <p className='op-right-text'>Change Operator logo, name...</p>
              </div>
            </div>
          </div>
          <div className='op-second-right-boxes'>
            <div className='op-right-inner-box'>
              <FontAwesomeIcon icon={faUserPen} className='op-right-icon' />
              <div className='op-right-txt-box'>
                <h4 className='op-right-heading'>Manage operator user</h4>
                <p className='op-right-text'>Edit username, pass...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='op-manage-container'>
        <div onClick={()=> navigate('/operator/schedules-management')} className='op-manage-box'>
          <h3 className='op-manage-heading'><FontAwesomeIcon icon={faCalendarDays} className='op-manage-icons' /> Manage Schedules</h3>
          <p className='op-manage-text'>Create new schedules for buses with routes, Edit & Delete schedules.</p>
          <p className='op-manage-text'>View schedule details</p>
        </div>
        <div onClick={()=> navigate('/operator/buses-management')} className='op-manage-box'>
          <h3 className='op-manage-heading'><FontAwesomeIcon icon={faBusSimple} className='op-manage-icons' /> Manage Buses</h3>
          <p className='op-manage-text'>Add new buses, edit bus details...</p>
        </div>
      </div>

    </div>
  )
}

export default OperatorDashboard
