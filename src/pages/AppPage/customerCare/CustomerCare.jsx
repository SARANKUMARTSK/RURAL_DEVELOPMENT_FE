import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import TopBar from '../../../components/TopBar';
import Footer from '../../../components/Footer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import EmailIcon from '@mui/icons-material/Email';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import { API_URL } from '../../../App';

function CustomerCare() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    query: '',
    city: '',
    district: '',
    pincode: '',
    title: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phoneNumber, query, city, district, pincode, title } = formData;

    if (!name || !email || !phoneNumber || !query || !city || !district || !pincode || !title) {
      toast.error('Fill All the Fields');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/customerCare`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    });
      toast.success(res.data.message || 'Thank you for reaching out. We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        query: '',
        city: '',
        district: '',
        pincode: '',
        title: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while submitting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopBar />
      <nav className="customer-care-nav">
        <div className="customer-care-title">
          <SupportAgentIcon /> 24*7 Customer Care Support By Rural Development
        </div>
        <button onClick={() => navigate('/landing-page')} className="back-button" style={{ height: '35px', width: '100px' }}>
          Back
        </button>
      </nav>

      <div className="customer-care">
        <div className="customer-care-card">
          <div className="customer-care-card-left">
            <ContactSupportIcon />
          </div>
          <form onSubmit={handleSubmit} className="customer-care-card-right">
            <h2>Simply send an email about your query, and we will get back to you</h2>
            <div>
              <div><input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} /><PersonIcon/></div>
              <div><input type="text" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} /><EmailIcon/></div>
              <div><input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} /><PhoneIphoneIcon/></div>
              <div><input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} /><LocationCityIcon/></div>
              <div><input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} /><LocationCityIcon/></div>
              <div><input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} /><SignpostIcon/></div>
            </div>
            <input type="text" name="title" placeholder="Type Of Your Query" value={formData.title} onChange={handleChange} />
            <textarea name="query" placeholder="What Kind Of Support Do You Want" value={formData.query} onChange={handleChange}></textarea>
            <div className="center">
              {loading ? (
                <button className="loading-button-add-waste-sales">
                  Loading
                  <span className="loading-dot1">
                    <FiberManualRecordIcon />
                  </span>
                  <span className="loading-dot2">
                    <FiberManualRecordIcon />
                  </span>
                  <span className="loading-dot3">
                    <FiberManualRecordIcon />
                  </span>
                </button>
              ) : (
                <button className="center">
                  Send a Message &nbsp; <SendIcon />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="customer-care-contact">
          <div className="customer-care-left-contact">
            <span>
              <LocationOnIcon /> Address:
            </span>
            <div>No.01 Sample Street, Rural Development, 640001</div>
            <span>
              <EmailIcon /> Email:
            </span>
            <a href="mailto:customersupport@rural.com">customersupport@rural.com</a>
            <span>
              <RingVolumeIcon /> Help Line:
            </span>
            <a href="tel:+918889997776">+91 1234567890</a>
          </div>

          <div className="customer-care-location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31376.256019267195!2d76.9327967!3d10.57666865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1717382220416!5m2!1sen!2sin"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerCare;
