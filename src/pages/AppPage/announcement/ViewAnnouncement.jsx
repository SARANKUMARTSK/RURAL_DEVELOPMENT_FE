import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/TopBar'
import Footer from '../../../components/Footer'
import axios from 'axios'
import { API_URL } from '../../../App'
import Navbar from '../../../components/Navbar'
function ViewAnnouncement() {

  const [data,setData] = useState([])

  const fetchAnnouncement = async()=>{
    try {
      let res = await axios.get(`${API_URL}/announcement`)
      setData(res.data.announcement)
    } catch (error) {
      console.log(error);
    }
  }
 

  useEffect(()=>{
    fetchAnnouncement();
  },[])
  return <>
  <Topbar/>
  <Navbar/>
  <div className="announcement-page">


   {
    data.map((e,i)=>{
      return  <div className="announcement-link-container">
      <h3>{e.title} </h3>
      <button><a href={`${API_URL}/images/${e.imageFile}`}>CLICK HERE</a></button>
    </div>
    })
   }

    
  </div>
  <Footer/>
  </>
}

export default ViewAnnouncement