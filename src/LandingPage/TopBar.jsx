import React, { useEffect,useState } from 'react'
import  "./landing.css"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

function TopBar() {
  let dateString = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                "September", "October", "November", "December"];
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    let date = dateString.getDate() + "-" + months[dateString.getMonth()] + "-" + dateString.getFullYear() 
    setFormattedDate(date)
  },[]);
  

    
    
  return <>
  <div className="topbar">
    <div className='topbar-left'>
        <img src="https://www.meskp.org/wp-content/uploads/2020/01/Rural-Development-1.jpg"  />
    </div>
    <div className='topbar-center'>
        <h1>Rural Development and Waste Management</h1>
    </div>
    <div className='topbar-right'>
       {formattedDate}
    </div>
  </div>

  
  </>
}

export default TopBar