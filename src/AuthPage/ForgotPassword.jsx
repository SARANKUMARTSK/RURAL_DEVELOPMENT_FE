import React, { useState } from 'react'
import './auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../App';


function ForgotPassword() {
  const navigate = useNavigate()
  const [type,setType] = useState(true) 

  let [email,setEmail] = useState('')

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/user/forgotPassword`, {email});
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  return <>
  <div className="login-page">

        <div className="login-container-right">
            <form className='login-container' onSubmit={handleForgot}>
                <h1 style={{color:"white"}}>Reset Password</h1>
                
              <h3>Welcome Back to Rural Developement </h3>
              <label htmlFor="name">Name :</label>
              <input type="name" name='name' />
              <label htmlFor="email">Email :</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className='password-input' type="email" name='email' />
                
              <button type='submit'>Submit</button>
              {/* <span>Forgot Password?</span> */}
              <h4>Remember Your Password! <span onClick={()=>navigate('/login')}>Click to Login ...</span>   </h4>


            </form>
        </div>
  </div>
  </>
}

export default ForgotPassword