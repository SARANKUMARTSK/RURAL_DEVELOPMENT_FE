import React from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        sessionStorage.clear();
        navigate('/landing-page')
    }
  return <>
  <div className="sidebar">
    <ul>
        <li className='app-icon-dashboard'>
            <i><AgricultureIcon/></i>
            <p>RURAL APP</p>
        </li>
        <hr className='sidebar-hr'/>

        <li onClick={()=>navigate('/dashboard/home')} className='dashboard-nav'>
            <i><DashboardCustomizeIcon/></i>
            <p>Dashboard</p>
        </li>

        <hr className='sidebar-hr'/>

        <div className="sidebar-heading">
                Actions
        </div>
        
        <li onClick={()=>navigate('/dashboard/complaints')} >
            <i><LibraryAddCheckIcon/></i>
            <p>Complaints</p>
        </li>

        <li onClick={()=>navigate('/dashboard/waste-collection')} >
            <i><AutoDeleteIcon/></i>
            <p>Waste Collection</p>
        </li>

        <hr className='sidebar-hr'/>

        <div className="sidebar-heading">
                Officials
        </div>

        <li onClick={()=>navigate('/dashboard/contacts')} >
            <i><PermContactCalendarIcon/></i>
            <p>Contacts</p>
        </li>

        <li onClick={()=>navigate('/view-announcement')} >
            <i><NewReleasesIcon/></i>
            <p>Announcement</p>
        </li>

        <hr className='sidebar-hr'/>

        <div className="sidebar-heading">
                User
        </div>

        <li onClick={()=>navigate('/dashboard/users')}>
            <i><PersonSearchIcon/></i>
            <p>Users</p>
        </li>

        <li onClick={()=>handleLogout()}>
            <i><PowerSettingsNewIcon/></i>
            <p>Logout</p>
        </li>

        
    </ul>
  </div>
  </>
}

export default Sidebar