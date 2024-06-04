import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';

function YourComplaints() {
    const navigate = useNavigate()
    const {id} = useParams()
    const token = localStorage.getItem('token')
    const [data,setData] = useState([])

    const fetchCoplaints = async()=>{
        try {
          let res = await axios.get(`${API_URL}/complaints`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}` 
              }
          })
          let data = res.data.complaint
          setData(data.filter((data)=>data.userId===id))
          
        } catch (error) {
          console.log(error);
        }
     }

    useEffect(()=>{
       fetchCoplaints()
    },[data])

    const handleDelete =(e)=>{
        let res = axios.delete(`${API_URL}/complaints/${e._id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
        toast.success('Your Complaint Deleted Successfully')
    }

  return <>
  <TopBar/>
  <nav className='button-end' >
    <button onClick={()=>navigate('/landing-page')}><HomeIcon/>Home</button>
    <button onClick={()=>navigate(`/add-complaint/${id}`)}>+Add Complaint</button>
  </nav>

  <div className="your-complaints">
    {
        !data.length&& <div>No Complaints Found</div>
    }
     {
        data.map((e,i)=>{
            return <div key={i} className="your-complaint-card">
            <div className='complaiint-card-left'>
                <img src={`${API_URL}/images/${e.imageFile}`} alt="" />
            </div>
            <div className='complaiint-card-right'>
                <h3>{e.title}</h3>
                <p>{e.description}</p>
                <div className='comlaint-sub-container'>
                    <div>
                        <div><span>Name : </span>{e.userName}</div>
                        <div><span>Email : </span>{e.userEmail}</div>
                        <div><span>Phone Number : </span>{e.userPhoneNumber}</div>
                        <div><span>Village : </span>{e.locality}</div>
                        <div><span>City : </span>{e.city}</div>
                        <div><span>Complaint Date : </span>{e.createdAt.split('T')[0]}</div>
                    </div>
                    <div>
                        <div><span>Status : </span>{e.status}</div>
                        <div><span>Assigned To : </span>{e.assignedTo}</div>
                        <div><span>Contact : </span>{e.assignedContact?e.assignedContact:"Not-Assigned"}</div>
                        <div><span>Assigned Date : </span>{e.assignedDate?e.assignedDate.split('T')[0]:"Not-Assigned"}</div>
                        <div><span>Estimate Date : </span>{e.expectedDate?e.expectedDate.split('T')[0]:"Not-Assigned"}</div>
                        <div><span>Completed Date : </span>{e.completionDate?e.completionDate:"Not-Completed"}</div>
                    </div>
                </div>
                <div className='complaint-action-button'>
                    <button className='edit-button' onClick={()=>navigate(`/edit-complaint/${e._id}`)}>Edit</button>
                    <button className='delete-button' onClick={()=>handleDelete(e)}>Delete</button>
                </div>
            </div>
         </div>
        })
     }
  </div>
  </>
}

export default YourComplaints