import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate()
  return <>
  <div className='button-end'><button onClick={()=>navigate('/landing-page')}><HomeIcon/>Home</button></div>
  </>
}

export default Navbar