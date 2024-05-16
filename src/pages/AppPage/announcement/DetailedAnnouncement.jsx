import React from 'react'
import TopBar from '../../../components/TopBar'

function DetailedAnnouncement() {
    
  return <>
  <TopBar/> 
  <div className="announcement-detailed-view">
    <div className="left-announcement-container">
      <img src="https://d3ddkgxe55ca6c.cloudfront.net/assets/t1495653155/a/26/96/formal-letter-template-1620569.jpg" alt="" />
      
    </div>
    <div className="right-announcement-container">
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit</h3>
        <div>
            <p><span>From :</span> Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div>
            <p><span>To :</span> Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div>
            <p><span>Announcement :</span> Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div>
           <label htmlFor="createdAt">Starting Date :</label> <input type="date" />
           <label htmlFor="endingDate">Ending Date :</label> <input type="date" />
        </div>
        <button>Download</button>
    </div>
  </div>
  </>
}

export default DetailedAnnouncement