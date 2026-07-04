import React, { useEffect, useState } from 'react'
import '../styles/OperatorDashboard.css'
import axiosInstance from '../axiosInstance'
import OperatorSchedule from '../components/OperatorSchedule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

function OperatorManageSchedules() {
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createSuccess, setCreateSuccess] = useState('')
  const [bus, setBus] = useState("")
  const [route, setRoute] = useState("")
  const [buses, setBuses] = useState([])
  const [routes, setRoutes] = useState([])
  const [departureDateTime, setDepartureDateTime] = useState('')
  const [arrivalDateTime, setArrivalDateTime] = useState('')
  const [fare, setFare] = useState('')
  const [busesLoading, setBusesLoading] = useState(false)
  const [routesLoading, setRoutesLoading] = useState(false)
  const [schedulesLoading, setSchedulesLoading] = useState(false)
  const [schedulesError, setSchedulesError] = useState('')
  const [schedulesList, setSchedulesList] = useState([])

  const fetchSchedules = async ()=> {
    setSchedulesLoading(true)
    try {
      const response = await axiosInstance.get('/operator/schedules/list/')
      setSchedulesList(response.data)
      setSchedulesError('')
    }
    catch (error) {
      setSchedulesError('Failed to load schedules')
    }
    finally {
      setSchedulesLoading(false)
    }
  }

  const fetchBuses = async ()=> {
    setBusesLoading(true);
    try {
      const response = await axiosInstance.get("/operator/buses/list/");
      setBuses(response.data);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setBusesLoading(false);
    }
  }

  const fetchRoutes = async () => {
    setRoutesLoading(true);
    try {
      const response = await axiosInstance.get("/routes/list/");
      setRoutes(response.data);
    }
    catch (error) {
      console.log(error);
    } 
    finally {
      setRoutesLoading(false);
    }
  }

  useEffect(()=> {
    fetchBuses();
    fetchRoutes();
    fetchSchedules();
  }, [])

  const handleCreateSchedule = async (e)=> {
    e.preventDefault();
    setCreateLoading(true)
    try {
      const formData = new FormData()
      formData.append('bus', bus)
      formData.append('route', route)
      formData.append('departure_datetime', departureDateTime)
      formData.append('arrival_datetime', arrivalDateTime)
      formData.append('fare', fare)

      await axiosInstance.post('/operator/schedules/create/', formData)
      setCreateSuccess('Schedule Created')
      setTimeout(()=> {setCreateSuccess('')}, 3000)
      setCreateError('')
      setBus('')
      setRoute('')
      setDepartureDateTime('')
      setArrivalDateTime('')
      setFare('')
      fetchSchedules()
    }
    catch (error) {
      setCreateError('Failed to create schedule')
    }
    finally {
      setCreateLoading(false)
    }
  }

  return (
    <div className='page-container'>
      <h2 className='opmp-heading'>Schedules Management</h2>
      <div className='opmp-main-container'>
        <div className='opmp-list-container'>
          <h3 className='opmp-list-heading'><FontAwesomeIcon icon={faClock} className='opmp-list-icon' /> Schedules list</h3>
          {schedulesLoading ? (
            <div>Loading...</div>
          ) : (
            <div className='opmp-list-grid'>
              {schedulesError && <P>{schedulesError}</P>}
              {schedulesList.map((schedule)=> (
                <OperatorSchedule key={schedule.id} schedule={schedule} fetchSchedules={fetchSchedules} />
              ))}
            </div>
          )}
        </div>

        <div className='opmp-create-container'>
          <h3 className='opmp-create-title'>Create Schedule</h3>
          {createSuccess && <p className='opmp-success'>{createSuccess}</p>}
          <form onSubmit={handleCreateSchedule} className='opmp-create-form'>
            <div className='opmp-input-box'>
              <label className='opmp-label'>Bus</label>
              <select value={bus} onChange={(e)=> setBus(e.target.value)} disabled={busesLoading}  className='opmp-input'>
                <option value=''>---Select Bus---</option>
                {buses.map((busobj)=> (
                  <option key={busobj.id} value={busobj.id}>{busobj.bus_number} - {busobj.bus_name}</option>
                ))}
              </select>
            </div>
            <div className='opmp-input-box'>
              <label className='opmp-label'>Route</label>
              <select value={route} onChange={(e)=> setRoute(e.target.value)} disabled={routesLoading}  className='opmp-input'>
                <option value=''>---Select Route---</option>
                {routes.map((routeobj)=> (
                  <option key={routeobj.id} value={routeobj.id}>{routeobj.source} → {routeobj.destination} | {routeobj.distance}Km</option>
                ))}
              </select>
            </div>
            <div className='opmp-input-box'>
              <label className='opmp-label'>Departure Date & Time</label>
              <input className='opmp-input' type='datetime-local' value={departureDateTime} onChange={(e)=> setDepartureDateTime(e.target.value)}/>
            </div>
            <div className='opmp-input-box'>
              <label className='opmp-label'>Arrival Date & Time</label>
              <input className='opmp-input' type='datetime-local' value={arrivalDateTime} onChange={(e)=> setArrivalDateTime(e.target.value)} />
            </div>
            <div className='opmp-input-box'>
              <label className='opmp-label'>Fare</label>
              <input className='opmp-input' type='number' min='1' value={fare} onChange={(e)=> setFare(e.target.value)} />
            </div>
            {createLoading ? (
              <button type='submit' disabled className='opmp-create-btn'>Creating...</button>
            ) : (
              <button type='submit' className='opmp-create-btn'>Create schedule</button>
            )}
          </form>
          {createError && <p className='opmp-error'>{createError}</p>}
        </div>
      </div>
    </div>
  )
}

export default OperatorManageSchedules
