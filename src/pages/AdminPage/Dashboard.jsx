import React from 'react'
import './dashboard.css'
import Sidebar from './Sidebar'
import DashboardTop from './DashboardTop'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return <>
  <div className="dashboard-wrapper">
      <div className="sidebar-wrapper">
          <Sidebar/>
      </div>

      <div className="content-wrapper">
        <DashboardTop/>
        <div className="container-fluid">
          
          <Outlet/>
        </div>
      </div>
  </div>
  </>
}

export default Dashboard