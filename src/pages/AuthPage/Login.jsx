import React, { useState } from 'react'
import './auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../App';
import toast from 'react-hot-toast';
function Login() {
  let navigate = useNavigate()
  const [type,setType] = useState(true) 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let data = {
        email,
        password,
      };
      
      let res = await axios.post(`${API_URL}/user/login`, data);
     
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("name", res.data.name);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("userId", res.data.id);
        toast.success(res.data.message || "Login Successfull");
          navigate(`/complaint/${res.data.id}`);
        
       
      } else {
        toast.error("You are not allowed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return <>

  <div className="login-page">

    {/* <div className="login-container-left">

    </div> */}

        <div className="login-container-right">
            <form onSubmit={handleLogin} className='login-container'>
              <h3>Welcome to Rural Developement </h3>
              <h4>New to here! <span onClick={()=>navigate('/signup')}>Click to Signup ...</span>   </h4>
              <label htmlFor="email">Email :</label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name='email' />
              <label htmlFor="password">Password :</label>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='password-input' type={type?"password":"text"} name='password' autoComplete='current-password'  />
                <div onClick={()=>setType(!type)}>
                  { type? <VisibilityIcon className='eye-icon'/>:
                <VisibilityOffIcon className='eye-icon'/>}
                </div>
              <button type='submit'>Login</button>
              <span onClick={()=>navigate('/forgot-password')}>Forgot Password?</span>

            </form>
        </div>
  </div>
  </>
}

export default Login