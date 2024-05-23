import React, { useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {API_URL} from '../../../App'
import toast from 'react-hot-toast';

function AddAnnouncement() {
  const navigate =useNavigate()
  const token = localStorage.getItem('token')
  const handleLogout = ()=>{
    localStorage.clear();
    navigate('/landing-page')
  }

  const [loading,setLoading] = useState(false)
  const [from ,setFrom] = useState("")
  const [to ,setTo] = useState("")
  const [title ,setTitle] = useState("")
  const [endingDate ,setEndingDate] = useState("")
  const [description ,setDescription] = useState("")
  const [imageFile ,setImageFile] = useState(null)

  const handleSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append('from',from)
      formData.append('to',to)
      formData.append('title',title)
      formData.append('endingDate',endingDate)
      formData.append('description',description)
      formData.append('imageFile',imageFile)
      let res = await axios.post(`${API_URL}/announcement`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message)
      setLoading(false)
      navigate('/dashboard/home')
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return <>
  <TopBar/>
  <div className="complaint-top">
    <h2>Add Official Announcement Here...</h2>
    <div className="button-container">
    <button className='logout-button' onClick={()=>handleLogout()}>Logout</button>
    <button className='home-button' onClick={()=>navigate('/landing-page')}><HomeOutlinedIcon/>Home</button>
    </div>
   </div>
    <div className='add-announcement-page'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='From'onChange={(e)=>setFrom(e.target.value)} />
        <input type="text" placeholder='To' onChange={(e)=>setTo(e.target.value)}/>
        <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
        <textarea type="text" placeholder='Enter the Announcement' onChange={(e)=>setDescription(e.target.value)} />
        <div className='space-between-center'>
        <div className="announcement-date-container">
          <label htmlFor="endingDate">Ending Date :</label>
          <input type="date" onChange={(e)=>setEndingDate(e.target.value)} />
        </div>
        <input type="file" accept="image/*,.pdf" onChange={(e)=>setImageFile(e.target.files[0])}/>
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

export default AddAnnouncement