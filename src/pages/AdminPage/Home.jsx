import React, { useEffect, useState } from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import axios from 'axios';
import { API_URL } from '../../App';

function Home() {
    const [complaintsCount, setComplaintsCount] = useState(0);
    const [registered, setRegistered] = useState(0);
    const [assigned, setAssigned] = useState(0);
    const [wasteCount, setWasteCount] = useState(0);
    const [wasteRegistered, setWasteRegistered] = useState(0);
    const [wasteAssigned, setWasteAssigned] = useState(0);
    const token = localStorage.getItem('token')

    const fetchComplaints = async () => {
        try {
            const res = await axios.get(`${API_URL}/complaints`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        });
            const data = res.data.complaint;
            setComplaintsCount(data.length);
            setRegistered(data.filter(item => item.status === "Registered").length);
            setAssigned(data.filter(item => item.status === "Assigned").length);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWasteQueries = async () => {
        try {
            const res = await axios.get(`${API_URL}/waste`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            const data = res.data.waste;
            setWasteCount(data.length);
            setWasteRegistered(data.filter(item => item.status === "Registered").length);
            setWasteAssigned(data.filter(item => item.status === "Assigned").length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchComplaints();
        fetchWasteQueries();
    }, []);

    const complaints = [
        {
            title: "COMPLAINTS",
            qty: complaintsCount
        },
        {
            title: "ASSIGNED",
            qty: assigned
        },
        {
            title: "UN-ASSIGNED",
            qty: registered
        }
    ];

    const queries = [
        {
            title: "REQUESTS",
            qty: wasteCount
        },
        {
            title: "ASSIGNED",
            qty: wasteAssigned
        },
        {
            title: "UN-ASSIGNED",
            qty: wasteRegistered
        }
    ];

    return (
        <div className="home-dashboard">
            <h2 className='home-sub-heading'>Complaints Status</h2>
            <div className="dashboard-card-container">
                {complaints.map((e, i) => (
                    <div key={i} className={`dashboard-card ${e.title === "COMPLAINTS" ? "border-left-orange" : e.title === "ASSIGNED" ? "border-left-green" : "border-left-red"}`}>
                        <div className='card-left'>
                            <h4 className={`${e.title === "COMPLAINTS" ? "color-orange" : e.title === "ASSIGNED" ? "color-green" : "color-red"}`}>{e.title}</h4>
                            <span className='color-gray'>{e.qty}</span>
                        </div>
                        <div className='card-right'>
                            {e.title === "COMPLAINTS" && <i><ListAltIcon /></i>}
                            {e.title === "ASSIGNED" && <i><PlaylistAddCheckCircleIcon /></i>}
                            {e.title === "UN-ASSIGNED" && <i><DoubleArrowOutlinedIcon /></i>}
                        </div>
                    </div>
                ))}
            </div>
            <h2 className='home-sub-heading'>Waste Queries</h2>
            <div className="dashboard-card-container">
                {queries.map((e, i) => (
                    <div key={i} className={`dashboard-card ${e.title === "REQUESTS" ? "border-left-orange" : e.title === "ASSIGNED" ? "border-left-green" : "border-left-red"}`}>
                        <div className='card-left'>
                            <h4 className={`${e.title === "REQUESTS" ? "color-orange" : e.title === "ASSIGNED" ? "color-green" : "color-red"}`}>{e.title}</h4>
                            <span className='color-gray'>{e.qty}</span>
                        </div>
                        <div className='card-right'>
                            {e.title === "REQUESTS" && <i><ListAltIcon /></i>}
                            {e.title === "ASSIGNED" && <i><PlaylistAddCheckCircleIcon /></i>}
                            {e.title === "UN-ASSIGNED" && <i><DoubleArrowOutlinedIcon /></i>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
