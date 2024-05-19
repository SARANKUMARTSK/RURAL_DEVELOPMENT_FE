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

function TrackComplaint() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [userName, setUserName] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userPhoneNumber,setUserPhoneNumber] = useState("")
  const [title , setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [status,setStatus] = useState("")
  const [assignedTo,setAssignedTo] = useState("")
  const {referenceLink} = useParams()
  const [complaintId , setComplaintId] = useState("")
  const [imageFile , setImageFile] = useState(null)

  const fetchStatus = async()=>{
    try {
      let complaint = await axios.get(`${API_URL}/complaints/${referenceLink}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
    
      
       setUserName(complaint.data.complaint.userName)
       setUserEmail(complaint.data.complaint.userEmail)
       setUserPhoneNumber(complaint.data.complaint.userPhoneNumber)
       setTitle(complaint.data.complaint.title)
       setDescription(complaint.data.complaint.description)
       setStatus(complaint.data.complaint.status)
       setAssignedTo(complaint.data.complaint.assignedTo)
       setComplaintId(complaint.data.complaint._id)
       setImageFile(complaint.data.complaint.imageFile)
       
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(()=>{
    fetchStatus()
  },[])

  const handleDelete = async()=>{
    try {
      let res = await axios.delete(`${API_URL}/complaints/${complaintId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message)
      navigate('/landing-page')
    } catch (error) {
      console.log(error.response.data.message);

    }
  }

  const handleEdit =()=>{
    navigate(`/edit-complaint/${complaintId}`)
  }

  return <>
  <TopBar/>
  <div className="trackComplaint">
    <div className="track-form-container">
        <form>
            <h3>Welcome to Rural Development</h3>
            <p>Track Your Complaint by your Complaint id here...</p>
            <label htmlFor="trackingId">Only You can Track Your Complaints:</label>
            <div className="search-input-container">
                  <input type="text" value={referenceLink} readOnly placeholder='tracking id'/>
                  <button><SearchIcon/></button>
            </div>
        </form>
    </div>
    <div className="complaint-view">
        <div className="tracking-left-container">
              <img src={`${API_URL}/images/${imageFile}`} alt="Dynamic Image" />
        </div>
        <div className="tracking-right-container">
             <div>
               
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                
                <input type="text" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}  />
            
                <input type="text" value={userPhoneNumber} onChange={(e)=>setUserPhoneNumber(e.target.value)} />

             </div>
             <label htmlFor="title">Complaint : </label>
             <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
             <label htmlFor="description">Description : </label>
             <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
             <div className='status-inputs'>
                <input type="text" value={status} onChange={(e)=>setStatus(e.target.value)}></input>
                <input type="text" value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}></input>
             </div>
             <div className='status-action-button'>
                <button onClick={()=>handleEdit()} className='edit-button'><DriveFileRenameOutlineIcon/></button>
                <button onClick={()=>handleDelete()} className='delete-button'><DeleteIcon/></button>
             </div>
             
        </div>
    </div>
  </div>
  </>
}

export default TrackComplaint