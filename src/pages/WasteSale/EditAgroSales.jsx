import React, { useEffect, useState } from 'react'
import Topbar from '../../components/TopBar'
import './sales.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import toast from 'react-hot-toast'
import axios from 'axios'
import {API_URL} from '../../App'
import { useNavigate, useParams } from 'react-router-dom';
function EditAgroSales() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [city,setCity] = useState('')
  const [district,setDistrict] = useState('')
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [quantity,setQuantity] = useState('')
  const [price,setPrice] = useState('')
  const [imageFile,setImageFile] = useState(null)
  const {id} = useParams()

  const fetchData = async()=>{
    try {
      let res = await axios.get(`${API_URL}/agro-sales/${id}`)
      let data =res.data.wasteSales
      setName(data.name)
      setEmail(data.email)
      setPhoneNumber(data.phoneNumber)
      setTitle(data.title)
      setDescription(data.description)
      setQuantity(data.quantity)
      setPrice(data.price)
      setCity(data.city)
      setDistrict(data.district)
      setImageFile(data.imageFile)
    } catch (error) { 
      console.log(error);
    }
  }

  useEffect(()=>{
       fetchData()
  },[])


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let formData = new FormData();
      formData.append("name",name)
      formData.append("email",email)
      formData.append("phoneNumber",phoneNumber)
      formData.append("title",title)
      formData.append("description",description)
      formData.append("district",district)
      formData.append("city",city)
      formData.append("quantity",quantity)
      formData.append("price",price)
      formData.append('imageFile',imageFile)
      
      if(name===""||email===""||phoneNumber===""||title===""||description===""||district===""||city===""||quantity===""||price===""||imageFile===null){
          toast.error("Please fill all the fields" )
          setLoading(false)

      }else{
        let res = await axios.put(`${API_URL}/agro-sales/${id}`,formData)
        setLoading(false)
        toast.success(res.data.message)
        navigate('/view-agro-sales')
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  const handleFileChange=(e)=>{
    setImageFile(e.target.files[0])
  }

  

  return <>
  <Topbar/>
  <div className="add-agro-waste-sale">
    <form onSubmit={handleSubmit}>
      <div className="add-agro-waste-sale-left">
          
            <img src={`${API_URL}/images/${imageFile}`} alt={imageFile}/>
             <input type="file" accept='image/*' onChange={handleFileChange}/>

          <div >
            <input type="text" placeholder='Available qty in Kg' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
            <div className='relative'>
              <input type="text" placeholder='Price Per Kg' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              <CurrencyRupeeIcon/>
            </div>
          </div>
      </div>

      <div className="add-agrp-waste-sale-right">
           <div className='waste-sales-personal-details'>
              <input type="text" placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
              <input type="text" placeholder=' Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder='Phone Number' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
           </div>

           <div className='waste-sales-basic-details'>
               <input type="text" placeholder='Enter the title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
               <textarea placeholder='Description ' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
           </div>

           <div className='waste-sales-details-location relative' >
               <AddLocationAltIcon/>
               <input type="text" placeholder='City Name' value={city} onChange={(e)=>setCity(e.target.value)}/>
               <input placeholder='District ' value={district} onChange={(e)=>setDistrict(e.target.value)}/>
           </div>

           <div className='submit-button'>
            {
              !loading?<button>Submit</button>:
                <button className='loading-button-add-waste-sales'>Loading
                      <span className='loading-dot1'><FiberManualRecordIcon/></span>
                      <span className='loading-dot2'><FiberManualRecordIcon/></span>
                      <span className='loading-dot3'><FiberManualRecordIcon/></span>
                 </button>
            }
           </div>
      </div>
    </form>
  </div>
  </>
}

export default EditAgroSales