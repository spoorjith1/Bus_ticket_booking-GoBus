import React from 'react'
import '../styles/BookingProcess.css'

function Seat({ seat, selected, onClick }) {
  return (
    <button
      className={`seat ${seat.is_booked ? 'booked' : ''} ${selected ? 'selected' : ''}`}
       disabled={seat.is_booked} onClick={() => onClick(seat)} title={seat.seat_number}>
      <span className="seat-number">{seat.seat_number}</span>
    </button>
  )
}

export default Seat