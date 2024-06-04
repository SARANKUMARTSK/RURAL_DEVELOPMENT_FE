import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../App';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name,
        email,
        password,
        phoneNumber,
        gender,
        address: {
          doorNo,
          street,
          locality,
          city,
          district,
          state,
          pincode
        }
      };
      const res = await axios.post(`${API_URL}/user`, data);
      toast.success("Signup Success");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='signup-page'>
      <h3>Registration / Signup --------------- 
        <span onClick={() => navigate('/login')} style={{ color: "red" }}>Click to Login!</span>
      </h3>
      <div className='signup-head'>
        <h4>Enter Details</h4>
        <h4>Fields marked with <span className='star-span'>*</span> are mandatory</h4>
      </div>
      <div className='signup-container'>
        <form onSubmit={handleSignup} className='signup-main-container'>
          <div className='signup-left-container'>
            <label htmlFor="name">Name:<span className='star-span'>*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" required />

            <label htmlFor="email">Email:<span className='star-span'>*</span></label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" required />

            <label htmlFor="phoneNumber">Phone Number:<span className='star-span'>*</span></label>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" id="phoneNumber" required />

            <label htmlFor="password">Password:<span className='star-span'>*</span></label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" required />

            <div className="gender-container">
              <label htmlFor="gender">Gender:</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div className="signup-right-container">
            <h4>Address:</h4>
            <div className="address-container">
              <label htmlFor="doorNo">Door Number:</label>
              <input value={doorNo} onChange={(e) => setDoorNo(e.target.value)} className='doorNo' type="text" id="doorNo" />
              <label htmlFor="street">Street:<span className='star-span'>*</span></label>
              <input value={street} onChange={(e) => setStreet(e.target.value)} className='street' type="text" id="street" required />
              <label htmlFor="locality">Locality:<span className='star-span'>*</span></label>
              <input value={locality} onChange={(e) => setLocality(e.target.value)} className='locality' type="text" id="locality" required />
              <label htmlFor="city">City:<span className='star-span'>*</span></label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className='city' type="text" id="city" required />
              <label htmlFor="district">District:<span className='star-span'>*</span></label>
              <input value={district} onChange={(e) => setDistrict(e.target.value)} className='district' type="text" id="district" required />
              <label htmlFor="state">State:<span className='star-span'>*</span></label>
              <input value={state} onChange={(e) => setState(e.target.value)} className='state' type="text" id="state" required />
              <label htmlFor="pincode">PinCode:<span className='star-span'>*</span></label>
              <input value={pincode} onChange={(e) => setPincode(e.target.value)} className='pincode' type="text" id="pincode" required />
            </div>
          </div>

          {loading ? (
            <button className='loading-button-add-waste-sales' disabled>
              Loading
              <span className='loading-dot1'><FiberManualRecordIcon /></span>
              <span className='loading-dot2'><FiberManualRecordIcon /></span>
              <span className='loading-dot3'><FiberManualRecordIcon /></span>
            </button>
          ) : (
            <button className='signup-button'>Submit</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
