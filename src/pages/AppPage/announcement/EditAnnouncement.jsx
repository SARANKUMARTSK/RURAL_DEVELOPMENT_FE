import React, { useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
function EditAnnouncement() {
  const navigate =useNavigate()
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem('token')
  const handleLogout = ()=>{
    localStorage.clear();
    navigate('/landing-page')
  }
  return <>
  <TopBar/>
  <div className="complaint-top">
    <h2>Edit Announcement Here...</h2>
    <div className="button-container">
    <button className='logout-button' onClick={()=>handleLogout()}>Logout</button>
    <button className='home-button' onClick={()=>navigate('/landing-page')}><HomeOutlinedIcon/>Home</button>
    </div>
   </div>
    <div className='add-announcement-page'>
      <form >
        <input type="text" placeholder='From' />
        <input type="text" placeholder='To' />
        <input type="text" placeholder='Title'/>
        <textarea type="text" placeholder='Enter the Announcement' />
        <div className='space-between-center'>
        <div className="announcement-date-container">
          <label htmlFor="endingDate">Ending Date :</label>
          <input type="date" />
        </div>
        <input type="file" accept="image/*" />
        </div>
        {
                loading?<button type='submit' className='loading-button'>Loading<span className="dot-span dot-span1">.</span>
                    <span className="dot-span dot-span2">.</span>
                    <span className="dot-span dot-span3">.</span></button>:<button type='submit'>Submit</button>
              }
        
      </form>
    </div>
    </>
}

export default EditAnnouncement