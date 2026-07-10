import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBus, faCalendarDays, faChair, faCircleCheck, faLocationDot, faReceipt, faTicket} from "@fortawesome/free-solid-svg-icons";

function BookingDetails() {
  const { bookingID } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/bookings/detail/${bookingID}/`);
      setBooking(response.data);
      setError("");

    }
    catch {
      setError("Failed to load booking.");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingID]);

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  if (error) {
    return <div className="page-container">{error}</div>;
  }

  if (!booking) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container cbd-page">
      <div className="cbd-ticket">
        <div className="cbd-overlay">

          <div className="cbd-top-box">
            <div className="cbd-top-img-box">
              <img src="/mybus-red.png" alt="MyBus" className="cbd-logo" />
            </div>
            <div className="cbd-ticket-title">
              <FontAwesomeIcon icon={faTicket} className="cbd-ticket-icon" />
              <span>BUS TICKET</span>
            </div>
          </div>

          <div className="cbd-sec-box">
            <div className="cbd-bus-details-box">
              <p className="cbd-bus-operator">{booking.bus_operator}</p>
              <div className="cbd-bus-details-in">
                <p>{booking.bus_name}</p>
                <p>{booking.bus_number}</p>
              </div>
            </div>
            <div className="cbd-confirm-box">
              <FontAwesomeIcon icon={faCircleCheck} className="cbd-check-icon" />
              <p>Confirmed</p>
            </div>
          </div>

          <div className="cbd-route-box">
            <h2>{booking.source}</h2>
            <FontAwesomeIcon icon={faArrowRight} className="cbd-arrow-icon" />
            <h2>{booking.destination}</h2>
          </div>

          <div className="cbd-time-box">
            <div className="cbd-time-box-in">
              <p className="cbd-muted">Departure</p>
              <p>{new Date(booking.departure_datetime).toLocaleString()}</p>
            </div>
            <div>
              <p className="cbd-muted cbd-arrival-text">Arrival</p>
              <p>{new Date(booking.arrival_datetime).toLocaleString()}</p>
            </div>
          </div>

          <div className="cbd-seats-box">
            <p className="cbd-seats">Seats : <b>{booking.seat_numbers.join(', ')}</b></p>
          </div>

          <div>
            <p><span className="cbd-muted">Distnace : </span>{booking.distance} KM</p>
          </div>

          <div className="cbd-payment-box">
            <h3>Payment Summary</h3>
            <div className="cbd-payment-row">
              <p>Fare</p>
              <p>{booking.fare_amount}</p>
            </div>
            <div className="cbd-payment-row">
              <p>Tax</p>
              <p>{booking.tax_amount}</p>
            </div>
            <div className="cbd-payment-row">
              <p>Total</p>
              <p>{booking.total_amount}</p>
            </div>
          </div>

          <div className="cbd-bottom">
            <p><span className="cbd-muted">Booking ID : </span>#{booking.id}</p>
            <p><span className="cbd-muted">Booked on : </span><i>{new Date(booking.booked_at).toLocaleString()}</i></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookingDetails;