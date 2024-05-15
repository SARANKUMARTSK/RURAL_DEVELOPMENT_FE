import React from 'react'
import TopBar from '../../../components/TopBar'
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import '../app.css'

function TrackComplaint() {
  return <>
  <TopBar/>
  <div className="trackComplaint">
    <div className="track-form-container">
        <form>
            <h3>Welcome to Rural Development</h3>
            <p>Track Your Complaint by your Complaint id here...</p>
            <label htmlFor="trackingId">Paste Your Tracking Id:</label>
            <div className="search-input-container">
                  <input type="text"  placeholder='tracking id'/>
                  <button><SearchIcon/></button>
            </div>
        </form>
    </div>
    <div className="complaint-view">
        <div className="tracking-left-container">
            <img src="https://english.mathrubhumi.com/image/contentid/policy:1.7570556:1654136692/road.jpg?$p=697da89&f=16x10&w=852&q=0.8" alt="" />
        </div>
        <div className="tracking-right-container">
             <div>
               
                <input type="text" />
                
                <input type="text" />
            
                <input type="text" />

             </div>
             <label htmlFor="title">Complaint : </label>
             <input type="text" />
             <label htmlFor="description">Description : </label>
             <textarea type="text" />
             <div className='status-inputs'>
                <input type="text" value="Registered"></input>
                <input type="text" value="Non-Assigned"></input>
             </div>
             <div className='status-action-button'>
                <button className='edit-button'><DriveFileRenameOutlineIcon/></button>
                <button className='delete-button'><DeleteIcon/></button>
             </div>
             
        </div>
    </div>
  </div>
  </>
}

export default TrackComplaint