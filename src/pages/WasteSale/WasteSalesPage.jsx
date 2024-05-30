import React, { useEffect, useState } from 'react';
import Topbar from '../../components/TopBar';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SellIcon from '@mui/icons-material/Sell';
import ScaleIcon from '@mui/icons-material/Scale';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import axios from 'axios';
import { API_URL } from '../../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SalesPage() {
  const navigate = useNavigate()
  let userId = localStorage.getItem('userId')

  const token = localStorage.getItem('token')
  const [data, setData] = useState([]);
  const [requiredQty, setRequiredQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [city,setCity] = useState('')
  const role = localStorage.getItem('role')
  const fetchSalesData = async () => {
    try {
      const res = await axios.get(`${API_URL}/agro-sales`);
      let data = res.data.wasteSales;
      city==""?setData(data):setData(data.filter(data=>data.city===city));
    } catch (error) {
      console.log(error);
    }
  };
   const [buyerName,setBuyerName] = useState('')
   const [buyerPhoneNumber,setBuyerPhoneNumber] = useState('')
   const [userEmail,setUserEmail] = useState('')

  const getUser = async()=>{
    try {
      let res = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
  
      setBuyerName(res.data.user.name);
      setBuyerPhoneNumber(res.data.user.phoneNumber)
      setUserEmail(res.data.user.email)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSalesData();
  }, [data]);

  useEffect(()=>{
    getUser();
  },[])

  const handleRequiredQtyChange = (e, itemPrice) => {
    const value = e.target.value;
    setRequiredQty(value);
    setPrice(itemPrice);
    setAmount(value * itemPrice);
  };

  

  const handleBuy = async(e) => {
    e.preventDefault();
    if(requiredQty===0){
      toast.error('Please Fill Required Qty')
    } else {
      let options = {
        key:"rzp_test_1tZRqNs6zwu9TP",
        key_secret:"6rAD4UhqQptPavAKgNM7w4ld",
        amount:amount*100 ,
        currency:"INR",
        name:"RURAL_DEVELOPMENT_PAYEMENT",
        description:"For agro waste sales",
        handler:function(response){
          alert(response.razorpay_payment_id);
        },
        prefill:{
          name:"SaranKumar",
          email:"sarankumartsk@gmail.com",
          contact:"8675750594"
        },
        notes:{
          address:"Rural Development Office",
          userName: buyerName,
          userEmail: userEmail,
          userContact: buyerPhoneNumber,
        },
        theme:{
          color:"green"
        }
      };
      let pay = new Razorpay(options);
      pay.open();

    }
  };


  const handleEdit =(e)=>{
    navigate(`/edit-agro-sales/${e._id}`)
  }

  const handleDelete=async(e)=>{
    try {
      let res = await axios.delete(`${API_URL}/agro-sales/${e._id}`)
       toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }



  return (
    <>
      <Topbar />
      <nav className='agro-sales-navbar'>
        <select onChange={(e)=>setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Pollachi">Pollachi</option>
          <option value="Udumalpet">Udumalpet</option>
          <option value="Dharapuram">Dharapuram</option>
          <option value="Anaimalai">Anaimalai</option>
        </select>
        <div>
          <button title='Home' onClick={()=>navigate('/landing-page')}><HomeIcon /></button>
          <button title='Add Sales' onClick={()=>navigate('/add-agro-sales')}><PostAddIcon /></button>
        </div>
      </nav>

      <div className="view-agro-sales">
        {
          !data.length&& <div>No Data Found</div>
        }
        {data.map((e, i) => (
          <div key={i} className="agro-sales-card">
            <div className="agro-sales-card-left">
              <img src={`${API_URL}/images/${e.imageFile}`} alt="Agro waste" />
            </div>

            <div className="agro-sales-card-right">
              <h3 className='agro-sales-title'>{e.title} !</h3>
              <p className='agro-sales-description'>{e.description}</p>
              <div className='sale-agro-waste-highlights'>
                <div><LocationOnIcon /><span>{e.city}</span></div>
                <div><SellIcon /><span><CurrencyRupeeIcon /><span>{e.price}</span>/Kg</span></div>
                <div><ScaleIcon /><span>{e.quantity} Kg</span></div>
              </div>

              <div className='sales-agro-waste-bottom-div'>
                <div className='sales-agro-waste-contact'>
                  <div><ContactPhoneIcon />  &nbsp;{e.phoneNumber}</div>
                  <div><ContactMailIcon /> &nbsp;{e.email}</div>
                  <div>Posted Date :&nbsp;{e.createdAt.split("T")[0]} </div>
                </div>
                <form className='buy-botton-container' onSubmit={handleBuy}>
                  <input
                    type="number"
                    placeholder='Required Quantity'
                    value={requiredQty}
                    onChange={(event) => handleRequiredQtyChange(event, e.price)}
                  />
                  <input
                    type="text"
                    placeholder='Payable Amount'
                    value={amount}
                    readOnly
                  />
                  <button type="submit" className='buy-botton'>Buy</button>
                </form>
              </div>

              {
                role==="Admin"&&<div className='agro-sales-action-buttons'>
                <button onClick={()=>handleEdit(e)} className='edit-button'>Edit </button>
                <button onClick={()=>handleDelete(e)} className='delete-button'>Delete </button>
           </div>
              }

            </div>
            
          </div>
        ))}

        
      </div>
    </>
  );
}

export default SalesPage;
