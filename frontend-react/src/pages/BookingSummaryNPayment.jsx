import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

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
    <div className='page-container'>
      <div className="summary-card">
        <h2>{summary.bus_name}</h2>
        <p>{summary.bus_number}</p>
        <p>{summary.source} → {summary.destination}</p>
        <p>Seats : {summary.seat_numbers.join(", ")}</p>
      </div>
      <div className="payment-card">
        <h2>Payment Details</h2>
        <div className="payment-row">
          <span>Fare ({summary.number_of_seats} Seats)</span>
          <span>{summary.fare_amount}</span>
        </div>
        <div className="payment-row">
          <span>GST ({summary.tax_percentage}%)</span>
          <span>{summary.tax_amount}</span>
        </div>
        <hr/>
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
  )
}

export default BookingSummaryNPayment
