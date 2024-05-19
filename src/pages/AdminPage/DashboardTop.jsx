import React from 'react'

function DashboardTop() {

  const name = localStorage.getItem('name')
  const date = new Date()
  const dayList = ["SUNDAY" , "MONDAY" , "TUESDAY" , "WEDNESDAY" , "THURSDAY", "FRIDAY" , "SATURDAY"]
  const monthList = ["JANUARY" ,"FEBRUARY" , "MARCH" , "APRIL" , "MAY" , "JUNE" , "JULY" , "AUGUST" , "SEPTEMBER" , "OCTOBER" , "NOVEMBER" , "DECEMBER"]
  const day = date.getDay()
  const today = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const formattedDate = dayList[day] + "   "  + today + " - " + monthList[month] + " - " + year


  return <>
  <div className="dashboard-topbar">
    <div className="topbar-name">
      <p className='right-border'>{formattedDate}</p>
       <div className='profile-container-topbar'>
        <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="" />
       <p>{name}</p>
       </div>
    </div>
  </div>
  </>
}

export default DashboardTop