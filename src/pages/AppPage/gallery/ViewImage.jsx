import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function ViewImage() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  let [image , setImage] = useState([])
  const token = localStorage.getItem('token')
  const fetchImages = async()=>{
     try {
      let images = await axios.get(`${API_URL}/gallery`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
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
      let res = await axios.delete(`${API_URL}/gallery/${e._id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  return <>
      <TopBar/>
      {/* <Navbar/> */}
      <div className="button-end">
        {
          role==="Admin"&&<button onClick={()=>navigate('/add-image')}>+ Add Image</button>
        }
        <button onClick={()=>navigate('/landing-page')}><HomeIcon/> Home</button>
      </div>
      <div className='image-gallery'>
          { 
            image.map((e,i)=>{
              return <div key={i} className="image-item">
             <img src={`${API_URL}/images/${e.imageFile}`} alt={e.imageFile} />
              {
                role==="Admin"&&<button style={{zIndex:"10"}} onClick={()=>handleDelete(e)}><DeleteIcon/></button> 
              } 
              <p>{e.event}</p>
            </div>
            })
          }
      </div>

      <Footer/>
    </>
}

export default ViewImage