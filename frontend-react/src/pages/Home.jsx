import React from 'react'
import SearchBuses from './SearchBuses'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
    <div className='page-container'>
      <Navbar />
    </div>
    <Footer />
    </>
  )
}

export default Home