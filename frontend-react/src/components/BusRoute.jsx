import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import '../styles/AdminDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function BusRoute({ route, fetchRoutes }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editSource, setEditSource] = useState('')
  const [editDestination, setEditDestination] = useState('')
  const [editDistance, setEditDistance] = useState('')

  const openEditForm = () => {
    setEditSource(route.source)
    setEditDestination(route.destination)
    setEditDistance(route.distance)
    setOpenEdit(true)
  }

  const handleDeleteRoute = async () => {
    setDeleteLoading(true)
    try {
      await axiosInstance.delete(`/routes/${route.id}/delete/`)
      alert('Route Deleted')
      fetchRoutes()
    }
    catch {
      alert('Failed to delete Route')
    }
    finally {
      setDeleteLoading(false)
    }
  }

  const handleEditRoute = async (e) => {
    e.preventDefault()
    setEditLoading(true)

    try {
      const formData = new FormData()
      formData.append('source', editSource)
      formData.append('destination', editDestination)
      formData.append('distance', editDistance)

      await axiosInstance.patch(`/routes/${route.id}/update/`, formData)
      alert('Route Updated Successfully')
      setOpenEdit(false)
      fetchRoutes()
    }
    catch {
      alert('Failed to Edit Route')
    }
    finally {
      setEditLoading(false)
    }
  }

  return (
    <div className='route-list-box'>
      <div className='route-info-box'>
        <div className='route-name-box'>
          <p className='route-name'>{route.source}</p>
          <FontAwesomeIcon icon={faArrowRight} className='route-arrow-icon' />
          <p className='route-name'>{route.destination}</p>
        </div>
        <p className='route-distance'>{route.distance} km</p>
      </div>

      <div className='route-manage-options'>
        {openEdit ? (
          <div className='route-edit-box'>
            <h3 className='route-edit-title'>Edit Route</h3>
            <form onSubmit={handleEditRoute}>
              <input type='text' className='route-edit-input' value={editSource} onChange={(e) => setEditSource(e.target.value)}/>
              <FontAwesomeIcon icon={faArrowRight} className='route-input-route-icon' />
              <input type='text'  className='route-edit-input' value={editDestination} onChange={(e) => setEditDestination(e.target.value)} />
              <input type='number'  className='route-edit-input km' value={editDistance} onChange={(e) => setEditDistance(e.target.value)} />km
              <button type='button' className='route-cancel-btn' onClick={() => setOpenEdit(false)}>Cancel</button>
              {editLoading ? (
                <button type='submit' className='route-confirm-btn' disabled>Saving...</button>
              ) : (
                <button type='submit' className='route-confirm-btn'>Save</button>
              )}
            </form>
          </div>
        ) : (
          !deleteConfirmInfo && (
            <button className='route-manage-btn' onClick={openEditForm} >
              <FontAwesomeIcon icon={faPen} className='manage-icon' />
            </button>
          )
        )}
        {deleteConfirmInfo ? (
          <div className='route-confirm-del-box'>
            <p className='route-del-text'>Are you sure you want to delete this route?</p>
            <div className='route-del-btns-box'>
              <button onClick={() => setDeleteConfirmInfo(false)} className='route-cancel-btn'>Cancel</button>
              {deleteLoading ? (
                <button disabled className='route-confirm-btn'>Deleting...</button>
              ) : (
                <button onClick={handleDeleteRoute} className='route-confirm-btn'>Yes, Delete</button>
              )}
            </div>
          </div>
        ) : (
          !openEdit && (
            <button className='route-manage-btn' onClick={() => setDeleteConfirmInfo(true)}>
              <FontAwesomeIcon icon={faTrash} className='manage-icon' />  
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default BusRoute