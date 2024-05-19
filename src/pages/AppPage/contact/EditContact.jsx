import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/TopBar'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FaxIcon from '@mui/icons-material/Fax';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import Navbar from '../../../components/Navbar';

function EditContact() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [fax,setFax] = useState("");
  const [position,setPosition] = useState("");
  const [locality,setLocality] = useState("");
  const [city,setCity] = useState("");
  const [district,setDistrict] = useState("");
  const [state,setState] = useState("");
  const [pincode,setPincode] = useState("");
  const {id} = useParams()

  const fetchContactData = async()=>{
    try {
      let response = await axios.get(`${API_URL}/contacts/${id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      const {contact} = response.data;
      setName(contact.name)
      setEmail(contact.email)
      setPhoneNumber(contact.phoneNumber)
      setFax(contact.fax)
      setPhoneNumber(contact.phoneNumber)
      setPosition(contact.position)
      setCity(contact.city)
      setState(contact.state)
      setDistrict(contact.district)
      setLocality(contact.locality)
      setPincode(contact.pincode)


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchContactData();
  },[])

  const hanldeSubmit=async(e)=>{
        e.preventDefault();
        try {
          let formData = {
            name ,
            email, 
            phoneNumber , 
            fax , 
            position , 
            state ,
            district , 
            city , 
            locality ,
            pincode
          }

          let res = await axios.put(`${API_URL}/contacts/${id}`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
          toast.success(res.data.message)
          navigate('/view-contact')
        } catch (error) {
          console.log(error);
        }
  }
  return<>
  <Topbar/>
  <Navbar/>
  <div className="add-contact-page">

    <div className="add-contact-left-container">
       <img src="https://cdn-icons-png.freepik.com/256/3095/3095583.png?semt=ais_hybrid"/>
    </div>

    <div className="add-contact-right-container">
  

       <form onSubmit={hanldeSubmit}>

       <div className='add-contact-personal'>
          <div><input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name Of The Contact'/><PersonPinIcon/></div>
          <div><input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' /><AttachEmailIcon/></div>
          <div><input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='Phone Number' /><PhoneEnabledIcon/></div>
          <div><input type="text" value={fax} onChange={(e)=>setFax(e.target.value)} placeholder='Fax' /><FaxIcon/></div>
          <div><input type="text" value={position} onChange={(e)=>setPosition(e.target.value)} placeholder='Position' /><BadgeIcon/></div>
       </div>

        <div className='add-contact-address'>
              <select value={state} onChange={(e)=>setState(e.target.value)}>
                <option value="">State</option>
                <option value="Tamilnadu">Tamilnadu</option>
              </select>
              <select value={district} onChange={(e)=>setDistrict(e.target.value)}>
                <option value="">District</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruppur">Tiruppur</option>
              </select>
              <select value={city} onChange={(e)=>setCity(e.target.value)}>
                <option value="">City</option>
                <option value="Coimbatore">Pollachi</option>
                <option value="Tiruppur">Anaimalai</option>
              </select>
              <select value={locality} onChange={(e)=>setLocality(e.target.value)}>
                <option value="">Village</option>
                <option value="Anaimalai">Anaimalai</option>
              </select>
              <input value={pincode} onChange={(e)=>setPincode(e.target.value)} type="text" placeholder='pincode' />
        </div>

        <div className="add-contact-button-container">
            <button type='submit'>Submit</button>
        </div>  
       </form>

    </div>

  </div>
  </>
}

export default EditContact