import React from 'react'
import Topbar from '../../../components/TopBar'
import '../app.css'
function EditWaste() {
  return <>
    <Topbar/>
    <div className='add-waste-page'>
      <form>
         <div className="add-waste-left">
         <img src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg" alt="" />
         <input type="file" accept="image/*"/>
         </div>
   
         <div className="add-waste-right">
              <div className="personal-details">
                <input type="text" placeholder='Your Name' />
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Phone Number'/>
              </div>
              <div className="waste-details">
                <select>
                  <option value="">Select Type</option>
                  <option value="">Plastic-Waste</option>
                  <option value="">Electrical-Waste</option>
                  <option value="">Agro-Waste</option>
                </select>
                <textarea className='add-waste-desc' placeholder='Enter About Waste Material Including Your Address'></textarea>
                <input type="text" placeholder='Quantity' />
                <select>
                  <option value="">Select Your City</option>
                  <option value="">Pollachi</option>
                  <option value="">Anaimalai</option>
                </select>
                <select>
                  <option value="">Select District</option>
                  <option value="">Coimbatore</option>
                  <option value="">Tiruppur</option>
                </select> 
              </div>

         </div>
         <button className='add-waste-button'>Submit</button>
      </form>
    </div>
  </>
}

export default EditWaste