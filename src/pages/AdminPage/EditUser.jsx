import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [doorNo, setDoorNo] = useState("");
    const [street, setStreet] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const userData = response.data.user;
    
                setName(userData.name);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setDoorNo(userData.address.doorNo);
                setStreet(userData.address.street);
                setLocality(userData.address.locality);
                setCity(userData.address.city);
                setDistrict(userData.address.district);
                setState(userData.address.state);
                setPincode(userData.address.pincode);
                setStatus(userData.status);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phoneNumber || !doorNo || !street || !locality || !city || !district || !state || !pincode || !status) {
            toast.error('Please fill all the fields');
        } else {
            try {
                const formData = {
                    name,
                    email,
                    phoneNumber,
                    status,
                    doorNo, 
                    street, 
                    locality , 
                    city, 
                    district , 
                    state , 
                    pincode
                };
                const response = await axios.put(`${API_URL}/user/edit/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                toast.success(response.data.message);
                navigate('/dashboard/home');
            } catch (error) {
                console.error('Error editing user:', error.response.data.message || 'Internal Server Error');
            }
        }
    };

    return (
        <div className="edit-user-page">
            <div className="edit-user-left-container">
                <img src="https://cdn2.iconfinder.com/data/icons/social-connections/500/42-512.png" alt="" />
            </div>
            <div className="edit-user-right-container">
                <form onSubmit={handleSubmit}>
                    <h4>User Details :</h4>
                    <div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile Number' />
                    </div>
                    <h4>Address Details :</h4>
                    <div className='edit-user-address-field'>
                        <input type="text" value={doorNo} onChange={(e) => setDoorNo(e.target.value)} placeholder='Door No.' />
                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Address' />
                        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} placeholder='Village' />
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                        <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='District' />
                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='State' />
                        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' />
                    </div>
                    <h4>Status :</h4>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Status</option>
                        <option value="Active">Active</option>
                        <option value="In-Active">In-Active</option>
                    </select>
                    <div className='edit-user-button-container'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
