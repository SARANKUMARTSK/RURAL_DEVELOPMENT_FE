import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../../App'
import toast from 'react-hot-toast';
import TopBar from '../../../components/TopBar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function EditAnnouncement() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState('');
  const [concernDistrict, setConcernDistrict] = useState('');
  const [title, setTitle] = useState('');
  const [schemeNo, setSchemeNo] = useState('');
  const [sponcer, setSponcer] = useState('');
  const [pattern, setPattern] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [type, setType] = useState('');
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [community, setCommunity] = useState('');
  const [step, setStep] = useState('');
  const [description, setDescription] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const {id} = useParams()
  const fetchAnnouncementData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/announcement/${id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      let data = res.data.announcement
      setDepartment(data.department)
      setConcernDistrict(data.concernDistrict)
      setTitle(data.schemeDetails.title)
      setPattern(data.schemeDetails.pattern)
      setSchemeNo(data.schemeDetails.schemeNo)
      setSponcer(data.schemeDetails.sponcer)
      setBeneficiaries(data.beneficiaries)
      setType(data.type)
      setIncome(data.eligibility.income)
      setAge(data.eligibility.age)
      setCommunity(data.eligibility.community)
      setStep(data.step)
      setStartingDate(data.createdAt)
      setEndingDate(data.endingDate)
      setDescription(data.description)
      setImageFile(data.imageFile)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAnnouncementData();
  },[])
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('department', department);
      formData.append('concernDistrict', concernDistrict);
      formData.append('title', title);
      formData.append('schemeNo', schemeNo);
      formData.append('sponcer', sponcer);
      formData.append('pattern', pattern);
      formData.append('beneficiaries', beneficiaries);
      formData.append('type', type);
      formData.append('income', income);
      formData.append('age', age);
      formData.append('community', community);
      formData.append('step', step);
      formData.append('description', description);
      formData.append('startingDate', startingDate);
      formData.append('endingDate', endingDate);
      formData.append('imageFile', imageFile);

      let res = await axios.put(`${API_URL}/announcement/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success(res.data.message);
      setLoading(false);
      navigate('/dashboard/announcements');
    } catch (error) {
      console.error(error);
      toast.error(error.response.message||"Failed to Edit announcement. Please try again.");
      setLoading(false);

    }
  }

  return <>
    <nav className='button-end'>
        <button onClick={()=>navigate('/dashboard/announcements')}>Back</button>
    </nav>
    <div className='add-announcement-page'>
      <form  className="add-announcement" onSubmit={handleSubmit}>
        <h2>Edit Announcement Here...</h2>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='Department' />
        <input type="text" value={concernDistrict} onChange={(e) => setConcernDistrict(e.target.value)} placeholder='Concern Districts' />

        <div className="schemeDetails flex-wrap">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
          <input type="text" value={schemeNo} onChange={(e) => setSchemeNo(e.target.value)} placeholder='Scheme Number' />
          <input type="text" value={sponcer} onChange={(e) => setSponcer(e.target.value)} placeholder='Sponsored By' />
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder='Pattern' />
        </div>
        <input type="text" value={beneficiaries} onChange={(e) => setBeneficiaries(e.target.value)} placeholder='Beneficiaries' />
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder='Type: Subsidy/Paid' />

        <div className="eligibility-criteria flex-wrap">
          <input type="text" value={income||"Not Mentioned"} onChange={(e) => setIncome(e.target.value)} placeholder='Income' />
          <input type="text" value={age||"Not Mentioned"} onChange={(e) => setAge(e.target.value)} placeholder='Age' />
          <input type="text" value={community||"Not Mentioned"} onChange={(e) => setCommunity(e.target.value)} placeholder='Community' />
        </div>
        <textarea className='howToAvail' value={step} onChange={(e) => setStep(e.target.value)} placeholder='How To Avail' ></textarea>
        <div className='space-evenly-inputs'>
          <div>
            <label htmlFor="startingDate">Starting Date: </label>
            <input type="date" value={startingDate?startingDate.split('T')[0]:""} onChange={(e) => setStartingDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="endingDate">Ending Date: </label>
            <input type="date" value={endingDate?endingDate.split('T')[0]:""} onChange={(e) => setEndingDate(e.target.value)} />
          </div>
          <div className='edit-announcement-image'>
          <img  src={`${API_URL}/images/${imageFile}`} alt="" />
          <input type="file" accept='image/*' onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='howToAvail' ></textarea>

        <div className='add-announcement-button'>
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </div>
      </form>
    </div>
    </>
}

export default EditAnnouncement;
