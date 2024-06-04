import React, { useEffect, useState } from 'react';
import TopBar from '../../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';

function DetailedAnnouncement() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [data, setData] = useState({});
   const token = sessionStorage.getItem('token')

   const fetchAnnouncements = async () => {
      try {
         const res = await axios.get(`${API_URL}/announcement/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        });
         const announcement = res.data.announcement;
         setData(announcement);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchAnnouncements();
   }, [id]);

   return (
      <>
         <TopBar />
         <nav className="button-end">
            <button onClick={() => navigate('/view-announcement')}>Back</button>
         </nav>
         <div className="detailed-announcement-page">
            <div className="detailed-announcement-view">
               <h3>
                  <span>Concerned Department: </span>
                  {data.department || "Not Added"}
               </h3>
               <h4>
                  <span>Concerned District: </span>
                  {data.concernDistrict || "Not Added"}
               </h4>
               <div className="announcement-image-container">
                  <img
                     src={data.imageFile ? `${API_URL}/images/${data.imageFile}` : 'default-image-url'}
                     alt="Announcement"
                  />
               </div>
               <div>
                  <h2>Scheme Details:</h2>
                  <div>
                     <span>Title / Name: </span>
                     {data.schemeDetails?.title || "Not Added"}
                  </div>
                  <div>
                     <span>Associated Scheme: </span>
                     {data.schemeDetails?.schemeNo || "Not Added"}
                  </div>
                  <div>
                     <span>
                     Sponsored By: </span>
                     {data.schemeDetails?.sponcer || "Not Added"}
                  </div>
                  <div>
                     <span>Funding Pattern: </span>
                     {data.schemeDetails?.pattern || "Not Added"}
                  </div>
               </div>
               <div>
                  <div>
                     <span>Beneficiaries: </span>
                     {data.beneficiaries || "Not Added"}
                  </div>
               </div>
               <div>
                  <h2>Eligibility criteria:</h2>
                  <div>
                     <span>Income: </span>
                     {data.eligibility?.income || "Not Added"}
                  </div>
                  <div>
                     <span>Age: </span>
                     {data.eligibility?.age || "Not Added"}
                  </div>
                  <div>
                     <span>Community: </span>
                     {data.eligibility?.community || "Not Added"}
                  </div>
               </div>
               <div>
                  <div>
                     <span>How To Avail: </span>
                     {data.step || "Not Added"}
                  </div>
               </div>
               <div>
                  <h2>Validity of the Scheme:</h2>
                  <div>
                     <span>Introduced On: </span>
                     {data.createdAt ? data.createdAt.split('T')[0] : "Not Added"}
                  </div>
                  <div>
                     <span>Valid Upto: </span>
                     {data.endingDate ? data.endingDate.split('T')[0] : "Not Added"}
                  </div>
                  <div>
                     <span>Description: </span>
                     {data.description || "Not Added"}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default DetailedAnnouncement;
