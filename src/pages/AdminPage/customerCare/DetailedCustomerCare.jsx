import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function DetailedCustomerCare() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const [pincode, setPincode] = useState('');
    const { id } = useParams();

    const fetchCustomerQuery = async () => {
        try {
            let res = await axios.get(`${API_URL}/customerCare/${id}`);
            let data = res.data.query;
            setName(data.name);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setTitle(data.title);
            setQuery(data.query);
            setCreatedAt(data.createdAt);
            setCity(data.city);
            setDistrict(data.district);
            setStatus(data.status);
            setPincode(data.pincode);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCustomerQuery();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = {status}
            let edited = await axios.put(`${API_URL}/customerCare/${id}`, payload);
            toast.success(edited.data.message);
            navigate('/dashboard/customer-care-queries');
        } catch (error) {
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    };

    return (
        <>
            <nav className='button-end'>
                <button onClick={() => navigate('/dashboard/customer-care-queries')}>Back</button>
            </nav>
            <div className='center'>
                <form onSubmit={handleSubmit} className="customer-care-complaint">
                    <div>
                        <div><input type="text" readOnly value={name} /></div>
                        <div><input type="text" readOnly value={email} /></div>
                        <div><input type="text" readOnly value={phoneNumber} /></div>
                        <div><input type="text" readOnly value={city} /></div>
                        <div><input type="text" readOnly value={district} /></div>
                        <div><input type="text" readOnly value={pincode} /></div>
                        <div><DriveFileRenameOutlineIcon/><input placeholder='status' type="text" value={status} onChange={(e) => setStatus(e.target.value)} /></div>
                        <div><input type="date" readOnly value={createdAt ? createdAt.split('T')[0] : ""} /></div>
                    </div>
                    <input type="text" readOnly value={title} />
                    <textarea readOnly value={query}></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default DetailedCustomerCare;
