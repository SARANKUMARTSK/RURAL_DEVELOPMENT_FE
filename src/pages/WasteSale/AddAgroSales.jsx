import React, { useState } from 'react'
import Topbar from '../../components/TopBar'
import './sales.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import toast from 'react-hot-toast'
import axios from 'axios'
import {API_URL} from '../../App'
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
function AddSales() {

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
  const navigate = useNavigate()
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
      formData.append("imageFile",imageFile)
      
      if(name===""||email===""||phoneNumber===""||title===""||description===""||district===""||city===""||quantity===""||price===""||imageFile===null||!imageFile){
          toast.error("Please fill all the fields" )
          setLoading(false)

      }else{
        let res = await axios.post(`${API_URL}/agro-sales`,formData)
        setLoading(false)
        toast.success('Sales Order Added Successfully')
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
  <nav className='button-end'>
   <button onClick={()=>navigate('/view-agro-sales')}>Back</button>
  </nav>
  <div className="add-agro-waste-sale">
    <form onSubmit={handleSubmit}>
      <div className="add-agro-waste-sale-left">
          {
            imageFile===null?<img src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"/>:
            <img src={URL.createObjectURL(imageFile)} alt={imageFile}/>
          }
          <input type="file" accept='image/*' onChange={handleFileChange} />
          <div >
            <input type="text" placeholder='Available qty in Kg' onChange={(e)=>setQuantity(e.target.value)} />
            <div className='relative'>
              <input type="text" placeholder='Price Per Kg' onChange={(e)=>setPrice(e.target.value)}/>
              <CurrencyRupeeIcon/>
            </div>
          </div>
      </div>

      <div className="add-agrp-waste-sale-right">
           <div className='waste-sales-personal-details'>
              <input type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)}/>
              <input type="text" placeholder=' Email' onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" placeholder='Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)}/>
           </div>

           <div className='waste-sales-basic-details'>
               <input type="text" placeholder='Enter the title' onChange={(e)=>setTitle(e.target.value)}/>
               <textarea placeholder='Description ' onChange={(e)=>setDescription(e.target.value)}></textarea>
           </div>

           <div className='waste-sales-details-location relative' >
               <AddLocationAltIcon/>
               <input type="text" placeholder='City Name' onChange={(e)=>setCity(e.target.value)}/>
               <input placeholder='District ' onChange={(e)=>setDistrict(e.target.value)}/>
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

export default AddSales