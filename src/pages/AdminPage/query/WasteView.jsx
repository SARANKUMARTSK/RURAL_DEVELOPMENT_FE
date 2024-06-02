import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

function WasteView() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/waste/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = res.data.waste;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${API_URL}/waste/${data._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(res.data.message || "Deleted Successfully");
      navigate('/waste-list'); // Navigate to waste list or any appropriate page after deletion
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className='button-end'>
        <button onClick={() => navigate(`/dashboard/waste-collection`)}>Back</button>
      </nav>
      <div className="your-queries-page">
        <div className="your-queries">
          <div className="your-queries-left">
            <img src={`${API_URL}/images/${data.imageFile}`} alt="Query Image" />
          </div>
          <div className="your-queries-right">
            <h2>{data.type}</h2>
            <p>{data.description}</p>
            <div className='query-sub-container'>
              <div style={{ gap: "19px" }}>
                <div><span className='color-theme'> Name:</span>{data.userName}</div>
                <div><span className='color-theme'> Email:</span>{data.email}</div>
                <div><span className='color-theme'> Phone Number:</span>{data.phoneNumber}</div>
                <div><span className='color-theme'> Quantity :</span>{data.quantity} Kg</div>
                <div><span className='color-theme'> Village :</span>{data.locality}</div>
                <div><span className='color-theme'> City :</span>{data.city}</div>
                <div><span className='color-theme'> District :</span>{data.district}</div>
                <div style={{ color: "white" }} className={`shadow-border-box ${data.createdAt.split('T')[0] === formattedToday ? "backgroundcolor-green" : ''}
                 ${data.createdAt === formattedYesterday ? "backgroundcolor-orange" : ''}
                 ${data.createdAt <= formattedDayBefore ? "backgroundcolor-red" : ''}`}><span> Query Date:</span><span>{data.createdAt ? data.createdAt.split('T')[0] : "---"}</span></div>
              </div>
              <div>
                <div className={`shadow-border-box ${data.status === "Registered" ? "backgroundcolor-orange" : ""}
                  ${data.status === "Assigned" ? "backgroundcolor-green" : ""}`}><span>Status :</span>{data.status}</div>
                <div className='shadow-border-box'><span className='color-theme'>Assigned To :</span>{data.assignedTo}</div>
                <div className='shadow-border-box'><span className='color-theme'>Contact Number: </span>{data.assignedContact}</div>
                <div className='shadow-border-box'><span className='color-theme'>Contact Email :</span>{data.assignedEmail}</div>
                <div className='shadow-border-box'><span className='color-theme'>Assigned Date :</span>{data.assignedDate ? data.assignedDate.split('T')[0] : "Date Not Found"}</div>
                <div className='shadow-border-box'><span className='color-theme'>Estimate Date :</span>{data.estimateDate ? data.estimateDate.split('T')[0] : "Date Not Found"}</div>
                <div className='shadow-border-box'><span className='color-theme'>Completed Date :</span>{data.completedDate ? data.completedDate.split('T')[0] : "Not Collected"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WasteView;
