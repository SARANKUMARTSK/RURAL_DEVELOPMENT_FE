import React from 'react'
import Topbar from '../../../components/TopBar'
import '../app.css'
function EditSales() {
  return <>
  <Topbar/>
  <div className="add-sales-page">

    <div className="add-sales-left-container">
         <img src="https://www.logisticsandscm.com/cloud/2022/08/06/agri.jpg" alt="" />
         <div>This page is exclusively dedicated to the sale of agricultural products by farmers. 
          No other products or advertisements are permitted. Any violations of this policy will 
          result in punishment by the panchayat. </div>
    </div>

    <div className="add-sales-right-container">
        <form className="add-sales-form">
          <h3>Edit Your Product Here...!</h3>
         <div className="add-sales-personal">
              <input type="text" placeholder='Your Name' />
              <input type="text" placeholder='Email' />
              <input type="text" placeholder='PhoneNumber' />
         </div>
          <div className="add-sales-product">
              <div>
                <input type="text" placeholder='Product Name' />
                <input type="text" placeholder='Unit Of Measurement' />
                <input type="text" placeholder='Product Available Qty' />
                <input type="text" placeholder='Price Per Unit' />
              </div>
              <textarea className='sales-product-description' name="description" placeholder='Product Description'></textarea>
          </div>
          <div className="add-sales-address">
              <select type="text">
                <option value="">State</option>
                <option value="tamilnadu">Tamilnadu</option>
              </select>
              <select type="text">
                <option value="">District</option>
                <option value="coimbatore">Coimbatore</option>
              </select>
              <select type="text">
                <option value="">City</option>
                <option value="pollachi">Pollachi</option>
              </select>
              <select type="text">
                <option value="">Village</option>
                <option value="anaimalai">Anaimalai</option>
              </select>
          </div>

          <div className="add-sales-flex-container">
              <select type="text">
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Currently UnAvailable">Un-Available</option>
              </select>
              <input type="file" accept="image/*" />
          </div>

         <div className="center">
               <button type='submit'>Submit</button>
         </div>

          
        </form>
    </div>

  </div>
  </>
}

export default EditSales