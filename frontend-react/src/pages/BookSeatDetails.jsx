import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../styles/BookingProcess.css';
import SeatGrid from '../components/SeatGrid';
import { faArrowRight, faBus, faBuilding, faCalendarDays, faClock, faRoad, faCouch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BookSeatDetails() {
    const { scheduleID } = useParams();
    const navigate = useNavigate();
    const [scheduleDetails, setScheduleDetails] = useState(null)
    const [scheduleLoading, setScheduleLoading] = useState(false)
    const [scheduleError, setScheduleError] = useState('')
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])
    const [seatsLoading, setSeatsLoading] = useState(false)
    const [seatsError, setSeatsError] = useState('')
    const [continueLoading, setContinueLoading] = useState(false)

    const fetchBusDetails = async () => {
        setScheduleLoading(true)
        try{
            const response = await axiosInstance.get(`/schedule/${scheduleID}/details/`);
            setScheduleDetails(response.data)
        }
        catch{
            setScheduleError('Failed to load schedule')
        }
        finally{
            setScheduleLoading(false);
        }
    }

    const fetchSeats = async () => {
        setSeatsLoading(true);
        try{
            const response = await axiosInstance.get(`/schedules/${scheduleID}/seats/`);
            setSeats(response.data);
        }
        catch{
            setSeatsError('Failed to fetch seats')
        }
        finally{
            setSeatsLoading(false)
        }
    }

    const toggleSeat = (seat)=>{
        if(seat.is_booked) return;
        const exists = selectedSeats.some(s=>s.id===seat.id);
        if(exists){
            setSelectedSeats(selectedSeats.filter(s=>s.id!==seat.id))
        }
        else{
            setSelectedSeats([...selectedSeats,seat]);
        }
    };

    const handleContinue = async ()=> {
        setContinueLoading(true)
        try {
            const response = await axiosInstance.post('/bookings/summary/', {
                schedule: scheduleDetails.id, seat_ids: selectedSeats.map(seat => seat.id)
            })
            navigate('/booking-summary', { state: {
                summary: response.data, scheduleID: scheduleDetails.id, seatIDs: selectedSeats.map(seat => seat.id)
            }})
        }
        catch (error) {
            alert(error.response?.data?.error || 'Failed')
        }
        finally {
            setContinueLoading(false)
        }
    }


    useEffect(()=>{
        fetchBusDetails();
        fetchSeats();
    },[scheduleID])



    if(scheduleLoading) return <p>Loading...</p>;
    if(scheduleError) return <p>{scheduleError}</p>;
    if(!scheduleDetails) return null;
    if(seatsLoading) return <p>Loading seats...</p>;
    if(seatsError) return <p>{seatsError}</p>;

    return (
        <div className="page-container book-details-page">
            <div className="bdp-container">
                <div className="bdp-header">
                    <div>
                        <h2 className="bdp-bus-name">
                            {scheduleDetails.bus_name}
                            <span className="bdp-bus-number">
                                {scheduleDetails.bus_number}
                            </span>
                        </h2>
                    </div>

                    <div className="bdp-company">
                        <FontAwesomeIcon icon={faBuilding}/>
                        <span>{scheduleDetails.bus_operator}</span>
                    </div>
                </div>

                <div className="bdp-route-box">
                    <div>
                        <h2>{scheduleDetails.source}</h2>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="bdp-route-icon"/>
                    <div>
                        <h2>{scheduleDetails.destination}</h2>
                    </div>
                </div>

                <div className="bdp-details-grid">
                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        <div>
                            <small>Departure</small>
                            <p>{new Date(scheduleDetails.departure_datetime).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faClock}/>
                        <div>
                            <small>Duration</small>
                            <p>{scheduleDetails.total_duration}</p>
                        </div>
                    </div>

                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        <div>
                            <small>Arrival</small>
                            <p>{new Date(scheduleDetails.arrival_datetime).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faRoad}/>
                        <div>
                            <small>Distance</small>
                            <p>{scheduleDetails.distance} Km</p>
                        </div>
                    </div>

                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faBus}/>
                        <div>
                            <small>Bus Type</small>
                            <p>{scheduleDetails.bus_type}</p>
                        </div>
                    </div>

                    <div className="bdp-detail-card">
                        <FontAwesomeIcon icon={faCouch}/>
                        <div>
                            <small>Available</small> <p>{scheduleDetails.available_seats}</p>
                        </div>
                    </div>
                </div>

                <div className="bdps-container">
                  <h2 className="bdps-title">Select Your Seats</h2>
                  <div className="seat-legend">
                    <div><span className="legend-box available"></span>Available</div>
                    <div><span className="legend-box selected"></span>Selected</div>
                    <div><span className="legend-box booked"></span>Booked</div>
                  </div>
                  <SeatGrid seats={seats} selectedSeats={selectedSeats} toggleSeat={toggleSeat} />
                  <div className="selected-seat-box">
                    <strong>Selected Seats ({selectedSeats.length})</strong>
                    <p>{selectedSeats.length===0 ? 'No seats selected' : selectedSeats.map(seat=>seat.seat_number).join(', ') }</p>
                  </div>
                  {continueLoading ? (
                    <button className="bdps-continue-btn" disabled={continueLoading || selectedSeats.length===0} onClick={handleContinue}>
                        Please Wait...
                    </button>
                  ) : (
                    <button className="bdps-continue-btn" disabled={selectedSeats.length===0} onClick={handleContinue}>
                        Continue Booking
                    </button>
                  )}
                </div>
            </div>
        </div>
    );

}

export default BookSeatDetails;