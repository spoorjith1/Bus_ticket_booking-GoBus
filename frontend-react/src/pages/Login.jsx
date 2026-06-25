import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { AuthContext } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async (e)=> {
    e.preventDefault();
    if (!email) {
      setError('Please Enter email')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }
    if (!password) {
      setError('Please Enter password')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }
    setLoading(true)
    const userData = {email, password}
    try {
      const response = await axiosInstance.post('/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true)
      setError('')
      navigate('/')
    }
    catch (error) {
      setError('InValid email or password')
      setTimeout(()=> {setError('')}, 3000 )
      setEmail('')
      setPassword('')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className='page-container sign-page'>
      <div className='sign-container'>

        <div className='sign-box'>
          <img src='/mybus-red.png' className='sign-image' />
          <div className='sign-left-text-box'>
            <p className='sign-welcome'>Welcome Back!</p>
            <p className='sign-text'>Login now to book bus tickets at the lowest price</p>
          </div>
        </div>

        <div className='sign-box sign-right'>
          <div className='sign-form-container'>
            <h3 className='sign-title'>Login</h3>
            <form className='sign-form' onSubmit={handleLogin}>
              <div className='input-box'>
                <label className='input-label'>Email</label>
                <input className='input-field' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
              </div>
              <div className='input-box'>
                <label className='input-label'>Password</label>
                <input className='input-field' type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
              </div>
              {error && <div className='login-error'>{error}</div>}
              {loading ? (
                <button type='submit' className='sign-btn' disabled>Logging in...</button>
              ) : (
                <button type='submit' className='sign-btn'>Login</button>
              )}
            </form>
            <p className='sign-alter'>New to MyBus ? <Link to='/register' className='sign-alter-link'>Register</Link></p>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Login
