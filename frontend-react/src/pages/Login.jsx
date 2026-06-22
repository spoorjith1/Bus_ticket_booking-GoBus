import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='page-container login-page'>
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
            <form className='sign-form'>
              <div className='input-box'>
                <label className='input-label'>Username</label>
                <input className='input-field' type='text' />
              </div>
              <div className='input-box'>
                <label className='input-label'>Password</label>
                <input className='input-field' type='password' />
              </div>
              <button type='button' className='sign-btn'>Login</button>
            </form>
            <p className='sign-alter'>New to MyBus ? <Link to='/register' className='sign-alter-link'>Register</Link></p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
