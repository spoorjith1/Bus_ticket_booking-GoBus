import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import '../styles/AdminDashboard.css'

function Operator({ operator, fetchOperators }) {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState(false)

  const handleDeleteOperator = async ()=> {
    setDeleteLoading(true)
    try {
      await axiosInstance.delete(`/operator/${operator.id}/delete/`)
      alert('Operator Deleted Successfully')
      fetchOperators();
    }
    catch (error) {
      alert('Failed to delete operator')
    }
    finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className='op-list-box'>
      <div className='op-box-op-info'>
        <img src={`http://127.0.0.1:8000${operator.op_logo}`} className='op-box-img' /><br />
        <div>
          <h2 className='op-box-name'>{operator.op_name}</h2>
          <p className='op-box-username'>{operator.op_username}</p>
          <p className='op-box-email'>{operator.op_email}</p>
          <p className='op-box-number'>{operator.op_mobile_no1}</p>
        </div>
      </div>
      <div className='op-delete-container'>
        {deleteConfirmInfo ? (
          <div className='op-confirm-del-box'>
            <p className='op-confirm-del-txt'>Are you sure you want to delete <span className='op-del-span'>{operator.op_name}</span> ?</p>
            <div className='op-confirm-btns-box'>
              <button onClick={()=> setDeleteConfirmInfo(false)} className='op-confirm-cancel-btn'>No, Cancel</button>
              {deleteLoading ? (
                <button type='button' disabled className='op-confirm-del-btn'>Deleting...</button>
              ) : (
                <button type='button' onClick={handleDeleteOperator} className='op-confirm-del-btn'>Yes, Delete</button>
              )}
            </div>
          </div>
        ) : (
          <button type='button' onClick={()=> setDeleteConfirmInfo(true)} className='op-del-btn'>Delete Operator</button>
        )}
      </div>
    </div>
  )
}

export default Operator
