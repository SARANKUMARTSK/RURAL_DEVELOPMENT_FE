import React from 'react'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CollectionsIcon from '@mui/icons-material/Collections';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

function About() {
  let navigate = useNavigate()
  return <>
  <div className="about-page">
    <div className="about-left-container">
      
     <h2>Building Stronger Communities, One Rural Step at a Time. Together, We Shape the Future.</h2>
     
    </div>

    <div className="about-right-container">
      {/* <div className="documents"><ReceiptLongIcon/>Documents</div> */}
      <div className="contacts" onClick={()=>navigate('/signup')}><ContactPageIcon/>Signup</div>
      {/* <div className="gallery"><CollectionsIcon/>Gallery</div> */}
      <div onClick={()=>navigate('/login')} className="login"><ExitToAppIcon/>Login</div>

    </div>
    
  </div>
  </>
}

export default About