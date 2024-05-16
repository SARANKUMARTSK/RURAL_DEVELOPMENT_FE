import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import Navbar from '../../../components/Navbar';

function ViewImage() {

  const role = sessionStorage.getItem('role')
  let [image , setImage] = useState([])

  const fetchImages = async()=>{
     try {
      let images = await axios.get(`${API_URL}/gallery`)
      setImage(images.data.photos)
     } catch (error) {
      console.log(error);
     }
  }
  
  useEffect(()=>{
    fetchImages()
  })

  const handleDelete = async(e)=>{
    try {
      let res = await axios.delete(`${API_URL}/gallery/${e._id}`)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  return <>
      <TopBar/>
      <Navbar/>
      <div className='image-gallery'>
          {
            image.map((e,i)=>{
              return <div key={i} className="image-item">
             <img src={`${API_URL}/images/${e.imageFile}`} alt={e.imageFile} />
              {
                role==="admin"&&<button onClick={()=>handleDelete(e)}><DeleteIcon/></button> 
              } 
              <p>{e.event}</p>
            </div>
            })
          }
      </div>
    </>
}

export default ViewImage