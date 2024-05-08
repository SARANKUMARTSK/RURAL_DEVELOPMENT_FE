import React from 'react'
import './components.css'
import { useNavigate } from 'react-router-dom'; 
function DefaultPage() {
    const navigate = useNavigate()
  return <>
  <div className="default-page">
    <div>
        <div className='oops'>Oops ! </div>
        <div className='not-found'>
        <h1>404 - PAGE NOT FOUND</h1>
        <p>The page you looking for might have been removed has its name changed or is temporarily unavailable</p>
        <button onClick={()=>navigate('/landing-page')}>GO TO HOMEPAGE</button>
        </div>
    </div>
  </div>
  </>
}

export default DefaultPage