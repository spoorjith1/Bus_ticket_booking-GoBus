import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

function OperatorScheduleDetail() {
  const { scheduleID } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/operator/schedules/${scheduleID}/details/`);
      setSchedule(response.data);
      setError("");
    }
    catch (error) {
      setError("Failed to load schedule")
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, [scheduleID])
  
  if (loading) return <div className='page-container'>Loading...</div>;
  if (error) return <div className='page-container'>{error}</div>;
  return (
    <div className='page-container operator-sch-detail-page'>
      <div className='opmp-sch-detail-box'>
        <div className='sch-detail-top'>
          <h2>{schedule.source} → {schedule.destination}</h2>
          <p className='sch-detail-cname'>Company : <span className='sch-detail-cname-span'>{schedule.bus_operator}</span></p>
        </div>
        <div className='sch-detail-sec'>
          <p className='sch-detail-bus-name'>Bus Name : <span className='sch-detail-bus-name-span'>{schedule.bus_name}</span></p>
          <p className='sch-detail-number'>{schedule.bus_number}</p>
        </div>
        <div className='sch-detail-third'>
          <p><span className='opmp-shc-box-time-span'>Departure</span> {new Date(schedule.departure_datetime).toLocaleString()}</p>
          <p><span className='opmp-shc-box-time-span'>Arrival</span> {new Date(schedule.arrival_datetime).toLocaleString()}</p>
        </div>
        <p className='sch-detail-duration'><span className='sch-detail-span'>Total Duration : </span>{schedule.total_duration}</p>
        <p className='sch-detail-duration'><span className='sch-detail-span'>Distance : </span> {schedule.distance}</p>
        <div className='sch-detail-bottom'>
          <p><span className='sch-detail-span'>Bus Type : </span>{schedule.bus_type}</p>
          <p><span className='sch-detail-span'>Fare : </span>{schedule.fare}</p>
          <p><span className='sch-detail-span'>Available Seats </span>[{schedule.available_seats}]</p>
        </div>
      </div>
  </div>
  )
}

export default OperatorScheduleDetail
