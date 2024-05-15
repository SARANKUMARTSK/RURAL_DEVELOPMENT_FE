import React, { useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';

function EditComplaint() {

  const navigate = useNavigate()
  let userId = sessionStorage.getItem("userId")
  let [userName,setUserName] = useState("")
  let [userEmail,setUserEmail] = useState("")
  let [userPhoneNumber,setUserPhoneNumber] = useState("")
  let [locality,setLocality] = useState("")
  let [city,setCity] = useState("")
  let [district,setDistrict] = useState("")
  let [state,setState] = useState("")
  let [pincode,setPincode] = useState("")
  let [department,setDepartment] = useState("")
  let [title,setTitle] = useState("")
  let [description,setDescription] = useState("")
  let [imageFile,setImageFile] = useState(null)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('userEmail', userEmail);
      formData.append('userPhoneNumber', userPhoneNumber);
      formData.append('imageFile', imageFile);
      formData.append('imageName', imageFile?imageFile.name:"");
      formData.append('locality', locality);
      formData.append('city', city);
      formData.append('district', district);
      formData.append('state', state);
      formData.append('pincode', pincode);
      formData.append('department', department);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('userId', userId);
      
      let res = await axios.put(`${API_URL}/complaints/${userId}`,formData)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLogout = ()=>{
    sessionStorage.clear();
    navigate('/landing-page')
  }

  return <>
   <TopBar/>
  <div className="complaint-page">
   <div className="complaint-top">
    <h2>Edit Your Complaint Here...</h2>
    <div className="button-container">
    <button className='logout-button' onClick={()=>handleLogout()}>Logout</button>
    <button className='home-button' onClick={()=>navigate('/landing-page')}><HomeOutlinedIcon/>Home</button>
    </div>
   </div>
   <div className="complaint-form">
        <form onSubmit={handleSubmit}>
          <h3>Personal Details :<span>*</span></h3>
       <div className="complaint-personal-details">
          <input type="text" placeholder='Name' value={userName} onChange={(e)=>setUserName(e.target.value)} />
          <input type="text" placeholder='Email'value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
          <input type="text" placeholder='Phone Number' value={userPhoneNumber} onChange={(e)=>setUserPhoneNumber(e.target.value)}/>
       </div>
       <h3>Locality :<span>*</span></h3>
       <div className="complaint-address-details">
          <select type="text" placeholder='Village' value={locality}  onChange={(e)=>setLocality(e.target.value)} >
            <option value="">Choose Village *</option>
            <option value="Anaimalai">Anaimalai</option>
          </select>
          <select type="text" placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)}>
            <option value="">Choose City</option>
            <option value="Pollachi">Pollachi</option>
          </select>
          <select type="text" placeholder='District' value={district} onChange={(e)=>setDistrict(e.target.value)}>
            <option value="">Choose District</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
          <select type="text" placeholder='State' value={state} onChange={(e)=>setState(e.target.value)}>
            <option value="">Choose State</option>
            <option value="Tamilnadu">Tamilnadu</option>
          </select>
          <input type="text" placeholder='pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)} />
       </div>
      
      <h3>Complaint Details :<span>*</span></h3>
          
          <select type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="Water-Board">Water-Board</option>
          </select>
          <input type="text" placeholder='Complaint Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <textarea type="text" placeholder='Enter About Your Complaint' onChange={(e)=>setDescription(e.target.value)} />
          <h3>Attach Complaint Image : <span>*</span></h3>
          <div className="complaint-image-container">
              <div>
                 <input type="file" accept="image/*" value={imageFile} onChange={handleFileChange} />
              </div>
              <div>
                {
                 imageFile===null?<img src="http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"/>:
                 <img src={URL.createObjectURL(imageFile)}  />
                }
                  
              </div>

          </div>

          <div className="submit-button-center">
            <button type='submit'>Submit</button>
          </div>
        </form>
   </div>

  </div>
  </>
}

export default EditComplaint