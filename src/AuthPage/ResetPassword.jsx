import React, { useState } from 'react'
import './auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../App';


function ResetPassword() {
  const navigate = useNavigate()
  const [type,setType] = useState(true) 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await axios.post(`${API_URL}/user/resetPassword/${token}`, data);
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  };

  return <>
  <div className="login-page">

        <div className="login-container-right">
            <form onSubmit={handleReset} className='login-container'>
              <h1 style={{color:"white"}}>Reset Password   </h1>
              <h3>Welcome to Rural Developement </h3>
              <label htmlFor="email">Email :</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name='email' />
              <label htmlFor="password">Password :</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className='password-input' type={type?"password":"text"} name='password' autoComplete='current-password'  />
                <div onClick={()=>setType(!type)}>
                  { type? <VisibilityIcon className='eye-icon'/>:
                <VisibilityOffIcon className='eye-icon'/>}
                </div>
              <button type='submit'>Submit</button>
              {/* <span>Forgot Password?</span> */}
              <h4>Remember Your Password! <span onClick={()=>navigate('/login')}>Click to Login ...</span>   </h4>


            </form>
        </div>
  </div>
  </>
}

export default ResetPassword