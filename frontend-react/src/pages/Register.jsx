import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e)=> {
    e.preventDefault();
    if (!email || !username || !password) {
      setGeneralError('Please fill all fields')
      setTimeout(() => { setGeneralError('') }, 3000)
      return
    }

    setLoading(true)

    const userData = {username, email, password}
    try {
      const response = await axiosInstance.post('/register/', userData)
      setErrors({})
      setSuccess(true)
      navigate('/login')
    }
    catch (error) {
      setError(error.response.data)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='page-container sign-page register-page'>
      <div className='sign-container register-container'>

        <div className='sign-box'>
          <img src='/mybus-red.png' className='sign-image' />
          <div className='sign-left-text-box'>
            <p className='sign-welcome'>Welcome!</p>
            <p className='sign-text'>Sign-up now to book bus tickets at the lowest price</p>
          </div>
        </div>

        <div className='sign-box sign-right'>
          <div className='register-sign-form-container'>
            <h3 className='sign-title register-title'>Register</h3>
            <form className='sign-form' onSubmit={handleRegister}>
              <div className='input-box'>
                <label className='register-label'>Email</label>
                <input className='register-field' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                <small>{errors.email && <div className='sign-errors'>{errors.email}</div>}</small>
              </div>
              <div className='input-box'>
                <label className='register-label'>Username</label>
                <input className='register-field' type='text' value={username} onChange={(e)=> setUsername(e.target.value)} />
                <small>{errors.username && <div className='sign-errors'>{errors.username}</div>}</small>
              </div>
              <div className='input-box'>
                <label className='register-label'>Password</label>
                <input className='register-field' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                <small>{errors.password && <div className='sign-errors'>{errors.password}</div>}</small>
                {generalError && (<div className='sign-errors'>{generalError}</div>)}
              </div>
              {loading ? (
                <button type='submit' className='register-btn' disabled>Registering...</button>
              ) : (
                <button type='submit' className='register-btn'>Register</button>
              )}
            </form>
            <p className='register-alter'>Already have an account ? <Link to='/login' className='register-alter-link'>Login</Link></p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
