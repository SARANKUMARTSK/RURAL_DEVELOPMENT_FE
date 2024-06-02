import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';

function AssignComplaint() {
    let today = new Date().toISOString().split('T')[0]; 
    let { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [status, setStatus] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [assignedContact, setAssignedContact] = useState('');
    const [assignedEmail, setAssignedEmail] = useState('');
    const [assignedDate, setAssignedDate] = useState(today);
    const [expectedDate, setExpectedDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState('');
    const [userEmail , setUserEmail] = useState('')
    const [userId , setUserId] = useState('')
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/complaints/byId/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { complaint } = res.data;
            setStatus(complaint.status || '');
            setAssignedTo(complaint.assignedTo || '');
            setAssignedContact(complaint.assignedContact || '');
            setAssignedEmail(complaint.assignedEmail || '');
            setAssignedDate(complaint.assignedDate || today);
            setExpectedDate(complaint.expectedDate || '');
            setCompletionDate(complaint.completionDate || '');
            setImage(complaint.imageFile || '');
            setUserEmail(complaint.userEmail||"");
            setUserId(complaint.userId||"")
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append('status', status);
            formData.append('assignedTo', assignedTo);
            formData.append('assignedContact', assignedContact);
            formData.append('assignedEmail', assignedEmail);
            formData.append('assignedDate', assignedDate);
            formData.append('expectedDate', expectedDate);
            formData.append('completionDate', completionDate);
            formData.append('imageFile', imageFile);
            formData.append('prevImage', image);
            formData.append('userId',userId)
            formData.append('userEmail',userEmail)

            await axios.put(`${API_URL}/complaints/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Complaint Taken Up Successfully');
            navigate('/dashboard/complaints');
        } catch (error) {
            console.log(error);
            toast.error('Error updating complaint');
        }
    };

  return <>
     <nav className='button-end'>
     <button onClick={()=>navigate('/dashboard/complaints')}>Back</button>
     </nav>
    <div className='assign-complaint'>

        <form onSubmit={handleSubmit}>
             <div className="assign-farm-left">
                <img src={`${API_URL}/images/${image}`} alt="" />
                <input type="file" onChange={handleFileChange}/>
                <label  htmlFor="completionDate">Completion Date:</label>
                <input className='completion-date-input' type="date" value={completionDate.split('T')[0]} onChange={(e)=>setCompletionDate(e.target.value)}/>
             </div>

             <div className="assign-farm-right">
                 <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Registered">Registered</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Solved">Solved</option>
                 </select>
                 <input type="text" placeholder='Taken By' value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)}/>
                 <input type="text" placeholder='Contact' value={assignedContact} onChange={(e)=>setAssignedContact(e.target.value)}/>
                 <input type="mail" placeholder='Email' value={assignedEmail} onChange={(e)=>setAssignedEmail(e.target.value)}/>
                 <label htmlFor="assignedDate">Assigned Date:</label>
                 <input type="date" value={assignedDate.split('T')[0]} onChange={(e)=>setAssignedDate(e.target.value)}/>
                 <label  htmlFor="expectedDate">Estimate Date:</label>
                 <input type="date" value={expectedDate.split('T')[0]} onChange={(e)=>setExpectedDate(e.target.value)}/>
                 

                 <button>Submit</button>
             </div>
            
            

        </form>
        
    </div>
  
  </>
}

export default AssignComplaint