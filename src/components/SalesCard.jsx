import React, { useEffect, useState } from 'react';
import './components.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';
import toast from 'react-hot-toast';

function SalesCard({ data }) {
  
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
  
    const token = sessionStorage.getItem('token')

    const handleDelete = async (e) => {
        try {
            let res = await axios.delete(`${API_URL}/products/${e._id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            toast.success(res.data.message);
            setData(data.filter(item => item._id !== e._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (e) => {
        navigate(`/edit-sales-product/${e._id}`);
    };

    return (
        <>
            {data.map((e, i) => (
                <div key={i} className="sales-card">
                    <div className="sales-card-left">
                        <img src={`${API_URL}/images/${e.imageFile}`} alt={e.product} />
                    </div>
                    <div className="sales-card-right">
                        <h2>{e.product}</h2>
                        <p><span><CurrencyRupeeIcon />{e.price} Rs</span> Per {e.unit}</p>
                        <p>{e.quantity} {e.unit} Available</p>
                        <p>{e.description}</p>
                        <span>{e.city} / {e.district}</span>
                        <h4>{e.status}</h4>
                        <div className="sales-card-address">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" alt="seller" />
                            <div>
                                <span>{e.name}</span>
                                <span>{e.email}</span>
                                <span>{e.phoneNumber}</span>
                            </div>
                        </div>
                        {userId === e.userId &&
                            <div className='space-around'>
                                <button className='edit-sales-button' onClick={() => handleEdit(e)}><DriveFileRenameOutlineIcon /></button>
                                <button className='delete-sales-button' onClick={() => handleDelete(e)}><DeleteIcon /></button>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </>
    );
}

export default SalesCard;
