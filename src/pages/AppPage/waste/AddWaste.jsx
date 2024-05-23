import React, { useState } from 'react'
import Topbar from '../../../components/TopBar'
import '../app.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import axios from 'axios'
import { API_URL } from '../../../App'
import toast from 'react-hot-toast'
function AddWaste() {

  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [type,setType] = useState("")
  const [quantity,setQuantity] = useState("")
  const [description,setDescription] = useState("")
  const [locality,setLocality] = useState("")
  const [city,setCity] = useState("")
  const [district,setDistrict] = useState("")
  const [imageFile,setImageFile] = useState(null)
  const [loading,setLoading] = useState(false)
  
  const handleSubmit = async(e)=>{
    setLoading(true)
    if(userName==""||email==""||phoneNumber==""||imageFile==""||imageFile==null||!imageFile||locality==""||city==""||district==""||description==""
     ||type==""||quantity==""){
      toast.error("Please Fill All The Fields")
      setLoading(false)
    }
     e.preventDefault();
     try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('type', type);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('locality', locality);
      formData.append('city', city);
      formData.append('district', district);
      formData.append('imageFile', imageFile);
      formData.append('userId', userId);

      let res = await axios.post(`${API_URL}/waste/${userId}`,formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
    setLoading(false)
      toast.success(res.data.message);
      role=="Admin"?navigate('/dashboard/home'):navigate('/landing-page')
     } catch (error) {
      console.log(error);
      setLoading(false)
     }
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  return <>
    <Topbar/>
    <Navbar/>
    <h2 className='heading-top'>Simply Add Your Waste Dedatils For Pickup</h2>
    <div className='add-waste-page'>
      <form onSubmit={handleSubmit}>
         <div className="add-waste-left">
          {
            imageFile===null?<img src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"/>:
            <img src={URL.createObjectURL(imageFile)}/>
          }
         
         <input type="file" name='imageFile' accept="image/*" onChange={handleFileChange}/>
         </div>
   
         <div className="add-waste-right">
              <div className="personal-details">
                <input type="text" placeholder='Your Name' onChange={(e)=>setUserName(e.target.value)} />
                <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
                <input type="text" placeholder='Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)} />
                <small style={{color:"gray",marginLeft:"20px"}}>please Enter valid email to Track Your Complaint </small>
              </div>
              <div className="waste-details">
                <select onChange={(e)=>setType(e.target.value)} >
                  <option value="">Select Type</option>
                  <option value="Plastic-Waste">Plastic-Waste</option>
                  <option value="Electrical-Waste">Electrical-Waste</option>
                  <option value="Agro-Waste">Agro-Waste</option>
                </select>
                <textarea onChange={(e)=>setDescription(e.target.value)}  className='add-waste-desc' placeholder='Enter About Waste Material Including Your Address'></textarea>
                <input onChange={(e)=>setQuantity(e.target.value)}  type="text" placeholder='Quantity' />
                <select onChange={(e)=>setDistrict (e.target.value)} >
                  <option value="">Select District</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Tiruppur">Tiruppur</option>
                </select> 
                <select onChange={(e)=>setCity (e.target.value)} >
                  <option value="">Select Your City</option>
                  <option value="Pollachi">Pollachi</option>
                  <option value="Anaimalai">Anaimalai</option>
                </select>
                <select onChange={(e)=>setLocality (e.target.value)} >
                  <option value="">Select Village</option>
                  <option value="Kaliyapuram">Kaliyapuram</option>
                  <option value="Odayakulam">Odayakulam</option>
                </select> 
              </div>

         </div>

         
         {
                loading?<button type='submit' className='loading-button'>Loading<span className="dot-span dot-span1">.</span>
                    <span className="dot-span dot-span2">.</span>
                    <span className="dot-span dot-span3">.</span></button>:<button className='add-waste-button' type='submit'>Submit</button>
              }
      </form>
    </div>
  </>
}

export default AddWaste