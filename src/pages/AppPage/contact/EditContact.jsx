import React from 'react'
import Topbar from '../../../components/TopBar'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FaxIcon from '@mui/icons-material/Fax';
import BadgeIcon from '@mui/icons-material/Badge';

function EditContact() {
  return<>
  <Topbar/>
  <div className="add-contact-page">

    <div className="add-contact-left-container">
       <img src="https://cdn-icons-png.freepik.com/256/3095/3095583.png?semt=ais_hybrid" alt="" />
    </div>

    <div className="add-contact-right-container">
  

       <form>

       <div className='add-contact-personal'>
          <div><input type="text" placeholder='Name Of The Contact'/><PersonPinIcon/></div>
          <div><input type="text" placeholder='Email' /><AttachEmailIcon/></div>
          <div><input type="text" placeholder='Phone Number' /><PhoneEnabledIcon/></div>
          <div><input type="text" placeholder='Fax' /><FaxIcon/></div>
          <div><input type="text" placeholder='Position' /><BadgeIcon/></div>
       </div>

        <div className='add-contact-address'>
              <select>
                <option value="">State</option>
                <option value="Tamilnadu">Tamilnadu</option>
                <option value=""></option>
              </select>
              <select>
                <option value="">District</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruppur">Tiruppur</option>
              </select>
              <select>
                <option value="">City</option>
                <option value="Pollachi">Pollachi</option>
              </select>
              <select>
                <option value="">Village</option>
                <option value="Anaimalai">Anaimalai</option>
              </select>
              <input type="text" placeholder='pincode' />
        </div>

        <div className="add-contact-button-container">
            <button>Submit</button>
        </div>  
       </form>

    </div>

  </div>
  </>
}

export default EditContact