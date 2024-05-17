import React, { useState } from 'react'
import Topbar from '../../../components/TopBar'
import Navbar from '../../../components/Navbar'
import '../app.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../App'
import toast from 'react-hot-toast'

function AddSales() {

  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [product,setProduct] = useState("")
  const [description,setDescription] = useState("")
  const [quantity,setQuantity] = useState("")
  const [unit,setUnit] = useState("")
  const [price,setPrice] = useState("")
  const [imageFile,setImageFile] = useState(null)
  const [locality,setLocality] = useState("")
  const [city,setCity] = useState("")
  const [district,setDistrict] = useState("")
  const [state,setState] = useState("")
  const {id} = useParams()
  const userId = sessionStorage.getItem('userId')
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name",name)
      formData.append("email",email)
      formData.append("phoneNumber",phoneNumber)
      formData.append("product",product)
      formData.append("description",description)
      formData.append("quantity",quantity)
      formData.append("unit",unit)
      formData.append("price",price)
      formData.append("imageFile",imageFile)
      formData.append("locality",locality)
      formData.append("city",city)
      formData.append("district",district)
      formData.append("state",state)
      formData.append('userId',userId)
      
      let res = await axios.post(`${API_URL}/products`,formData)
      toast.success(res.data.message)
      navigate('/landing-page')
    } catch (error) {
      console.log(error);
    }
  }

  return <>
  <Topbar/>
  <Navbar/>
  <div className="add-sales-page">

    <div className="add-sales-left-container">
         <img src="https://www.logisticsandscm.com/cloud/2022/08/06/agri.jpg" alt="" />
         <div>This page is exclusively dedicated to the sale of agricultural products by farmers. 
          No other products or advertisements are permitted. Any violations of this policy will 
          result in punishment by the panchayat. </div>
    </div>

    <div className="add-sales-right-container">
        <form className="add-sales-form" onSubmit={handleSubmit}>
          <h3>Add Your Agriculture Product for sale</h3>
         <div className="add-sales-personal">
              <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)} />
              <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder='PhoneNumber' onChange={(e)=>setPhoneNumber(e.target.value)}/>
         </div>
          <div className="add-sales-product">
              <div>
                <input type="text" placeholder='Product Name' onChange={(e)=>setProduct(e.target.value)} />
                <input type="text" placeholder='Unit Of Measurement' onChange={(e)=>setUnit(e.target.value)} />
                <input type="text" placeholder='Product Available Qty' onChange={(e)=>setQuantity(e.target.value)}/>
                <input type="text" placeholder='Price Per Unit' onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <textarea className='sales-product-description' onChange={(e)=>setDescription(e.target.value)} name="description" placeholder='Product Description'></textarea>
          </div>
          <div className="add-sales-address">
              <select type="text" onChange={(e)=>setState(e.target.value)}>
                <option value="">State</option>
                <option value="Tamilnadu">Tamilnadu</option>
              </select>
              <select type="text" onChange={(e)=>setDistrict(e.target.value)}>
                <option value="">District</option>
                <option value="Coimbatore">Coimbatore</option>
              </select>
              <select type="text" onChange={(e)=>setCity(e.target.value)}>
                <option value="">City</option>
                <option value="Pollachi">Pollachi</option>
                <option value="Anaimalai">Anaimalai</option>
                <option value="Udumalpet">Udumalpet</option>
                <option value="Dharapuram">Dharapuram</option>
              </select>
              <select type="text" onChange={(e)=>setLocality(e.target.value)} >
                <option value="">Village</option>
                <option value="Kaliyapuram">Kaliyapuram</option>
                <option value="Odayakulam">Odayakulam</option>
              </select>
          </div>

          <div className="add-sales-flex-container">
             
              <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])} />
          </div>

         <div className="center">
               <button type='submit'>Submit</button>
         </div>

          
        </form>
    </div>

  </div>
  </>
}

export default AddSales