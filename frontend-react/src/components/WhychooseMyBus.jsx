import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faTag, faHeadset, faBusSide } from '@fortawesome/free-solid-svg-icons';

function WhychooseMyBus() {
  return (
    <div className='why-mybus-section'>
      <h2 className='why-mybus-title'>Why choose My Bus ?</h2>
      <div className='why-mybus-container'>
        <div className='why-mybus-box'>
            <div className='why-mybus-icon-box'><FontAwesomeIcon icon={faShieldHalved} className='why-mybus-icon' /></div>
            <h3>Secure Booking</h3>
            <p>your data is safe in our system</p>
        </div>
        <div className='why-mybus-box'>
            <div className='why-mybus-icon-box'><FontAwesomeIcon icon={faTag} className='why-mybus-icon' /></div>
            <h3>Lowest Prices</h3>
            <p>Find buses with lowest price range</p>
        </div>
        <div className='why-mybus-box'>
            <div className='why-mybus-icon-box'><FontAwesomeIcon icon={faBusSide} className='why-mybus-icon' /></div>
            <h3>Seat Selection</h3>
            <p>Choose your favorite seats</p>
        </div>
        <div className='why-mybus-box'>
            <div className='why-mybus-icon-box'><FontAwesomeIcon icon={faHeadset} className='why-mybus-icon' /></div>
            <h3>24/7 support</h3>
            <p>We are always here to help you</p>
        </div>
      </div>
    </div>
  )
}

export default WhychooseMyBus
