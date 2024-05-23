import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/TopBar'
import Footer from '../../../components/Footer'
import axios from 'axios'
import { API_URL } from '../../../App'
import Navbar from '../../../components/Navbar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import toast from 'react-hot-toast'

function ViewAnnouncement() {

  const [data,setData] = useState([])
  const addButton = true;
  const token = localStorage.getItem('token')
  const fetchAnnouncement = async()=>{
    try {
      let res = await axios.get(`${API_URL}/announcement`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      setData(res.data.announcement)
    } catch (error) {
      console.log(error);
    }
  }
   const handleDelete=async(e)=>{
    try {
      let res = await axios.delete(`${API_URL}/announcement/${e._id}`)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
   }
 

  useEffect(()=>{
    fetchAnnouncement();
  },[data])
  return <>
  <Topbar/>
  <Navbar addButton={addButton}/>

  <div className="announcement-page">
        {
            !data.length?<h2>No data found </h2>:""
        }

   {
    data.map((e,i)=>{
      return  <div key={i} className="announcement-link-container">
      <h3>{e.title} </h3>
      <button><a href={`${API_URL}/images/${e.imageFile}`}>CLICK HERE</a></button>
      <button className='announcement-delete-icon' onClick={()=>handleDelete(e)}><DeleteOutlineIcon/></button>
    </div>
    })
   }

    
  </div>
  <Footer/>
  </>
}

export default ViewAnnouncement