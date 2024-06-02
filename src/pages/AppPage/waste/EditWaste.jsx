import React, { useEffect, useState } from 'react';
import Topbar from '../../../components/TopBar';
import '../app.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';

function EditWaste() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const role = localStorage.getItem('role')
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [status,setStatus] = useState('')
  const [assignedTo,setAssignedTo] = useState('')
  const [loading,setLoading] = useState(false)
  const fetchData = async () => {
    try {
      let res = await axios.get(`${API_URL}/waste/${id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    });
      let { waste } = res.data;
      setUserName(waste.userName);
      setEmail(waste.email);
      setPhoneNumber(waste.phoneNumber);
      setType(waste.type);
      setQuantity(waste.quantity);
      setDescription(waste.description);
      setCity(waste.city);
      setDistrict(waste.district);
      setLocality(waste.locality);
      setExistingImage(waste.imageFile);
      setStatus(waste.status);
      setAssignedTo(waste.assignedTo)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if(userName==""||email==""||phoneNumber==""||imageFile==""||imageFile==null||!imageFile||locality==""||city==""||district==""||description==""
     ||type==""||quantity==""){
      toast.error("Please Fill All The Fields")
      setLoading(false)
    }
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
      formData.append('status', status);
      formData.append('assignedTo', assignedTo);
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      let res = await axios.put(`${API_URL}/waste/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    });
      toast.success(res.data.message);
      setLoading(false)
      role=="Admin"?navigate('/dashboard/waste-collection'):navigate('/landing-page') 
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <>
      <Topbar />
      <nav className='button-end'>
        <button onClick={()=>navigate(`/your-queries/${userId}`)}>Back</button>
      </nav>
      <div className='add-waste-page'>
        <form onSubmit={handleSubmit}>
          <div className="add-waste-left">
            <img src={`${API_URL}/images/${existingImage}`} alt="Waste" />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="add-waste-right">
            <div className="personal-details">
              <input
                type="text"
                placeholder='Your Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="waste-details">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Plastic-Waste">Plastic-Waste</option>
                <option value="Electrical-Waste">Electrical-Waste</option>
                <option value="Agro-Waste">Agro-Waste</option>
              </select>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='add-waste-desc'
                placeholder='Enter About Waste Material Including Your Address / Waste Bin - Number'
              />
              <input
                type="text"
                placeholder='Quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">Select District</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruppur">Tiruppur</option>
              </select>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select Your City</option>
                <option value="Pollachi">Pollachi</option>
                <option value="Udumalpet">Udumalpet</option>
              </select>
              <select value={locality} onChange={(e) => setLocality(e.target.value)}>
                <option value="">Select Village</option>
                <option value="Anaimalai">Anaimalai</option>
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
  );
}

export default EditWaste;
