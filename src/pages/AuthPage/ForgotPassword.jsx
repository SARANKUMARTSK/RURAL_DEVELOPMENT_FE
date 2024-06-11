import React, { useState } from 'react'
import './auth.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {API_URL} from '../../App'



function ForgotPassword() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [type,setType] = useState(true) 
  const [loading,setLoading] = useState(false)

  let [email,setEmail] = useState('')

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let res = await axios.post(`${API_URL}/user/forgotPassword`, {email}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };


  return <>
  <div className="login-page">

        <div className="login-container-right">
            <form className='login-container' onSubmit={handleForgot}>
                <h1 style={{color:"gray"}}>Reset Password</h1>
                
              <h3>Welcome Back to Rural Developement </h3>
              <label htmlFor="name">Name :</label>
              <input type="name" />
              <label htmlFor="email">Email :</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className='password-input' type="email" name='email' />
                
              {
                loading?<button className='loading-button-add-waste-sales'>Loading
                <span className='loading-dot1'><FiberManualRecordIcon/></span>
                <span className='loading-dot2'><FiberManualRecordIcon/></span>
                <span className='loading-dot3'><FiberManualRecordIcon/></span>
                 </button>:<button type='submit'>Login</button>
              }
              {/* <span>Forgot Password?</span> */}
              <h4>Remember Your Password! <span onClick={()=>navigate('/login')}>Click to Login ...</span>   </h4>


            </form>
        </div>
  </div>
  </>
}

export default ForgotPassword