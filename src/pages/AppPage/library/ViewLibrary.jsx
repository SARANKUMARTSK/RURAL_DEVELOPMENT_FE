import React from 'react'
import Navbar from '../../../components/Navbar'
import TopBar from '../../../components/TopBar'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
function ViewLibrary() {
  return <>
  <TopBar/>
  <Navbar/>
  <div className="view-library">
    <h2>Tamil Books</h2>
    <div className="library-books-list">
       <div className="library-book relative">
           <img src="https://m.media-amazon.com/images/I/81rL6JJUBqL._AC_UF1000,1000_QL80_.jpg" alt="" />
           <div className='library-book-specifications' >
            <h3>Thirukkural</h3>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h5>338 Pages</h5>
                <h5><AutoStoriesIcon/></h5>
            </div>
           </div>
       </div>
       <div className="library-book relative">
           <img src="https://qph.cf2.quoracdn.net/main-qimg-2c94a3ace1fc8e116026f308ee05875d.webp" alt="" />
           <div className='library-book-specifications' >
            <h3>3rd World War</h3>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h5>506 Pages</h5>
                <h5><AutoStoriesIcon/></h5>
            </div>
           </div>
       </div>
       <div className="library-book relative">
           <img src="https://qph.cf2.quoracdn.net/main-qimg-4b0d6053c81ccc21d83974daedd7300f-lq" alt="" />
           <div className='library-book-specifications' >
            <h3>The Last Day</h3>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h5>220 Pages</h5>
                <h5><AutoStoriesIcon/></h5>
            </div>
           </div>
           
       </div>
       <div className="library-book relative">
           <img src="https://tamilbookspdf.com/wp-content/uploads/2021/07/Manasu-Pola-Vazhkai-tamil-motivational-book-185x278.jpg" alt="" />
           <div className='library-book-specifications' >
            <h3>Manasu Pola Vaalkai</h3>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h5>338 Pages</h5>
                <h5><AutoStoriesIcon/></h5>
            </div>
           </div>
       </div>
       <div className="library-book relative">
           <img src="https://m.media-amazon.com/images/I/510unojDrsL._AC_UF1000,1000_QL80_.jpg" alt="" />
           <div className='library-book-specifications' >
            <h3>Yaarum Illatha Thesam</h3>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h5>338 Pages</h5>
                <h5><AutoStoriesIcon/></h5>
            </div>
           </div>
       </div>
       <div className="library-book-see-more">See More...</div>
    </div>

    <h2>English Books</h2>
    

    <h2>History Books</h2>
    

  </div>
  </>
}

export default ViewLibrary