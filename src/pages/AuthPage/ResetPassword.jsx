import React, { useState } from 'react'
import './auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {API_URL} from '../../App'


function ResetPassword() {
  const navigate = useNavigate()
  const [type,setType] = useState(true) 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { token } = useParams();
  const [loading,setLoading] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { email, password };
      const res = await axios.post(`${API_URL}/user/resetPassword/${token}`, data);
      toast.success(res.data.message);
      navigate('/login');
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  return <>
  <div className="login-page">

        <div className="login-container-right">
            <form onSubmit={handleReset} className='login-container'>
              <h1 style={{color:"gray"}}>Reset Password   </h1>
              <h3>Welcome to Rural Developement </h3>
              <label htmlFor="email">Email :</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name='email' />
              <label htmlFor="password">Password :</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className='password-input' type={type?"password":"text"} name='password' autoComplete='current-password'  />
                <div onClick={()=>setType(!type)}>
                  { type? <VisibilityIcon className='eye-icon'/>:
                <VisibilityOffIcon className='eye-icon'/>}
                </div>
                {
                loading?<button className='loading-button-add-waste-sales'>Loading
                <span className='loading-dot1'><FiberManualRecordIcon/></span>
                <span className='loading-dot2'><FiberManualRecordIcon/></span>
                <span className='loading-dot3'><FiberManualRecordIcon/></span>
                 </button>:<button type='submit'>Login</button>
              }
              <h4>Remember Your Password! <span onClick={()=>navigate('/login')}>Click to Login ...</span>   </h4>


            </form>
        </div>
  </div>
  </>
}

export default ResetPassword