import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
function Navbar({addButton}) {
    const role = sessionStorage.getItem('role')
    const navigate = useNavigate()

    const handleHome = ()=>{
      if(role==="Admin"){
        navigate('/dashboard/home')
      }else{
        navigate('/landing-page')
      }
    }
  return <>
  <div className='button-end'>
    <button onClick={()=>handleHome()}><HomeIcon/>Home</button>
    {
      role==="Admin"&&addButton?<button onClick={()=>navigate('/add-announcement')}><AddToPhotosIcon/>Add New</button>:""}
    
    {
      role==="Admin"&&addButton?<button onClick={()=>navigate('/add-announcement')}><DashboardCustomizeIcon/>Dashboard</button>:""
    }
  
  </div>
  </>
}

export default Navbar