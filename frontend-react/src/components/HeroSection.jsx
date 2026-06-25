import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className='hero-section'>
      <div className='hero-container'>
        <div className='hero-content'>
          <span className='hero-slogan'>Book smart . Travel easy</span>
          <h1 className='hero-title'>Book your <span className='hero-title-span'>Bus journey</span></h1>
          <p className='hero-text'>Find the best bus tickets at the lowest prices.<br />
          Safe and confortable journey.
          </p>
          <div className='hero-search-box' onClick={()=> navigate('/search-buses')}>
            <div className='hero-search-element-left'><FontAwesomeIcon icon={faMagnifyingGlass} className='hero-search-icon' /></div>
            <div className='hero-search-element-center'>
              <h3 className='hero-center-head'>Search buses</h3>
              <span className='hero-center-text'>Search buses, compare prices and book your tickets</span>
            </div>
            <div className='hero-search-element-right'><FontAwesomeIcon icon={faArrowRight} className='hero-arrow-icon' /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
