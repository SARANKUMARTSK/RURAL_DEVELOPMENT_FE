import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import SearchIcon from '@mui/icons-material/Search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import '../app.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';

function TrackWaste() {

  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const userId = sessionStorage.getItem('userId')
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
  const [status,setStatus] = useState('')
  const [assignedTo,setAssignedTo] = useState('')
  let {referenceLink} = useParams();
  let [trackingCode , setTrackingCode] = useState('')
  const [wasteId,setWasteId] = useState()
  const fetchWasteData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/waste/track/${referenceLink}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      let {waste} = res.data
      setUserName(waste.userName)
      setEmail(waste.email)
      setPhoneNumber(waste.phoneNumber)
      setType(waste.type)
      setQuantity(waste.quantity)
      setDescription(waste.description)
      setLocality(waste.locality)
      setCity(waste.city)
      setDistrict(waste.district)
      setImageFile(waste.imageFile)
      setAssignedTo(waste.assignedTo)
      setStatus(waste.status)
      setWasteId(waste._id)
      setTrackingCode(waste.referenceLink)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchWasteData();
  })

  const handleDelete = async()=>{
    try {
      let res = await axios.delete(`${API_URL}/waste/${wasteId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message)
      navigate('/landing-page')
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = ()=>{
    navigate(`/edit-waste/${wasteId}`)
  }

  return <>
  <TopBar/>
  <div className="trackComplaint">
    <div className="track-form-container">
        <form>
            <h3>Welcome to Rural Development</h3>
            <p>Track Your Waste Pickup Request by your Trackig id here...</p>
            <label htmlFor="trackingId">Paste Your Tracking Id:</label>
            <div className="search-input-container">
                  <input type="text" value={trackingCode} onChange={(e)=>setTrackingCode(e.target.value)}   placeholder='tracking id'/>
                  <button><SearchIcon/></button>
            </div>
        </form>
    </div>
    <div className="complaint-view">
        <div className="tracking-left-container">
        <img src={`${API_URL}/images/${imageFile}`} />
        </div>
        <div className="tracking-right-container">
             <div>
               
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            
                <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>

             </div>
             <label htmlFor="title">Waste Type     : </label>
             <input type="text" value={type} onChange={(e)=>setType(e.target.value)}/>
             <br /> 
             <span>Waste Quantity & Location :</span>
             <div>
              <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
              <input type="text" value={district} onChange={(e)=>setDistrict(e.target.value)}/>
              <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
              <input type="text" value={locality} onChange={(e)=>setLocality(e.target.value)}/>
             </div>
             <label htmlFor="description">Description : </label>
             <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
             <div className='status-inputs'>
                <input value={status} onChange={(e)=>setStatus(e.target.value)} type="text"></input>
                <input type="text" value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)} ></input>
             </div>
             <div className='status-action-button'>
                <button className='edit-button' onClick={()=>handleEdit()}><DriveFileRenameOutlineIcon/></button>
                <button className='delete-button' onClick={()=>handleDelete()}><DeleteIcon /></button>
             </div>
             
        </div>
    </div>
  </div>
  </>
}

export default TrackWaste