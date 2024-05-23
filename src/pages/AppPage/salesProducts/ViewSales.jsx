import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import SalesCard from '../../../components/SalesCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import HomeIcon from '@mui/icons-material/Home';

function ViewSales() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const [city,setCity] = useState("")
  const [data,setData] = useState([])
  
  const fetchData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/products`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      let data = res.data.product
      city==""?setData(data):setData(data.filter(data=>data.city===city));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
   fetchData();
  },[city])

  return <>

  <TopBar/>
    <div className="view-sales-search-bar">
        <select onChange={(e)=>setCity(e.target.value)}>
          <option value="">Select City Name</option>
          <option value="Pollachi">Pollachi</option>
          <option value="Anaimalai">Anaimalai</option>
          <option value="Udumalpet">Udumalpet</option>
          <option value="Dharapuram">Dharapuram</option>
        </select>

        {
          userId? 
          <div>
            <button onClick={()=>navigate(`/user-sales-product/${userId}`)} className='sales-nav-buttons'>Your Products</button>
            <button className='sales-nav-buttons' onClick={()=>navigate(`/add-sales-product/${userId}`)}>Add New +</button>
            <button className='sales-nav-buttons' onClick={()=>navigate(`/landing-page`)}>Home</button>
          </div>:""
        }

        
    </div>
    <div className='view-sales-page'>
      <SalesCard data={data}/>
    </div>
  
  </>
}

export default ViewSales