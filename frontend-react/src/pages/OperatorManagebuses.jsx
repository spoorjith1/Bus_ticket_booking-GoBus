import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import OperatorBus from '../components/OperatorBus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusSide } from '@fortawesome/free-solid-svg-icons'

function OperatorManagebuses() {
  const [createSuccess, setCreateSuccess] = useState('')
  const [createError, setCreateError] = useState('')
  const [createLoading, setCreateLoading] = useState(false)
  const [busNumber, setBusNumber] = useState('')
  const [busName, setBusName] = useState('')
  const [busType, setBusType] = useState('')
  const [busTotalSeats, setBusTotalSeats] = useState('')
  const [busesLoading, setBusesLoading] = useState(false)
  const [busesList, setBusesList] = useState([])
  const [busesError, setBusesError] = useState('')
  
  const handleCreateBus = async (e)=> {
    e.preventDefault();
    setCreateLoading(true)
    try {
      const formData = new FormData()
      formData.append('bus_number' ,busNumber)
      formData.append('bus_name' ,busName)
      formData.append('bus_type' ,busType)
      formData.append('total_seats' ,busTotalSeats)

      await axiosInstance.post('/operator/buses/create/', formData)
      setCreateSuccess('Bus Added successfully')
      setTimeout(()=> {setCreateSuccess('')}, 3000)
      setBusNumber('')
      setBusName('')
      setBusType('')
      setBusTotalSeats('')
      fetchBuses();
    }
    catch (error) {
      setCreateError('Failed to create bus')
      setTimeout(()=> {setCreateError('')}, 3000)
    }
    finally {
      setCreateLoading(false)
    }
  }

  const fetchBuses = async ()=> {
    setBusesLoading(true)
    try {
      const response = await axiosInstance.get('/operator/buses/list/')
      setBusesList(response.data)
      setBusesError('')
    }
    catch (error) {
      setBusesError('Failed to Load buses')
    }
    finally {
      setBusesLoading(false)
    }
  }

  useEffect(()=> {
    fetchBuses();
  }, [])

  return (
    <div className='page-container'>
      <h2 className='opmp-heading'>Buses Management</h2>
      <div className='opmp-main-container'>
        <div className='opmp-list-container'>
          <h3  className='opmp-list-heading'><FontAwesomeIcon icon={faBusSide} className='opmp-list-icon' /> Buses List</h3>
          {busesLoading ? (
            <div>Loading...</div>
          ) : (
            <div className='opmp-list-grid'>
              {busesError && <p>{busesError}</p>}
              {busesList.map((bus)=> (
                <OperatorBus key={bus.id} bus={bus} fetchBuses={fetchBuses} />
              ))}
            </div>
          )}
      </div>

      <div className='opmp-create-container'>
        <h3 className='opmp-create-title'>Add Bus</h3>
        {createSuccess && <p className='opmp-success'>{createSuccess}</p>}
        <form onSubmit={handleCreateBus} className='opmp-create-form'>
          <div className='opmp-input-box'>
            <label className='opmp-label'>Bus Number</label>
            <input type='text' value={busNumber} onChange={(e)=> setBusNumber(e.target.value)} className='opmp-input' />
          </div>
          <div className='opmp-input-box'>
            <label className='opmp-label'>Bus Name</label>
            <input type='text' value={busName} onChange={(e)=> setBusName(e.target.value)} className='opmp-input' />
          </div>
          <div className='opmp-input-box'>
            <label className='opmp-label'>Bus Type</label>
            <select value={busType} onChange={(e)=> setBusType(e.target.value)} className='opmp-input'>
              <option value=''>---Select Bus Type---</option>
              <option value='luxury'>Luxury</option>
              <option value='sleeper'>Sleeper</option>
              <option value='ac_bus'>Ac Bus</option>
              <option value='regular'>Regular</option>
            </select>
          </div>
          <div className='opmp-input-box'>
            <label className='opmp-label'>Total Seats</label>
            <input type='number' value={busTotalSeats} onChange={(e)=> setBusTotalSeats(e.target.value)} className='opmp-input' />
          </div>
          {createLoading ? (
            <button disabled type='submit' className='opmp-create-btn'>Adding...</button>
          ) : (
            <button type='submit' className='opmp-create-btn'>Add Bus</button>
          )}
        </form>
        {createError && <p className='opmp-error'>{createError}</p>}
      </div>
      </div>
    </div>
  )
}

export default OperatorManagebuses
