import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import BusRoute from '../components/BusRoute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSide } from '@fortawesome/free-solid-svg-icons';

function AdminManageRoutes() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [distance, setDistance] = useState('')
  const [createLoading, setCreateLoading] = useState(false)
  const [createSuccess, setCreateSuccess] = useState('')
  const [createError, setCreateError] = useState('')
  const [routesListData, setRoutesListData] = useState([])
  const [routesError, setRoutesError] = useState('')
  const [routesSuccess, setRoutesSuccess] = useState('')
  const [routesLoading, setRoutesLoading] = useState(false)

  const handleCreateRoute = async (e)=> {
    e.preventDefault();
    setCreateLoading(true)
    try {
      const formData = new FormData()
      formData.append('source', source)
      formData.append('destination', destination)
      formData.append('distance', distance)

      await axiosInstance.post('/routes/create/', formData)
      setCreateSuccess('Route Created')
      setTimeout(()=> {setCreateSuccess('')}, 3000)
      setSource('')
      setDestination('')
      setDistance('')
      fetchRoutes();
    }
    catch (error) {
      if (error.response?.data?.error) {
        setCreateError(error.response.data.error)
      }
      else {
        setCreateError('Failed to create Route')
      }
      setTimeout(()=> {setCreateError('')}, 3000)
    }
    finally {
      setCreateLoading(false)
    }
  }

  const fetchRoutes = async ()=> {
    setRoutesLoading(true)
    try {
      const response = await axiosInstance.get('/routes/list/')
      setRoutesError('')
      setRoutesListData(response.data)
    }
    catch (error) {
      setRoutesError('Failed to load routes')
    }
    finally {
      setRoutesLoading(false)
    }
  }

  useEffect(()=> {
    fetchRoutes();
  }, [])

  return (
    <div className='page-container admin-manage-page'>
      <h2 className='admin-manage-title'>Routes Management</h2>
      <div className='admin-manage-container'>
        <div className='admin-list-section'>
          <h4 className='admin-list-title'><FontAwesomeIcon icon={faBusSide} className='admin-list-icon' /> Routes List</h4>
          {routesLoading ? (
            <div className='admin-list-container-loading'>Loading...</div>
          ) : (
            <div className='admin-list-container'>
              {routesError && <p className='admin-error'>{routesError}</p>}
              {routesListData.map((route)=> (
                <BusRoute key={route.id} route={route} fetchRoutes={fetchRoutes} />
              ))}
            </div>
          )}
        </div>
        <div className='admin-create-container'>
          <h4 className='admin-create-title'>Create Route</h4>
          {createSuccess && <p className='admin-success'>{createSuccess}</p>}
          <form onSubmit={handleCreateRoute} className='admin-form-container'>
            <div className='admin-input-box'>
              <label className='admin-label'>Source</label>
              <input className='admin-input' type='text' value={source} onChange={(e)=> setSource(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Destination</label>
              <input className='admin-input' type='text' value={destination} onChange={(e)=> setDestination(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Distance</label>
              <input className='admin-input' type='number' value={distance} onChange={(e)=> setDistance(e.target.value)} />
            </div>
            {createLoading ? (
              <button type='submit' disabled className='admin-create-btn'>Creating Route...</button>
            ) : (
              <button type='submit' className='admin-create-btn'>Create Route</button>
            )}
          </form>
          {createError && <p className='admin-error'>{createError}</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminManageRoutes
