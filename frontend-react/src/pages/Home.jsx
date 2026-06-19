import React from 'react'
import SearchBuses from './SearchBuses'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='page-container'>
      Home
      <Link to='/searchbuses'>Search buses</Link>
    </div>
  )
}

export default Home
