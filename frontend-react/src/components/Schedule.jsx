import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../styles/SearchBuses.css'
import { useNavigate } from 'react-router-dom'

function Schedule({ schedule }) {
  const navigate = useNavigate()

  return (
    <div className='bsc-sch-box'>
      <div className='bsc-sch-in'>
        <div>
          <h3 className='bsc-sch-op-name'>{schedule.bus_operator}</h3>
          <p><span className='bsc-sch-span'>Bus Name : </span>{schedule.bus_name}</p>
          <p><span className='bsc-sch-span'>Bus Number : </span>{schedule.bus_number}</p>
          <p className='bsc-bus-type'><span className='bsc-sch-span'>Bus Type : </span><span className='bsc-sch-bus-type'>{schedule.bus_type}</span></p>
        </div>

        <div className='bsc-sch-route-info'>
          <div className='bsc-route-info-in'>
            <p className='bsc-sch-route'>{schedule.source}</p>
            <p className='bsc-sch-datetime'>{new Date(schedule.departure_datetime).toLocaleString()}</p>
          </div>
          <div className='bsc-route-info-in bsc-route-in-mid'>
            <FontAwesomeIcon icon={faArrowRight} className='bsc-sch-right-arrow' />
            <div>
              <p className='bsc-duration'>{schedule.total_duration}</p>
              <p className='bsc-distance'>{schedule.distance}Km</p>
            </div>
          </div>
          <div className='bsc-route-info-in'>
            <p className='bsc-sch-route'>{schedule.destination}</p>
            <p className='bsc-sch-datetime'>{new Date(schedule.arrival_datetime).toLocaleString()}</p>
          </div>
        </div>

        <div className='bsc-in-sec-last'>
          <p className='bsc-sec-last-date'>{new Date(schedule.departure_datetime).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            timeZone: 'UTC'
          })}</p>
          <div>
            <p className='bsc-fare'>₹{schedule.fare}</p>
            <p className='bsc-per-seat'>Per Person</p>
          </div>
        </div>

        <div className='bsc-sch-last'>
          <button className='bsc-book-now-btn' onClick={()=> navigate(`/book/ticket/details/${schedule.id}`)}>Book Now</button>
          <p className='bsc-seats'>{schedule.available_seats} seats available</p>
        </div>
      </div>
    </div>
  )
}

export default Schedule
