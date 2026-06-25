import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import PopularRoutesData from '../data/PopularRoutesData'

function PopularRoutes() {
  return (
    <div className='pr-section'>
        <div className='pr-top'>
          <h2 className='pr-heading'><FontAwesomeIcon icon={faLocationDot} className='pr-location-icon' /> Popular Routes</h2>
          <Link to='/search-buses' className='pr-all-routes-link'>Find All Routes <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
        <div className='pr-routes-container'>
            {PopularRoutesData.map((route) => (
              <div className='pr-route-card' key={route.id}>
                <div className='pr-card-left'>
                  <h3 className='pr-route'>{route.source} → {route.destination}</h3>
                  <p className='pr-time'>{route.time}</p>
                </div>
                <div className='pr-card-right'>
                  <p className='pr-distance'>{route.distance}</p>
                  <div className='pr-price-box'>
                    <p className='pr-from'>From </p>
                    <p className='pr-price'>{route.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}
export default PopularRoutes;