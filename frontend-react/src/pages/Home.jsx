import React from 'react'
import SearchBuses from './SearchBuses'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import PopularRoutes from '../components/PopularRoutes'

function Home() {
  return (
    <>
    <div className='page-container home-page'>
      <HeroSection />
      <PopularRoutes />
    </div>
    </>
  )
}

export default Home