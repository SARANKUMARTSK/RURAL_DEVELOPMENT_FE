import React, { useState } from 'react';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FaxIcon from '@mui/icons-material/Fax';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddContact() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    fax: '',
    position: '',
    locality: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phoneNumber,
      fax,
      position,
      locality,
      city,
      district,
      state,
      pincode,
    } = formData;

    if (!name || !email || !phoneNumber || !position || !locality || !city || !district || !state || !pincode) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      let res = await axios.post(
        `${API_URL}/contacts`,
        { name, email, phoneNumber, fax, position, locality, city, district, state, pincode },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate('/dashboard/contacts');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
     <nav className='button-end'>
          <button onClick={()=>navigate('/dashboard/contacts')}>Back</button>
     </nav>
      <div className="add-contact-page">
        <div className="add-contact-left-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/3095/3095583.png?semt=ais_hybrid"
            alt=""
          />
        </div>
        <div className="add-contact-right-container">
          <form onSubmit={handleSubmit}>
            <div className="add-contact-personal">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name Of The Contact"
                  onChange={handleChange}
                />
                <PersonPinIcon />
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <AttachEmailIcon />
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
                <PhoneEnabledIcon />
              </div>
              <div>
                <input
                  type="text"
                  name="fax"
                  placeholder="Fax"
                  onChange={handleChange}
                />
                <FaxIcon />
              </div>
              <div>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  onChange={handleChange}
                />
                <BadgeIcon />
              </div>
            </div>
            <div className="add-contact-address">
              <select name="state" onChange={handleChange}>
                <option value="">State</option>
                <option value="Tamilnadu">Tamilnadu</option>
                <option value="Kerala">Kerala</option>
              </select>
              <select name="district" onChange={handleChange}>
                <option value="">District</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruppur">Tiruppur</option>
              </select>
              <select name="city" onChange={handleChange}>
                <option value="">City</option>
                <option value="Pollachi">Pollachi</option>
              </select>
              <select name="locality" onChange={handleChange}>
                <option value="">Village</option>
                <option value="Anaimalai">Anaimalai</option>
              </select>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
            </div>
            <div className="add-contact-button-container">
              <button type="submit">Add Contact</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddContact;
