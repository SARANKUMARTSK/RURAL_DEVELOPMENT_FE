import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/TopBar'
import '../app.css'
import Navbar from '../../../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../App'
import toast from 'react-hot-toast'
function EditSales() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
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
  const [status,setStatus] = useState("")
  const {id} = useParams()

  const userId = localStorage.getItem('userId')
  const fetchProductData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/products/${id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      const {product} = res.data;
      setName(product.name)
      setEmail(product.email)
      setPhoneNumber(product.phoneNumber)
      setProduct(product.product)
      setDescription(product.description)
      setQuantity(product.quantity)
      setUnit(product.unit)
      setPrice(product.price)
      setImageFile(product.imageFile)
      setLocality(product.locality)
      setDistrict(product.district)
      setCity(product.city)
      setState(product.state)
      setStatus(product.status)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     fetchProductData();
  },[])


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
      formData.append("status",status)
      formData.append("userId",userId)

    let res = await axios.put(`${API_URL}/products/${id}`,formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
      }
  })
    toast.success(res.data.message)
    navigate(`/view-sales-product/${userId}`)
   } catch (error) {
    console.log(error);
   } 
  }




  return <>
  <Topbar/>
  <Navbar/>
  <div className="add-sales-page">

    <div className="add-sales-left-container">
         <img src={`${API_URL}/images/${imageFile}`} alt="" />
         <div>This page is exclusively dedicated to the sale of agricultural products by farmers. 
          No other products or advertisements are permitted. Any violations of this policy will 
          result in punishment by the panchayat. </div>
    </div>

    <div className="add-sales-right-container">
        <form className="add-sales-form" onSubmit={handleSubmit}>
          <h3>Edit Your Product Here...!</h3>
         <div className="add-sales-personal">
              <input type="text" placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)} />
              <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder='PhoneNumber' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
         </div>
          <div className="add-sales-product">
              <div>
                <input type="text" placeholder='Product Name' value={product} onChange={(e)=>setProduct(e.target.value)}/>
                <input type="text" placeholder='Unit Of Measurement' value={unit} onChange={(e)=>setUnit(e.target.value)}/>
                <input type="text" placeholder='Product Available Qty' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                <input type="text" placeholder='Price Per Unit' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <textarea className='sales-product-description' name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Product Description'></textarea>
          </div>
          <div className="add-sales-address">
              <select type="text" value={state} onChange={(e)=>setState(e.target.value)}>
                <option value="">State</option>
                <option value="Tamilnadu">Tamilnadu</option>
              </select>
              <select type="text" value={district} onChange={(e)=>setDistrict(e.target.value)}>
                <option value="">District</option>
                <option value="Coimbatore">Coimbatore</option>
              </select>
              <select type="text" value={city} onChange={(e)=>setCity(e.target.value)}>
                <option value="">City</option>
                <option value="Pollachi">Pollachi</option>
              </select>
              <select type="text" value={locality} onChange={(e)=>setLocality(e.target.value)}>
                  <option value="">Village</option>
                  <option value="Anaimalai">Anaimalai</option>
              </select>
          </div>

          <div className="add-sales-flex-container">
              <select type="text" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Currently UnAvailable">Un-Available</option>
              </select>
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

export default EditSales