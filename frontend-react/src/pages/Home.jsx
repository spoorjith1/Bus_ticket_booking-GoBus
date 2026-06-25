import React from 'react'
import SearchBuses from './SearchBuses'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import PopularRoutes from '../components/PopularRoutes'
import WhychooseMyBus from '../components/WhychooseMyBus'

function Home() {
  return (
    <>
    <div className='page-container home-page'>
      <Hero />
      <PopularRoutes />
      <WhychooseMyBus />
    </div>
    </>
  )
}

export default Home