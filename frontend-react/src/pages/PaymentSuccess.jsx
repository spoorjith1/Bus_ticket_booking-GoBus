import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTicket, faList, faHouse } from "@fortawesome/free-solid-svg-icons";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state;

  return (
    <div className="page-container bps-page">
      <div className="bps-card">

        <div className="bps-success-circle"><FontAwesomeIcon icon={faCircleCheck} className="bps-success-icon" /></div>
        <h1 className="bps-heading">Payment Successful</h1>
        <p className="bps-subheading">Your payment has been processed successfully.<br />Your booking has been confirmed.</p>

        <button className="bps-btn-primary" onClick={() => navigate(`/customer/bookings/${booking?.bookingID}`)}>
          <FontAwesomeIcon icon={faTicket}/>View Ticket
        </button>

        <button className="bps-btn-secondary" onClick={() => navigate("/customer/dashboard")}>
          <FontAwesomeIcon icon={faList}/>My Bookings
        </button>
        
        <button className="bps-home-btn" onClick={() => navigate("/customer/dashboard") }>
          <FontAwesomeIcon icon={faHouse}/>Back to Dashboard
        </button>

      </div>
    </div>
    );
}

export default PaymentSuccess;