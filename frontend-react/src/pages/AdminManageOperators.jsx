import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import Operator from '../components/Operator'

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

  if (opListLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='page-container'>
      <h2>Operators Management</h2>
      <div>
        {createSuccess && <div>{createSuccess}</div>}
        <form onSubmit={handleOperatorCreate}>
          {LogoPreview && (<img src={LogoPreview} width='120' className='edit-profile-pic' />)}<br />
          <label>Operator Logo</label>
          <input type='file' accept='image/*' onChange={(e)=> {
            setLogo(e.target.files[0]) 
            setLogoPreview(URL.createObjectURL(e.target.files[0])) 
          }}/><br />
          <label>Operator username</label>
          <input type='text' value={username} onChange={(e)=> setUsername(e.target.value)} /><br />
          <label>Operator company name</label>
          <input type='text' value={operatorName} onChange={(e)=> setOperatorName(e.target.value)} /><br />
          <label>Email</label>
          <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} /><br />
          <label>Mobile No1</label>
          <input type='text' value={numberOne} onChange={(e)=> setNumberOne(e.target.value)} /><br />
          <label>Mobile No2</label>
          <input type='text' value={numberTwo} onChange={(e)=> setNumberTwo(e.target.value)} /><br />
          <label>Is Verified</label>
          <input type='checkbox' checked={verified} onChange={(e)=> setVerified(e.target.checked)} /><br />
          <br />
          {CreateLoading ? (
            <button type='submit' disabled>Creating Operator...</button>
          ) : (
            <button type='submit'>Create Operator</button>
          )}
        </form>
        {createError && <div>{createError}</div>}
      </div>
      <div>
        {opListError && <div>{opListError}</div>}
        {opListData.map((operator)=> (
          <Operator key={operator.id} operator={operator} />
        ))}
      </div>
    </div>
  )
}

export default AdminManageOperators
