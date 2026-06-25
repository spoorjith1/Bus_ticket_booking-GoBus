import React from 'react'

function Footer() {
  return (
    <div className='footer-container'>
      <footer className='footer-box'>
        <div className='footer-left'>
          <img src='/mybus-red.png' className='footer-image' />
          <span className='footer-left-text'>Book smart. Travel easy</span>
        </div>
        <div className='footer-right'>
          <p className='footer-made-by'>Made by <span className='footer-name'>Spoorjith Malebalu</span></p>
          <p className='footer-copy-right'>&copy; 2026, all rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
