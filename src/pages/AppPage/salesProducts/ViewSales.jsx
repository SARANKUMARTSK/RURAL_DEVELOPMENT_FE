import React from 'react'
import TopBar from '../../../components/TopBar'
import SearchIcon from '@mui/icons-material/Search';
import '../app.css'
import SalesCard from '../../../components/SalesCard';
function ViewSales() {
  return <>
  <TopBar/>
    <div className="view-sales-search-bar">
        <select>
          <option value="">Select City Name</option>
          <option value="">Pollachi</option>
          <option value="">Anaimalai</option>
        </select>
        <div className="sales-search-input">
              <button><SearchIcon/></button>
              <input type="text"  placeholder='Search Product'/>
        </div>
    </div>
    <div className='view-sales-page'>
      <SalesCard/>
    </div>
  
  </>
}

export default ViewSales