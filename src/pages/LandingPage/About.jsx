import React from 'react'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import toast from 'react-hot-toast';

function About() {
  let navigate = useNavigate()
  const name = localStorage.getItem('name')

  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/landing-page')
    toast.success("Logout Successfull")
  }
  
  return <>
  <div className="about-page">
    <div className="about-left-container">
      
     <h2>Building Stronger Communities, One Rural Step at a Time. Together, We Shape the Future.</h2>
     
    </div>

    <div className="about-right-container">
      {
        name && <div className='logout-home' onClick={()=>handleLogout()}><NoAccountsIcon/>Logout from <br />&nbsp;&nbsp; {name}</div>
      }
      
     {
      !name && <div className="contacts" onClick={()=>navigate('/signup')}><ContactPageIcon/>Signup</div>
     }
     {
      !name &&  <div onClick={()=>navigate('/login')} className="login"><ExitToAppIcon/>Login</div>
     }

      
      

    </div>
    
  </div>
  </>
}

export default About