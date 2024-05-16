import React from 'react'
import './components.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
function SalesCard() {
  return <>
  <div className="sales-card">
   <div className="sales-card-left">
        <img src="https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg" alt="" />
   </div>
   <div className="sales-card-right">
       <h2>Tomato</h2>
       <p><span><CurrencyRupeeIcon/>35 Rs</span> Per Kg</p>
       <p>200 Kg Available</p>
       <p>Fresh Tomato 200 Kg Available at Our Land. If Anyone Have it Simply Call me or Send a mail </p>
       <span>Pollachi / Coimbatore</span>
       <h4>Available</h4>
       <div className="sales-card-address">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" alt="" />
        <div>
            <span>Saran Kumar</span>
            <span>sarankumartsk72726@gmail.com</span>
            <span>8675750594</span>
        </div>
       </div>
        <div className='space-around'>
            <button className='edit-sales-button'><DriveFileRenameOutlineIcon/></button>
            <button className='delete-sales-button'><DeleteIcon/></button>
        </div>
   </div>
  </div>


  <div className="sales-card">
   <div className="sales-card-left">
        <img src="https://www.sheknows.com/wp-content/uploads/2020/04/egt410rtsygh7n5zvt99.jpeg" alt="" />
   </div>
   <div className="sales-card-right">
       <h2>Brinjal</h2>
       <p><span><CurrencyRupeeIcon/>68 Rs</span> Per Kg</p>
       <p>200 Kg Available</p>
       <p>Fresh Tomato 200 Kg Available at Our Land. If Anyone Have it Simply Call me or Send a mail </p>
       <span>Pollachi / Coimbatore</span>
       <h4>Available</h4>
       <div className="sales-card-address">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" alt="" />
        <div>
            <span>Saran Kumar</span>
            <span>sarankumartsk72726@gmail.com</span>
            <span>8675750594</span>
        </div>
       </div>
        <div className='space-around'>
            <button className='edit-sales-button'><DriveFileRenameOutlineIcon/></button>
            <button className='delete-sales-button'><DeleteIcon/></button>
        </div>
   </div>
  </div>


  <div className="sales-card">
   <div className="sales-card-left">
        <img src="https://static.wixstatic.com/media/26a3bd_57c4b0dc4f8e4821b4c0ad7130522991~mv2.jpg/v1/fill/w_280,h_280,q_90/26a3bd_57c4b0dc4f8e4821b4c0ad7130522991~mv2.jpg" alt="" />
   </div>
   <div className="sales-card-right">
       <h2>Beetroot</h2>
       <p><span><CurrencyRupeeIcon/>49 Rs</span> Per Kg</p>
       <p>200 Kg Available</p>
       <p>Fresh Tomato 200 Kg Available at Our Land. If Anyone Have it Simply Call me or Send a mail </p>
       <span>Pollachi / Coimbatore</span>
       <h4>Available</h4>
       <div className="sales-card-address">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" alt="" />
        <div>
            <span>Saran Kumar</span>
            <span>sarankumartsk72726@gmail.com</span>
            <span>8675750594</span>
        </div>
       </div>
        <div className='space-around'>
            <button className='edit-sales-button'><DriveFileRenameOutlineIcon/></button>
            <button className='delete-sales-button'><DeleteIcon/></button>
        </div>
   </div>
  </div>



  <div className="sales-card">
   <div className="sales-card-left">
        <img src="https://assets2.rappler.com/2021/11/Papaya.jpg" alt="" />
   </div>
   <div className="sales-card-right">
       <h2>Papaya</h2>
       <p><span><CurrencyRupeeIcon/>57 Rs</span> Per Kg</p>
       <p>200 Kg Available</p>
       <p>Fresh Tomato 200 Kg Available at Our Land. If Anyone Have it Simply Call me or Send a mail </p>
       <span>Pollachi / Coimbatore</span>
       <h4>Available</h4>
       <div className="sales-card-address">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" alt="" />
        <div>
            <span>Saran Kumar</span>
            <span>sarankumartsk72726@gmail.com</span>
            <span>8675750594</span>
        </div>
       </div>
        <div className='space-around'>
            <button className='edit-sales-button'><DriveFileRenameOutlineIcon/></button>
            <button className='delete-sales-button'><DeleteIcon/></button>
        </div>
   </div>
  </div>
  </>
}

export default SalesCard