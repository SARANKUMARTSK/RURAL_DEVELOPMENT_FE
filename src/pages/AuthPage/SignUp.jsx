import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../App';

function SignUp() {
   let [name,setName] = useState("")
   let [email,setEmail] = useState("")
   let [password,setPassword] = useState("")
   let [phoneNumber,setPhoneNumber] = useState("")
   let [doorNo,setDoorNo] = useState("")
   let [street,setStreet] = useState("")
   let [locality,setLocality] = useState("")
   let [city,setCity] = useState("")
   let [district,setDistrict] = useState("")
   let [state,setState] = useState("")
   let [pincode,setPincode] = useState("")
   let [gender ,setGender] = useState("")
   const [loading,setLoading] = useState(false)
   const navigate = useNavigate()

   const handleSignup = async(e)=>{
      e.preventDefault();
      setLoading(true)
      try {
         let data = {
            name,email,password,phoneNumber,gender, "address.doorNo":doorNo, "address.street":street , 
            "address.locality":locality , "address.city":city , "address.district":district , 
            "address.state":state , "address.pincode":pincode
         }
         let res = await axios.post(`${API_URL}/user`,data)
         toast.success("Signup Success")
         setLoading(false)
         navigate('/login')
      } catch (error) {
         console.log(error);
         setLoading(false)
         toast.error(error.response.data.message)
      }
   }






  return <>
  <div className='signup-page'>
     <h3>Resistration / Signup --------------- <span onClick={()=>navigate('/login')}  style={{color:"red"}}>Click to Login! </span></h3>
     <div className='signup-head'>
      <h4>Enter Details</h4>
      <h4>Fields marked with <span className='star-span'>*</span>  are mandatory</h4>
     </div>
    <div className='signup-container'>
        <form  onSubmit={handleSignup} className='signup-main-container'>
           <div className='signup-left-container'>
           <label htmlFor="name">Name :<span className='star-span'>*</span></label>
           <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />

           <label htmlFor="email">Email :<span className='star-span'>*</span></label>
           <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" />

           <label htmlFor="phoneNumber">Phone Number :<span className='star-span'>*</span></label>
           <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="text" />

           <label htmlFor="phoneNumber">Password :<span className='star-span'>*</span></label>
           <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" />

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
           <h4>Address : </h4>
           <div className="address-container">
              <label htmlFor="doorNo">Door Number :</label>
              <input value={doorNo} onChange={(e)=>setDoorNo(e.target.value)} className='doorNo' type="text" />
              <label htmlFor="street">Street:<span className='star-span'>*</span></label>
              <input value={street} onChange={(e)=>setStreet(e.target.value)} className='street' type="text" />
              <label htmlFor="locality">Locality :<span className='star-span'>*</span></label>
              <input value={locality} onChange={(e)=>setLocality(e.target.value)} className='locality' type="text" />
              <label htmlFor="city">City :<span className='star-span'>*</span></label>
              <input value={city} onChange={(e)=>setCity(e.target.value)} className='city' type="text" />
              <label htmlFor="district">District :<span className='star-span'>*</span></label>
              <input value={district} onChange={(e)=>setDistrict(e.target.value)} className='district' type="text" />
              <label htmlFor="state">State :<span className='star-span'>*</span></label>
              <input value={state} onChange={(e)=>setState(e.target.value)} className='state' type="text" />
              <label htmlFor="pinCode">PinCode :<span className='star-span'>*</span></label>
              <input value={pincode} onChange={(e)=>setPincode(e.target.value)} className='pinCode' type="text" />
              
           </div>

           
           </div>




          {
            loading?<button className='loading-button-add-waste-sales'>Loading
            <span className='loading-dot1'><FiberManualRecordIcon/></span>
            <span className='loading-dot2'><FiberManualRecordIcon/></span>
            <span className='loading-dot3'><FiberManualRecordIcon/></span>
             </button>:<button className='signup-button'>Submit</button>
          }
           
        </form>

        

        
    </div>

  </div>
  </>
}

export default SignUp