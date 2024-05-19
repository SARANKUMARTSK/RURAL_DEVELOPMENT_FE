  import React, { useState } from 'react'
  import TopBar from '../../../components/TopBar'
  import '../app.css'
  import HomeIcon from '@mui/icons-material/Home';
  import toast from 'react-hot-toast'
  import axios from 'axios'
  import {API_URL} from '../../../App'
  import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

  function AddImage() {
    const[imageFile,setImageFile]=useState(null)
    const [event,setEvent] = useState('')
    const token = sessionStorage.getItem('token')

    const navigate = useNavigate()

    const hanldeImageUpload = async(e)=>{
      e.preventDefault()
      try {
        const formData = new FormData();
        formData.append('event', event);
        formData.append('imageFile', imageFile);
        let res = await axios.post(`${API_URL}/gallery`,formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` 
          }
      })
        toast.success(res.data.message)
        navigate('/landing-page')
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }

    const handleFileChange = (e) => {
      setImageFile(e.target.files[0]);
    };


    return <>
    <TopBar/>
    <Navbar/>

    <div className="addImage">
      {!imageFile?
      <img src="https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"/>:<img src={URL.createObjectURL(imageFile)}></img>
      }
      <form onSubmit={hanldeImageUpload}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <textarea className='event-input' onChange={(e)=>setEvent(e.target.value)} type="text" placeholder='Enter About Event' />
          <button type='submit'>Add to Gallery</button>
      </form>
    </div>
    </>
  }

  export default AddImage