import React from 'react'
import TopBar from '../../../components/TopBar'
import Navbar from '../../../components/Navbar'
import axios from 'axios'
import {API_URL} from '../../../App'
function AddDonation() {

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let res = await axios.get(`${API_URL}/donations`)
    } catch (error) {
      console.log(error);
    }
  }

  return <>
  <TopBar/>
  <Navbar/>
  <div className="add-donation-page">

    <form onSubmit={handleSubmit}>
    
      <div className="add-donation-right">
         <div>
         <input type="text" placeholder='Name' />
         <input type="text" placeholder='Email'/>
         <input type="text" placeholder='Phone Number'/>
         </div>
         <input type="text" placeholder='What Going to Donate'/>
         <textarea type="text" placeholder='Description'/>
        <div>
        <input type="number" placeholder='Food Members Count'/>
         <select>
            <option value="">Select District</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Tiruppur">Tiruppur</option>
         </select>
         <select>
            <option value="">Select City</option>
            <option value="Pollachi">Pollachi</option>
            <option value="Anaimalai">Anaimalai</option>
            <option value="Udumalpet">Udumalpet</option>
            <option value="Dharapuram">Dharapuram</option>
         </select>
         <select>
            <option value="">Select Village</option>
            <option value="Kaliyapuram">Kaliyapuram</option>
            <option value="Odayakulam">Odayakulam</option>
         </select>
        </div>

           <div className='center'><button>Submit</button></div>
      </div>
    </form>
  </div>
  </>
}

export default AddDonation