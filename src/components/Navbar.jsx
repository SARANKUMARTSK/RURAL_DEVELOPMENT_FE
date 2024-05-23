import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
function Navbar({addButton}) {
    const role = localStorage.getItem('role')
    const navigate = useNavigate()

    const handleHome = ()=>{
        navigate('/landing-page')
    }
  return <>
  <div className='button-end'>
    <button onClick={()=>handleHome()}><HomeIcon/>Home</button>
    {
      role==="Admin"&&addButton?<button onClick={()=>navigate('/add-announcement')}><AddToPhotosIcon/>Add New</button>:""}
    
    {
      role==="Admin"&&addButton?<button onClick={()=>navigate('/dashboard/home')}><DashboardCustomizeIcon/>Dashboard</button>:""
    }
  
  </div>
  </>
}

export default Navbar