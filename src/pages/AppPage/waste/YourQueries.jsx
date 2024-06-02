import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import axios from 'axios'
import {API_URL} from '../../../App'
import { useNavigate, useParams } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast'
// import '../../AdminPage/dashboard.css'
function YourQueries() {
  const token = localStorage.getItem('token')
  let [data,setData] = useState([])
  let {id} = useParams()
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');



  let fetchData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/waste`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      let data = res.data.waste
      setData(data.filter((data)=>data.userId===id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[data])

  const handleDelete =async(e)=>{
    try {
      let res = await axios.delete(`${API_URL}/waste/${e._id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message||"Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }



  return <>
  <TopBar/>
  <nav className='button-end'>
      <button onClick={()=>navigate(`/add-waste/${userId}`)}>Back</button>
  </nav>
  <div className="your-queries-page">
      {
        !data.length && <div>No Data Found</div>
      }
      {
        data.map((e,i)=>{
          return <div key={i} className="your-queries">

          <div className="your-queries-left">
              <img src={`${API_URL}/images/${e.imageFile}`} alt="" />
          </div>
  
          <div className="your-queries-right">
              <h2>{e.type} </h2>
              <p>{e.description}</p>
              <div className='query-sub-container'>
              <div style={{gap:"19px"}}>
                 <div><span className='color-theme'> Name:</span>{e.userName}</div>
                 <div><span className='color-theme'> Email:</span>{e.email}</div>
                 <div><span className='color-theme'> Phone Number:</span>{e.phoneNumber}</div>
                 <div><span className='color-theme'> Quantity :</span>{e.quantity} Kg</div>
                 <div><span className='color-theme'> Village :</span>{e.locality}</div>
                 <div><span className='color-theme'> City :</span>{e.city}</div>
                 <div><span className='color-theme'> District :</span>{e.district}</div>
                 <div style={{color:"white"}} className={`shadow-border-box ${e.createdAt.split('T')[0]==formattedToday?"backgroundcolor-green":''}
                 ${e.createdAt==yesterday?"backgroundcolor-orange":''}
                 ${e.createdAt<=dayBefore?"backgroundcolor-red":''}`}><span> Query Date:</span><span>{e.createdAt?e.createdAt.split('T')[0]:"---"}</span></div>
  
              </div>
              <div>
                  <div className={`shadow-border-box ${e.status==="Registered"?"backgroundcolor-orange":""}
                  ${e.status==="Assigned"?"backgroundcolor-green":""}`}><span>Status :</span>{e.status}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Assigned To :</span>{e.assignedTo}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Contact Number: </span>{e.assignedContact}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Contact Email :</span>{e.assignedEmail}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Assigned Date :</span>{e.assignedDate?e.assignedDate:"Date Not Found"}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Estimate Date :</span>{e.estimateDate?e.estimateDate:"Date Not Found"}</div>
                  <div className='shadow-border-box'><span className='color-theme'>Completed Date :</span>{e.completedDate?e.completedDate:"Not Collected"}</div>
              </div>
              
              </div>
              <div className='complaint-action-button'>
                    <button className='edit-button' onClick={()=>navigate(`/edit-waste/${e._id}`)}>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='delete-button' onClick={()=>handleDelete(e)}>Delete</button>
                </div>
          </div>
  
        </div>
        })
      }
  </div>
  </>
}

export default YourQueries