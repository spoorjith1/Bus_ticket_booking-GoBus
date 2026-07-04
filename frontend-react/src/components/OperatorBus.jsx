import React from 'react'
import '../styles/OperatorDashboard.css'

function OperatorBus({ bus, fetchBuses }) {
  return (
    <div className='opmp-list-box'>
      <div>
        <p className='opmp-bus-box-name'>{bus.bus_name} - <span className='opmp-bus-box-number'>{bus.bus_number}</span></p>
        <p className='opmp-bus-box-text'>Bus Type : <span className='opmp-bus-box-text-span'>{bus.bus_type}</span></p>
        <p className='opmp-bus-box-text'>Total Seats : <span className='opmp-bus-box-text-span'>{bus.total_seats}</span></p>
      </div>
    </div>
  )
}

export default OperatorBus
