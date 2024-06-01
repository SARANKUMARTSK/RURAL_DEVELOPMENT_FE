import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../App';
import FastRewindIcon from '@mui/icons-material/FastRewind';

function ComplaintView() {
    const navigate = useNavigate()
    const {id} = useParams()
    const token = localStorage.getItem('token')
    const [data,setData] = useState([])

    useEffect(()=>{
       const fetchCoplaints = async()=>{
          try {
            let res = await axios.get(`${API_URL}/complaints/byId/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            })
            let data = res.data.complaint
            setData(data)
            
          } catch (error) {
            console.log(error);
          }
       }
       fetchCoplaints()
    },[])

   
  return <>


   <nav className='space-between'>
   <h1 className='complaint-person'>Mr.
  {data.userName ? `${data.userName.charAt(0).toUpperCase()}${data.userName.substring(1).toLowerCase()}` : ''}'s Complaint
</h1>
  <button className='back-button' onClick={()=>navigate('/dashboard/complaints')}><FastRewindIcon/>Back</button>
   </nav>
  <div className="complaint-detailed-view">
    <div className="complaint-detailed-view-card">
        <div className="detailed-view-card-left">
             <img src={`${API_URL}/images/${data.imageFile}`} alt="" />
        </div>

        <div className="detailed-view-card-right">
               <h2>{data.title}</h2>
                <p>{data.description}</p>
                <div className='detailed-view-sub-container'>
                    <div>
                        <div><span>Name : </span>{data.userName}</div>
                        <div><span>Email : </span>{data.userEmail}</div>
                        <div><span>Phone Number : </span>{data.userPhoneNumber}</div>
                        <div><span>Complaint Date : </span>{data.createdAt?data.createdAt.split('T')[0]:""}</div>
                    </div>
                    <div>
                        <div className={
                          `${data.status==="Assigned"?"complaint-date-div backgroundcolor-green":""}
                           ${data.status==="Registered"?"complaint-date-div backgroundcolor-orange":""}
                           `}><span style={{color:"white"}}>Status : </span>{data.status}</div>
                        <div><span>Assigned To : </span>{data.assignedTo}</div>
                        <div><span>Contact : </span>{data.assignedContact?data.assignedContact:"Not-Assigned"}</div>
                        <div><span>Assigned Date : </span>{data.assignedDate?data.assignedDate.split('T')[0]:"Not-Assigned"}</div>
                        <div><span>Estimate Date : </span>{data.expectedDate?data.expectedDate.split('T')[0]:"Not-Assigned"}</div>
                        <div><span>Completed Date : </span>{data.completionDate?data.completionDate.split('T')[0]:"Not-Completed"}</div>
                    </div>
                </div>
        </div>
    </div>
  </div>
  
  </>
}

export default ComplaintView