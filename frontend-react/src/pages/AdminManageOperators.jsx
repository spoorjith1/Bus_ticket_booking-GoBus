import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import Operator from '../components/Operator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

function AdminManageOperators() {
  const [LogoPreview, setLogoPreview] = useState('')
  const [logo, setLogo] = useState(null)
  const [username, setUsername] = useState('')
  const [operatorName, setOperatorName] = useState('')
  const [email, setEmail] = useState('')
  const [numberOne, setNumberOne] = useState('')
  const [numberTwo, setNumberTwo] = useState('')
  const [verified, setVerified] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createSuccess, setCreateSuccess] = useState('')
  const [CreateLoading, setCreateLoading] = useState(false)
  const [opListError, setOpListError] = useState('')
  const [opListSuccess, setOpListSuccess] = useState('')
  const [opListLoading, setOpListLoading] = useState(false)
  const [opListData, setOpListData] = useState([])
  const navigate = useNavigate()

  const handleOperatorCreate = async (e)=> {
    e.preventDefault('');
    setCreateLoading(true)
    try {
      const formData = new FormData()
      if (logo) {
        formData.append('op_logo', logo)
      }
      formData.append('op_username', username)
      formData.append('op_name', operatorName)
      formData.append('op_email', email)
      formData.append('op_mobile_no1', numberOne)
      formData.append('op_mobile_no2', numberTwo)
      formData.append('is_verified', verified)

      await axiosInstance.post('/operator/create/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      setCreateSuccess('Operator Created Successfully')
      setTimeout(()=> {setCreateSuccess('')}, 3000)
      setCreateError('')
      setLogo(null)
      setLogoPreview('')
      setUsername('')
      setOperatorName('')
      setEmail('')
      setNumberOne('')
      setNumberTwo('')
      setVerified('')
      fetchOperators();
    }
    catch (error) {
      if (error.response?.data?.error) {
        setCreateError(error.response.data.error)
      }
      else {
        setCreateError('Failed to Create Operator')
      }
      setTimeout(()=> {setCreateError('')}, 3000)
    }
    finally {
      setCreateLoading(false)
    }
  }

  const fetchOperators = async ()=> {
    setOpListLoading(true)
    try {
      const response = await axiosInstance.get('/operator/list/')
      setOpListData(response.data)
    }
    catch (error) {
      setOpListError('Failed to load operators')
    }
    finally {
      setOpListLoading(false)
    }
  }

  useEffect(()=> {
    fetchOperators();
  }, [])

  return (
    <div className='page-container admin-manage-page'>
      <h2 className='admin-manage-title'>Operators Management</h2>
      <div className='admin-manage-container'>
        <div className='admin-list-section'>
          <h4 className='admin-list-title'><FontAwesomeIcon icon={faBookmark} className='admin-list-icon' /> Operators List</h4>
          {opListLoading ? (
            <div className='admin-list-container-loading'>Loading...</div>
          ) : (
            <div className='admin-list-container'>
              {opListError && <p className='admin-error'>{opListError}</p>}
              {opListData.map((operator)=> (
                <Operator key={operator.id} operator={operator} fetchOperators={fetchOperators} />
              ))}
            </div>
          )}
        </div>
        <div className='admin-create-container'>
          <h4 className='admin-create-title'>Create Operator</h4>
          {createSuccess && <p className='admin-success'>{createSuccess}</p>}
          <form onSubmit={handleOperatorCreate} className='admin-form-container'>
            {LogoPreview && (<img src={LogoPreview} className='op-create-img-preview' />)}
            <div className='admin-input-box'>
              <label className='admin-label'>Operator Logo</label>
              <input className='admin-input' type='file' accept='image/*' onChange={(e)=> {
                setLogo(e.target.files[0]) 
                setLogoPreview(URL.createObjectURL(e.target.files[0])) 
              }}/>
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Operator username</label>
              <input className='admin-input' type='text' value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Operator company name</label>
              <input className='admin-input' type='text' value={operatorName} onChange={(e)=> setOperatorName(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Email</label>
              <input className='admin-input' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Mobile No1</label>
              <input className='admin-input' type='text' value={numberOne} onChange={(e)=> setNumberOne(e.target.value)} />
            </div>
            <div className='admin-input-box'>
              <label className='admin-label'>Mobile No2</label>
              <input className='admin-input' type='text' value={numberTwo} onChange={(e)=> setNumberTwo(e.target.value)} />
            </div>
            <div className='admin-input-checkbox'>
              <label className='admin-label'>Is Verified</label>
              <input className='admin-input' type='checkbox' checked={verified} onChange={(e)=> setVerified(e.target.checked)} />
            </div>
            {CreateLoading ? (
              <button type='submit' className='admin-create-btn' disabled>Creating Operator...</button>
            ) : (
              <button type='submit' className='admin-create-btn'>Create Operator</button>
            )}
          </form>
          {createError && <p className='admin-error'>{createError}</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminManageOperators
