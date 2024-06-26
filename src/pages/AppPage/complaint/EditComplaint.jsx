import React, { useEffect, useState } from 'react';
import TopBar from '../../../components/TopBar';
import '../app.css';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';

function EditComplaint() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token')

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [locality, setLocality] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComplaintData = async () => {
        try {
            const response = await axios.get(`${API_URL}/complaints/byId/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            const { complaint } = response.data;
            setUserName(complaint.userName);
            setUserEmail(complaint.userEmail);
            setUserPhoneNumber(complaint.userPhoneNumber);
            setLocality(complaint.locality);
            setCity(complaint.city);
            setDistrict(complaint.district);
            setState(complaint.state);
            setPincode(complaint.pincode);
            setDepartment(complaint.department);
            setTitle(complaint.title);
            setDescription(complaint.description);
            setImage(complaint.imageFile);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComplaintData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!userName || !userEmail || !userPhoneNumber || !locality || !city || !district || !state || !pincode || !department || !title || !description) {
                toast.error("Please Fill All The Fields");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("userEmail", userEmail);
            formData.append("userPhoneNumber", userPhoneNumber);
            formData.append("imageFile", imageFile);
            formData.append("prevImage", image);
            formData.append("locality", locality);
            formData.append("city", city);
            formData.append("district", district);
            formData.append("state", state);
            formData.append("pincode", pincode);
            formData.append("department", department);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("userId", userId);

            let res = await axios.put(`${API_URL}/complaints/${id}`,formData )

            toast.success(res.data.message);
            setLoading(false);
            navigate(`/your-complaints/${userId}`);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            console.error("Error in handleSubmit:", error);
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <>
            <TopBar />
            <div className="complaint-page">
                <div className="complaint-top">
                    <h2>Edit Your Complaint Here...</h2>
                    <div className="button-container">
                        <button className='home-button' onClick={() => navigate(`/your-complaints/${userId}`)}><FastRewindIcon />Back</button>
                    </div>
                </div>
                <div className="complaint-form">
                    <form onSubmit={handleSubmit}>
                        <h3>Personal Details :<span>*</span></h3>
                        <div className="complaint-personal-details">
                            <input type="text" placeholder='Name' name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <input type="text" placeholder='Email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <input type="text" placeholder='Phone Number' value={userPhoneNumber} onChange={(e) => setUserPhoneNumber(e.target.value)} />
                        </div>
                        <h3>Locality :<span>*</span></h3>
                        <div className="complaint-address-details">
                            <select placeholder='Village' value={locality} onChange={(e) => setLocality(e.target.value)}>
                                <option value="">Choose Village *</option>
                                <option value="Anaimalai">Anaimalai</option>
                                <option value="Udumalpet">Udumalpet</option>
                                <option value="Odayakulam">Odayakulam</option>
                                <option value="Sethumadai">Sethumadai</option>
                                <option value="Aaliyar">Aaliyar</option>
                                <option value="Amaravathi">Amaravathi</option>
                                <option value="Kurichikottai">Kurichikottai</option>
                                <option value="Panjapatty">Panjapatty</option>
                            </select>
                            <select placeholder='City' value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value="">Choose City</option>
                                <option value="Pollachi">Pollachi</option>
                                <option value="Dharapuram">Dharapuram</option>
                                <option value="Gundadam">Gundadam</option>
                                <option value="Madathukulam">Madathukulam</option>
                                <option value="Palani">Palani</option>
                                <option value="Kinathukadavu">Kinathukadavu</option>
                            </select>
                            <select placeholder='District' value={district} onChange={(e) => setDistrict(e.target.value)}>
                                <option value="">Choose District</option>
                                <option value="Coimbatore">Coimbatore</option>
                                <option value="Tirupur">Tirupur</option>
                            </select>
                            <select placeholder='State' value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="">Choose State</option>
                                <option value="Tamilnadu">Tamilnadu</option>
                            </select>
                            <input type="text" placeholder='Pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        </div>

                        <h3>Complaint Details :<span>*</span></h3>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select Department</option>
                            <option value="Water-Board">Water-Board</option>
                            <option value="Electric-Board">Electric-Board</option>
                            <option value="General Panjayath">General Panjayath</option>
                        </select>
                        <input type="text" placeholder='Complaint Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea placeholder='Enter About Your Complaint' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <h3>Attach Complaint Image : <span>*</span></h3>
                        <div className="complaint-image-container">
                            <div>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <div>
                                <img src={`${API_URL}/images/${image}`} alt={image} />
                            </div>
                        </div>
                        <div className="submit-button-center">
                            {loading ? (
                                <button type='submit' className='loading-button'>
                                    Loading<span className="dot-span dot-span1">.</span>
                                    <span className="dot-span dot-span2">.</span>
                                    <span className="dot-span dot-span3">.</span>
                                </button>
                            ) : (
                                <button type='submit'>Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditComplaint;
