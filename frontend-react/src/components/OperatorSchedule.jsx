import React from 'react'
import { Link } from 'react-router-dom'

function OperatorSchedule({ schedule, fetchSchedules }) {
  return (
    <div className='opmp-list-box'>
      <div>
        <div className='opmp-sch-box-top'>
          <h3 className='opmp-sch-box-name'>{schedule.bus_name}</h3>
          <p className='opmp-sch-box-route'>{schedule.source} to {schedule.destination}&nbsp; | &nbsp;{schedule.distance} Km</p>
        </div>
        <div className='opmp-sch-box-mid'>
          <p className='opmp-sch-box-time'>
            <span className='opmp-shc-box-time-span'>Departure</span> {new Date(schedule.departure_datetime).toLocaleString()}
          </p>
          <p className='opmp-sch-box-time'>
            <span className='opmp-shc-box-time-span'>Arrival</span> {new Date(schedule.arrival_datetime).toLocaleString()}
          </p>
        </div>
        <p className='opmp-sch-box-fare'>Fare Amount : <span className='opmp-sch-box-fare-span'>{schedule.fare}</span></p>
        <Link to={`/operator/schedules/${schedule.id}`} className='opmp-sch-box-link'>Open details</Link>
      </div>
    </div>
  )
}

export default OperatorSchedule
