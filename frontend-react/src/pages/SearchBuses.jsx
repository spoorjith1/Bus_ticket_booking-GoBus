import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faCalendarDays, faL, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBuses.css'
import axiosInstance from '../axiosInstance'
import Schedule from '../components/Schedule'

function SearchBuses() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [journeyDate, setJourneyDate] = useState('')
  const [schedules, setSchdeules] = useState([])
  const [schedulesError, setSchedulesError] = useState('')
  const [schedulesLoading, setSchedulesLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 15)
  const lastDate = maxDate.toISOString().split('T')[0]

  const reverseRoute = ()=> {
    setSource(destination)
    setDestination(source)
  }

  const fetchSchedules = async ()=> {
    setSchedulesLoading(true)
    try {
      const response = await axiosInstance.get('/schedule/list/')
      setSchdeules(response.data)
    }
    catch (error) {
      setSchdeulesError('Failed to load schedules')
    }
    finally {
      setSchedulesLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get('/schedules/search/', {
        params: {
          'source': source,
          'destination': destination,
          'journey_date': journeyDate
        },
      })
      setSchdeules(response.data)
    }
    catch (error) {
      setSchedulesError('Failed to ')
    }
  }

  useEffect(()=> {
    fetchSchedules();
  }, [])

  return (
    <div className='page-container search-buses-page'>
      <div className='bsbar-floating-container'>
        <div className='bsbar-box'>

          <div className='bsbar-route-box'>
            <div className='bsbar-input-box'>
              <FontAwesomeIcon icon={faLocationDot} className='bsbar-input-icons' />
              <div className='bsbar-input-box-in'>
                <label className='bsbar-input-labels'>From</label>
                <input type='text' className='bsbar-input-fields' value={source} onChange={(e)=> setSource(e.target.value)} />
              </div>
            </div>

            <button className='bsbar-arrows-btn' onClick={()=> reverseRoute()}><FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>

            <div className='bsbar-input-box'>
              <FontAwesomeIcon icon={faLocationDot} className='bsbar-input-icons' />
              <div className='bsbar-input-box-in'>
                <label className='bsbar-input-labels'>To</label>
                <input type='text' className='bsbar-input-fields' value={destination} onChange={(e)=> setDestination(e.target.value)} />
              </div>
            </div>
          </div>
          
          <div className='bsbar-input-box'>
            <FontAwesomeIcon icon={faCalendarDays} className='bsbar-input-icons' />
            <div className='bsbar-input-box-in'>
              <label className='bsbar-input-labels'>Date</label>
              <input type='date' className='bsbar-input-fields bsbar-input-date' min={today} max={lastDate} 
              value={journeyDate} onChange={(e)=> setJourneyDate(e.target.value)} />
            </div>
          </div>
          
          <button className='bsbar-search-btn' onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='bsbar-search-icon' /> Search Buses
          </button>
        </div>
      </div>

      <div>
        {schedules.length === 0 ? (
          <div className='bs-no-buses-msg'>"No buses available."</div>
        ) : (
          <div className='bs-grid-container'>
            {schedules.map((schedule)=> (
              <Schedule key={schedule.id} schedule={schedule} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBuses
