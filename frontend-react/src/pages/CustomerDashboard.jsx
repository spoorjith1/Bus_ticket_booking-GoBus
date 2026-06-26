import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../axiosInstance'
import '../styles/CustomerProfile.css'
import { Link } from 'react-router-dom'

function CustomerDashboard() {
  const [userProfile, setUserProfile] = useState(null)
  const [bookings, setBookings] = useState([])
  const [ProfileLoading, setProfileLoading] = useState(false)
  const [BookingsLoading, setBookingsLoading] = useState(false)
  const [coinsLoading, setCoinsLoading] = useState(false)
  const [ProfileError, setProfileError] = useState('')
  const [BookingErrors, setBookingErrors] = useState('')
  const [coinsError, setCoinsError] = useState('')
  const [showAddCoins, setShowAddCoins] = useState(false)
  const [coins, setCoins] = useState('')

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

  const fetchUserBookings = async ()=> {
    setBookingsLoading(true)
    try {
      const response = await axiosInstance.get('/bookings/my/list/')
      setBookings(response.data)
    }
    catch (error) {
      setBookingErrors('Failed to Bookings')
    }
    finally {
      setBookingsLoading(false)
    }
  }

  const addCoinsToWallet = async ()=> {
    setCoinsLoading(true)
    try {
      await axiosInstance.patch('/wallet/add/coins/', {'amount': coins})
      setShowAddCoins(false);
      setCoins('');
      fetchUserProfile();
    }
    catch (error) {
      if (error.response?.data?.amount) {
        setCoinsError(error.response.data.amount[0]);
      }
      else {
        setCoinsError('Something went wrong');
      }
      setTimeout(()=> {setCoinsError('')}, 4000)
    }
    finally {
      setCoinsLoading(false)
    }
  }

  const cancelAddCoins = ()=> {
    setShowAddCoins(false);
    setCoins('');
  }

  useEffect(()=> {
    fetchUserProfile();
    fetchUserBookings();
  }, [])

  if (ProfileLoading) {
    return <div className='page-container'>Loading...</div>;
  }

  return (
  <div className='page-container profile-page'>
    <h2 className='profile-title'>Users Profile</h2>
    {ProfileError && <div>{ProfileError}</div>}
    {userProfile && (
      <div className='user-data-container'>
        <div className='user-data-box'>
          <img src={userProfile.profile_pic} className='user-profile-pic' />
          <div className='user-names'>
            <h2 className='user-username'>{userProfile.username}</h2>
            <p className='user-fullname'>{userProfile.first_name} {userProfile.last_name}</p>
          </div>
        </div>
        <div className='user-wallet-box'>
          <p className='user-wallet-balance'>{userProfile.wallet_balance} 🪙</p>
          {!showAddCoins ? 
          (<button onClick={() => setShowAddCoins(true)} className='user-add-more-btn'>Add More</button>) : 
          (
            <div className='add-coins-box'>
              <input type='number' value={coins} onChange={(e) => setCoins(e.target.value)} placeholder='Coins' className='add-more-input'/>
              {coinsError && <p className='coins-error'>{coinsError}</p>}
              <div className='add-btn-box'>
                {coinsLoading ? (
                  <button className='add-btn' disabled>Adding...</button>
                ) : (
                  <button onClick={addCoinsToWallet} className='add-btn'>Add</button>
                )}
                <button onClick={cancelAddCoins} className='add-cancel-btn'>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

{/*
  {BookingsError && <div>{BookingsError}</div>}
    {BookingsLoading ? (
      <p>Loading bookings...</p>
    ) : bookings.length === 0 ? (
      <p>No bookings found.</p>
    ) : (
      bookings.map((booking) => (
        <div key={booking.id}>
          <p>{booking.bus_name}</p>
          <p>{booking.bus_number}</p>
          <p>{booking.source} → {booking.destination}</p>
          <p>{booking.distance}</p>
          <p>{booking.seat_numbers.join(', ')}</p>
          <p>{booking.total_amount}</p>
          <p>{booking.booked_at}</p>
        </div>
      ))
    )}*/}
  </div>
);
}

export default CustomerDashboard;