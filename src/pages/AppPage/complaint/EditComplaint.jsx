import React, { useEffect, useState } from 'react';
import TopBar from '../../../components/TopBar';
import '../app.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';

function EditComplaint() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token')

    const role = localStorage.getItem('role')
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState( );
    const [image, setImage] = useState("");
    const [status,setStatus] = useState('')
    const [assignedTo,setAssignedTo] = useState('')
   

    const fetchComplaintData = async () => {
        try {
            const response = await axios.get(`${API_URL}/complaints/byId/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        });
            const { complaint } = response.data;
            setUserName(complaint.userName);
            setUserEmail(complaint.userEmail);
            setUserPhoneNumber(complaint.userPhoneNumber);
            setLocality(complaint.locality);
            setCity(complaint.city);
            setDistrict(complaint.district);
            setState(complaint.state);
            setPincode(complaint.pincode);
            setDepartment(complaint.department);
            setTitle(complaint.title);
            setDescription(complaint.description);
            setImage(complaint.imageFile);
            setStatus(complaint.status)
            setAssignedTo(complaint.assignedTo)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
      fetchComplaintData();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('userEmail', userEmail);
            formData.append('userPhoneNumber', userPhoneNumber);
            formData.append('imageFile', imageFile);
            formData.append('imageName', imageFile ? imageFile.name : "");
            formData.append('locality', locality);
            formData.append('city', city);
            formData.append('district', district);
            formData.append('state', state);
            formData.append('pincode', pincode);
            formData.append('department', department);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('userId', userId);
            formData.append('status', status);
            formData.append('assignedTo', assignedTo);

            const response = await axios.put(`${API_URL}/complaints/${id}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}` 
              }
          });
            toast.success(response.data.message);
            navigate('/landing-page')
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/landing-page');
    };

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
            <input type="text" placeholder='Name' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)} />
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


          {
            role==="Admin"&&<select value={status} onChange={(e)=>setStatus(e.target.value)} >
            <option value="">Select Status</option>
            <option value="Registered">Registered</option>
            <option value="Registered">Assigned</option>
            <option value="Registered">Solved</option>
         </select>
          }

          {
            role==="Admin"&&
          <input type="text" placeholder='Complaint Status' value={assignedTo} onChange={(e)=>setTitle(e.target.value)}/>

          }


          <textarea type="text" placeholder='Enter About Your Complaint' value={description} onChange={(e)=>setDescription(e.target.value)} />
          <h3>Attach Complaint Image : <span>*</span></h3>
          <div className="complaint-image-container">
              <div>
                 <input type="file" accept="image/*"  onChange={handleFileChange} />
              </div>
              <div>
                 <img src={`${API_URL}/images/${image}`} alt={imageFile} />
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