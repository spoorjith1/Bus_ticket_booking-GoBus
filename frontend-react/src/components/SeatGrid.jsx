import React from 'react';
import Seat from './Seat';
import '../styles/BookingProcess.css';

function SeatGrid({ seats, selectedSeats, toggleSeat }) {
    const sortedSeats = [...seats].sort(
        (a, b) =>
            parseInt(a.seat_number.replace(/\D/g, "")) -
            parseInt(b.seat_number.replace(/\D/g, ""))
    );
    const rows = [];
    for (let i = 0; i < sortedSeats.length; i += 4) {
        rows.push(sortedSeats.slice(i, i + 4));
    }

    return (
      <div className="bus-wrapper">
        <div className="bus-body">
          <div className="bus-seat-section">
            {rows.map((row, index) => (
              <div className="seat-row" key={index}>

                <div className="seat-pair">
                  {row[0] ? (
                    <Seat seat={row[0]} selected={selectedSeats.some(s => s.id === row[0].id)} onClick={toggleSeat} />
                    ) : (
                    <div className="seat-empty"></div>
                  )}
                  {row[1] ? (
                    <Seat seat={row[1]} selected={selectedSeats.some(s => s.id === row[1].id)} onClick={toggleSeat} />
                    ) : (
                    <div className="seat-empty"></div>
                  )}
                </div>

                <div className="bus-aisle"></div>
                
                <div className="seat-pair">
                  {row[2] ? (
                    <Seat seat={row[2]} selected={selectedSeats.some(s => s.id === row[2].id)} onClick={toggleSeat} />
                    ) : (
                    <div className="seat-empty"></div>
                  )}
                  {row[3] ? (
                    <Seat seat={row[3]} selected={selectedSeats.some(s => s.id === row[3].id)} onClick={toggleSeat} />
                      ) : (
                    <div className="seat-empty"></div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default SeatGrid;