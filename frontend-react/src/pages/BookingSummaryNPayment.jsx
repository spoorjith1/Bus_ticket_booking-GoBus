import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMoneyBillWave, faWallet, faReceipt, faBus, faChair } from '@fortawesome/free-solid-svg-icons';

function BookingSummaryNPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const summary = location.state?.summary;
  const scheduleID = location.state?.scheduleID;
  const seatIDs = location.state?.seatIDs;
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const response = await axiosInstance.post("/bookings/pay/", { schedule: scheduleID, seat_ids: seatIDs });
      navigate("/payment-success", {state: {bookingID: response.data.booking.id}})
    }
    catch (error) {
      alert(error.response?.data?.error || "Payment Failed");
    }
    finally {
      setPaymentLoading(false);
    }
  }

  if (!summary) return <h2>No Booking Data.</h2>
  return (
    <div className="page-container bsp-page">
      <div className="bsp-container">
        <div className="bsp-summary-card">

          <div className="bsp-top-box">
            <div>
              <h2 className="bsp-bus-name">
                <FontAwesomeIcon icon={faBus} className="bsp-icon" />{summary.bus_name}
                <span className="bsp-bus-number">{summary.bus_number}</span>
              </h2>
            </div>
            <p className="bsp-company-name">{summary.operator_name}</p>
          </div>

          <div className="bsp-route-box">
            <h2>{summary.source}</h2>
            <FontAwesomeIcon icon={faArrowRight} className="bsp-route-icon" />
            <h2>{summary.destination}</h2>
          </div>

          <div className="bsp-time-box">
            <div>
              <p className="bsp-muted">Departure</p>
              <p>{new Date(summary.departure_datetime).toLocaleString()}</p>
            </div>
            <div className="bsp-arrival-box">
              <p className="bsp-muted">Arrival</p>
              <p>{new Date(summary.arrival_datetime).toLocaleString()}</p>
            </div>
          </div>

          <div className="bsp-seats-box-out">
            <div className="bsp-seats-box">
              <span className="bsp-seats-text"> Selected Seats</span>
              <span className="bsp-seat-numbers">{summary.seat_numbers.join(", ")}</span>
            </div>
          </div>

        </div>

        <div className="bsp-payment-card">
          <h2 className="bsp-payment-heading">
            <FontAwesomeIcon icon={faReceipt} className="bsp-payment-icon" />
            Payment Details
          </h2>
          
          <div className="bsp-payment-details-card">

            <div className="bsp-payment-row">
              <span>Fare Per Seat</span>
              <strong>{summary.fare_per_seat}</strong>
            </div>

            <div className="bsp-payment-row">
              <span>Fare ({summary.number_of_seats} Seats)</span>
              <strong>{summary.fare_amount}</strong>
            </div>

            <div className="bsp-payment-row">
              <span>GST ({summary.tax_percentage}%)</span>
              <strong>{summary.tax_amount}</strong>
            </div>

            <div className="bsp-payment-row bsp-total-row">
              <span>Total Amount</span>
              <strong>{summary.total_amount}</strong>
            </div>

          </div>
        </div>

        <div className="bsp-wallet-card">

          <h3><FontAwesomeIcon icon={faWallet} className="bsp-wallet-icon" />Wallet</h3>

          <div className="bsp-wallet-row">
            <span>Current Balance</span>
            <strong>{summary.wallet_balance} Coins</strong>
          </div>
                
          <div className="bsp-wallet-row">
            <span>Balance After Payment</span>
            <strong>{summary.wallet_balance - summary.total_amount} Coins</strong>
          </div>

          <div className='bsp-wallet-row'>
            <p className='bsp-wallet-text'>
              <b>NOTE : </b>
              <i>If your current balance is less than the total amount, go to your profile page and add more coins to your wallet.</i>  
            </p>
          </div>

        </div>

        <button disabled={paymentLoading} onClick={handlePayment} className="bsp-payment-btn">
          {paymentLoading ? " Processing Payment..." : ` Pay ${summary.total_amount} Coins`}
        </button>

      </div>

    </div>
    )
}

export default BookingSummaryNPayment;