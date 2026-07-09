import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

function BookingDetails() {
  const { bookingID } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBooking = async () => {
    setLoading(true)
    try {
        const response = await axiosInstance.get(`/bookings/detail/${bookingID}/`)
        setBooking(response.data)
        setError('')
    }
    catch (error) {
        setError('Failed to load booking')
    }
    finally {
        setLoading(false)
    }
  }

  useEffect(()=> {
    fetchBooking();
  }, [bookingID])

  if (loading) {
    return <div className='page-container'>Loading...</div>
  }

  if (error) {
    return <div className='page-container'>{error}</div>
  }

  if (!booking) {
    return <div className='page-container'>Loading booking...</div>
  }

  return (
    <div className='page-container'>
        {booking.source}
    </div>
  )
}

export default BookingDetails
