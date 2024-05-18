import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import  "../pages/LandingPage/landing.css"
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CollectionsIcon from '@mui/icons-material/Collections';


import { useNavigate } from 'react-router-dom';

function TopBar() {

  const navigate = useNavigate()
    
  return <>
  <div className="topbar-landing-page">
    <div className='topbar-left'>
        <img src="https://www.meskp.org/wp-content/uploads/2020/01/Rural-Development-1.jpg"  />
    </div>
    <div className='topbar-center'>
        <h1>Rural Development and Waste Management</h1>
    </div>
  </div>
  
  </>
}

export default TopBar