import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../App'

function Conversation({conversation}) {
  
  const [user,setUser]= useState(null)
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  

  useEffect(()=>{
    const friendId = conversation?.members?.find(m=>m !== userId)
    const getUser = async()=>{
      try {
        const res = await axios.get(`${API_URL}/user/${friendId}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
        setUser(res.data.user);

      } catch (error) {
        console.log(error);
      }
    }
    getUser();

  },[userId ,conversation])


  return <>
  <div className="conversation">
    <img className='conversationImg' src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
    <span className='conversationName'>{user?user.name:""}</span>
  </div>
  </>
}

export default Conversation