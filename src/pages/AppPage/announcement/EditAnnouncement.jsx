import React from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
function EditAnnouncement() {
  const navigate =useNavigate()
  const handleLogout = ()=>{
    sessionStorage.clear();
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

        <button>Submit</button>
      </form>
    </div>
    </>
}

export default EditAnnouncement