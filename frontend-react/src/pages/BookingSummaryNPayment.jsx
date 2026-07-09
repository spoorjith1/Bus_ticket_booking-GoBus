import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function BookingSummaryNPayment() {
  const location = useLocation()
  const summary = location.state?.summary;
  const scheduleID = location.state?.scheduleID;
  const seatIDs = location.state?.seatIDs;
  const [paymentLoading, setPaymentLoading] = useState(false)
  const navigate = useNavigate()

  const handlePayment = async ()=> {
    setPaymentLoading(true)
    try {
      const response = await axiosInstance.post('/bookings/pay/', { schedule: scheduleID, seat_ids: seatIDs });
      navigate('/customer/dashboard')
    }
    catch (error) {
      alert(error.response?.data?.error || 'Payment Failed')
    }
    finally {
      setPaymentLoading(false)
    }
  }

  if (!summary) return <h2>No booking data.</h2>
  return (
    <div className='page-container bsp-page'>
      <div className='bsp-container'>

        <div className="bsp-summary-card">
          <div className='bsp-top-box'>
            <h2 className='bsp-bus-name'>{summary.bus_name} <span className='bsp-bus-number'>{summary.bus_number}</span></h2>
            <p className='bsp-company-name'>{summary.operator_name}</p>
          </div>
          <div className='bsp-route-box'>
            <p className='bsp-route'>{summary.source}</p>
            <FontAwesomeIcon icon={faArrowRight} />
            <p className='bsp-route'>{summary.destination}</p>
          </div>
          <div className='bsp-time-box'>
            <p><span className='bsp-muted'>Departure : </span>{new Date(summary.departure_datetime).toLocaleString()}</p>
            <p><span className='bsp-muted'>Arrival : </span>{new Date(summary.arrival_datetime).toLocaleString()}</p>
          </div>
          <div className='bsp-seats-box-out'>
            <div className='bsp-seats-box'>
              <p className='bsp-seats-text'>Selected Seats : </p>
              <p className='bsp-seat-numbers'>{summary.seat_numbers.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="payment-card">
          <h2>Payment Details</h2>
          <p>Fare per seat : {summary.fare_per_seat}</p>
          <div className="payment-row">
            <span>Fare ({summary.number_of_seats} Seats)</span>
            <span>{summary.fare_amount}</span>
          </div>
          <div className="payment-row">
            <span>GST ({summary.tax_percentage}%)</span>
            <span>{summary.tax_amount}</span>
          </div>
          <div className="payment-row total">
            <span>Total Amount</span>
            <span>{summary.total_amount}</span>
          </div>
        </div>
        <div className="wallet-card">
          <h3>Wallet</h3>
          <p>Current Balance : <strong>{summary.wallet_balance} Coins</strong></p>
          <p>Balance After Payment : <strong>{summary.wallet_balance - summary.total_amount}</strong></p>
        </div>
        {paymentLoading ? (
          <button disabled>Processing Payment...</button>
          ) : (
          <button onClick={handlePayment}>Pay {summary.total_amount} Coins</button>
        )}
      </div>
    </div>
  )
}

export default BookingSummaryNPayment
