import React, { useState } from 'react'
import './auth.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../App';
import toast from 'react-hot-toast';
import HomeIcon from '@mui/icons-material/Home';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


function Login() {

  let [loading , setLoading ] = useState(false)

  let navigate = useNavigate()
  const [type,setType] = useState(true) 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  


  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      let data = {
        email,
        password,
      };
      
      let res = await axios.post(`${API_URL}/user/login`, data);
     
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", res.data.id);
        toast.success(res.data.message || "Login Successfull");
          navigate(`/landing-page`);
        setLoading(false)
       
      } else {
        toast.error("You are not allowed");
      }
    } catch (error) {
      setLoading(false)
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
              {
                loading?<button className='loading-button-add-waste-sales'>Loading
                <span className='loading-dot1'><FiberManualRecordIcon/></span>
                <span className='loading-dot2'><FiberManualRecordIcon/></span>
                <span className='loading-dot3'><FiberManualRecordIcon/></span>
                 </button>:<button type='submit'>Login</button>
              }
              <span style={{cursor:"pointer"}} onClick={()=>navigate('/forgot-password')}>Forgot Password?</span>

              <span onClick={()=>navigate('/landing-page')} style={{display:"flex",justifyContent:"right",alignItems:"center",cursor:"pointer"}}>Go to Home <HomeIcon/> </span>

            </form>
        </div>
  </div>

  
  </>
}

export default Login