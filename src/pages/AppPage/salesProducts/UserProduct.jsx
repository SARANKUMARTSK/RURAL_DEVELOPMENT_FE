import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import Navbar from '../../../components/Navbar'
import SalesCard from '../../../components/SalesCard'
import axios from 'axios'
import { API_URL } from '../../../App'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { useNavigate } from 'react-router-dom'


function UserProduct() {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const fetchData = async()=>{
        try {
            let res = await axios.get(`${API_URL}/products`, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}` 
              }
          })
            let data = res.data.product
            setData(data.filter(data=>data.userId===userId));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
       fetchData()
    },[])
  return <>
  <TopBar/>
  <div className="button-end">
    <button onClick={()=>navigate(`/view-sales-product/${userId}`)}><FastRewindIcon/>Back </button>
  </div>
  <div className='view-sales-page'>
      <SalesCard data={data}/>
    </div>
  </>
}

export default UserProduct