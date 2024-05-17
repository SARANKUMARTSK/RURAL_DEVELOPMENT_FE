import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import Navbar from '../../../components/Navbar'
import SalesCard from '../../../components/SalesCard'
import axios from 'axios'
import { API_URL } from '../../../App'

function UserProduct() {
    const userId = sessionStorage.getItem('userId')
    const [data,setData] = useState([])
    const fetchData = async()=>{
        try {
            let res = await axios.get(`${API_URL}/products`)
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
  <Navbar/>
  <div className='view-sales-page'>
      <SalesCard data={data}/>
    </div>
  </>
}

export default UserProduct