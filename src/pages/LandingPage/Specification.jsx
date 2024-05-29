import React from 'react'
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WaterIcon from '@mui/icons-material/Water';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import iconImage from '/public/worldImage.png'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DoneIcon from '@mui/icons-material/Done';


function Specification() {
  const navigate = useNavigate()
  let userId = localStorage.getItem('userId')
  let userName = localStorage.getItem('name')
  let role = localStorage.getItem('role')


  const handleComplaint = ()=>{
    if(userId){
      navigate(`/add-complaint/${userId}`)
      toast.success(`Welcome ${userName} , Register Your Complaint Here...`)
    }else{
      toast.error("Please LOGIN to Regiter Complaint  ")
      navigate('/login')
    }
  }
  const handleWasteQuery =()=>{
    if(userId){
      navigate(`/add-waste/${userId}`)
      toast.success(`Welcome ${userName} , Register Your Waste Pickup Here...`)
    }else{
      toast.error("Please LOGIN to Raise a Waste Pickup Query")
      navigate('/login')
    }
  }
  
  const handleSalesProduct = ()=>{
    if(userId){
      navigate(`/view-sales-product/${userId}`)
    }else{
      toast.error("Please LOGIN to Add Sales Product")
      navigate('/login')
    }
  }


  const handleDashboard = ()=>{
    if(role==="Admin"){
      navigate('/dashboard')
    }else{
      toast.error('You Are Not Allowed')
    }
  }
  return (
    <div className='specification-page'>
      <div className='specification-container-head'>
        <div className="spacification-container">
          <div>Online Services</div>
          <ul>
            <li onClick={()=>handleComplaint()}><LinkIcon/> Raise Complaints & Track With Your Complaint Id <DoneIcon/></li>
            <li onClick={()=>navigate('/view-contact')}><LinkIcon/> Get All Officials Contact <DoneIcon/></li>
            <li onClick={()=>navigate('/gallery')}><LinkIcon/> Recent Activity By Gallery <DoneIcon/></li>
            <li onClick={()=>handleWasteQuery()}><LinkIcon/> Waste Pickup & Track With Your Tracking Id <DoneIcon/></li>
            <li onClick={()=>handleSalesProduct()}><LinkIcon/> Market Place For Formers & Buyers <DoneIcon/></li>
            <li onClick={()=>navigate('/view-announcement')}><LinkIcon/> Government Announcements <DoneIcon/></li>
            <li onClick={()=>navigate('/view-agro-sales')}><LinkIcon/>Fertilizer Sale <DoneIcon/></li>
            <li onClick={()=>handleDashboard()}><LinkIcon/>Officials Login <DoneIcon/></li>
          </ul>
        </div>

        <div className="logoImage-container">
           <img src={iconImage} alt="" />
        </div>
      </div>

<h1 style={{textAlign:"center" , margin:"20px"}}>Complaint Services </h1>

<div className="specifications-card-container">
    <div className="specification-card">
       <WaterDropIcon/>
       <h3>Report Water Supply Issues</h3>
       <p>You can report water supply complaints in your area and track their resolution status until they are resolved.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
       <ElectricBoltIcon/>
       <h3>Electrical Maintenance</h3>
       <p>Report electrical maintenance issues and ensure timely repairs and maintenance of electrical infrastructure.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
       <WaterIcon/>
       <h3>Drainage Problems</h3>
       <p>Report drainage problems in your area to prevent waterlogging and ensure proper drainage system functioning.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
       <DeleteOutlineIcon/>
       <h3>Waste Collection Services</h3>
       <p>Avail waste collection services for proper disposal of waste and maintaining cleanliness in your locality.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div>  

    <div className="specification-card">
       <EditRoadIcon/>
       <h3>Report Road Damage</h3>
       <p>Report road damage to authorities for prompt repairs and maintenance to ensure safe and smooth transportation.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div>  

    <div className="specification-card">
       <LocalHospitalOutlinedIcon/>
       <h3>Medical Assistance</h3>
       <p>Seek medical support and assistance for healthcare needs in your locality.</p>
       <span onClick={()=>handleComplaint()}>Explore <TrendingFlatIcon/></span>
    </div> 
</div>

<br /><br /><br />
<h1 style={{textAlign:"center" , margin:"20px"}}>Waste Management </h1>

<div className="specifications-card-container">
    <div className="specification-card">
        <img src="https://th-i.thgim.com/public/incoming/o2foq5/article67369061.ece/alternates/LANDSCAPE_1200/0J3A5149.jpg" alt="" />
        <h3>Request Waste Pickup</h3>
        <p>You can request a pickup for both recyclable and non-recyclable waste from the local municipality. Our team will collect it from your doorstep.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
        <img src="https://img.etimg.com/thumb/width-640,height-480,imgsize-364005,resizemode-75,msid-61107174/industry/cons-products/food/fssai-initiative-to-collect-distribute-surplus-food-to-needy.jpg" alt="" />
        <h3>Food Surplus Management</h3>
        <p>If you have surplus food, you can notify us through this platform. We will connect you with individuals or organizations in need, thereby reducing food waste.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
        <img src="https://www.econlib.org/wp-content/uploads/2018/05/recycling-2.jpg" alt="" />
        <h3>Recycling Services</h3>
        <p>Dispose of your recyclable waste responsibly. Our recycling services ensure that materials like plastic, paper, and glass are recycled, contributing to environmental sustainability.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
        <img src="https://www.ey.com/content/dam/ey-unified-site/ey-com/en-us/insights/climate-change-sustainability-services/images/ey-waste-bin-full-of-e-waste.jpg" alt="" />
        <h3>Electronic Waste Collection</h3>
        <p>Don't let electronic waste clutter your home. Use our electronic waste collection service to safely dispose of old gadgets and appliances, preventing environmental pollution.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
        <img src="https://cdn.cpdonline.co.uk/wp-content/uploads/2022/02/28105801/Composting-waste.jpg" alt="" />
        <h3>Composting Solutions</h3>
        <p>Convert your organic waste into nutrient-rich compost with our composting solutions. By composting kitchen scraps and garden waste, you can reduce landfill waste and enrich your soil.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>

    <div className="specification-card">
        <img src="https://hsewatch.com/wp-content/uploads/2022/12/Hazardous-Waste-Disposal.jpg" alt="" />
        <h3>Hazardous Waste Disposal</h3>
        <p>Safely dispose of hazardous waste materials like batteries, chemicals, and fluorescent bulbs through our specialized disposal services. Protect your health and the environment.</p>
        <span onClick={()=>handleWasteQuery()}>Explore <TrendingFlatIcon/></span>
    </div>
</div>




      
    </div>
  )
}

export default Specification