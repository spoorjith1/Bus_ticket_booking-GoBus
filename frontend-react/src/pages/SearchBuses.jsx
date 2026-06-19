import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightArrowLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../axiosInstance';
import Schedule from '../components/Schedule';

function SearchBuses() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [schedules, setSchedules] = useState([])
  const [schedulesNextPage, setSchedulesNextPage] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSwap = ()=> {
    setSource(destination)
    setDestination(source)
  }

  useEffect(()=> {
    const fetchSchedules = async ()=> {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/schedule/list/')
        console.log(response)
        console.log(response.data)
        setSchedules(response.data.results)
        setSchedulesNextPage(response.data.next)
      }
      catch (error) { setError('Failed to load schedules') }
      finally {
        setLoading(false)
      }
    }
    fetchSchedules()
  }, [])

  const LoadMoreSchedules = async ()=> {
    if (!schedulesNextPage) return
    try {
      const response = await axiosInstance.get(schedulesNextPage)
      setSchedules((prevSchedules)=> {
        const newSchedules = response.data.results.filter(
          (newSchedule) => !prevSchedules.some((prevSchedule)=> prevSchedule.id === newSchedule.id)
        )
        return [...prevSchedules, ...newSchedules]
      })
      setSchedulesNextPage(response.data.next)
    }
    catch (error) { setError('Failed to load more schedules') }
  }


  if (loading) {
    return (
      <div className='page-container'>Loading...</div>
    )
  }

  return (
    <div className='page-container search-page'>

      <div className='search-navbar'>
        <Link to='/' className='back-arrow'><FontAwesomeIcon icon={faArrowLeft} /></Link>
        <div className='navbar-inside'>
          <h1 className='navbar-title'>Go Bus</h1>
          <div className='search-box'>
            <div className='inputs-box'>
              <div className='input-in-box'>
                <label className='input-labels'>Source</label>
                <input type='text' placeholder='From' className='input-fields' value={source} onChange={(e)=> setSource(e.target.value)} />
              </div>
              <button className='search-swap-btn' onClick={handleSwap}><FontAwesomeIcon icon={faArrowRightArrowLeft} /></button>
              <div className='input-in-box'>
                <label className='input-labels'>Destination</label>
                <input type='text' placeholder='To' className='input-fields' value={destination} onChange={(e)=> setDestination(e.target.value)} />
              </div>
              <div className='input-in-box'>
                <label className='input-labels'>Date</label>
                <input type='date' className='input-fields' />
              </div>
            </div>
            <button className='search-btn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
          <Link to='/' className='navbar-profile-link'><FontAwesomeIcon icon={faUser} /></Link>
        </div>
      </div>

      <div className='all-schedules'>
        <h1>Schedules</h1>
        <div className='schedules-container'>
          {schedules.map((schedule)=> (
            <Schedule key={schedule.id} schedule={schedule} />
          ))}
        </div>

        {schedulesNextPage && (
          <div><button onClick={LoadMoreSchedules}>Load More</button></div>
        )}
      </div>
      
    </div>
  )
}

export default SearchBuses
