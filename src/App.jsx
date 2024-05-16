import React from 'react'
import Login from './pages/AuthPage/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from './pages/AuthPage/SignUp'
import ForgotPassword from './pages/AuthPage/ForgotPassword'
import ResetPassword from './pages/AuthPage/ResetPassword'
import Complaint from './pages/AppPage/complaint/Complaint'
import DefaultPage from './components/DefaultPage'
import Dashboard from './pages/AdminPage/Dashboard'
import TrackComplaint from './pages/AppPage/complaint/TrackComplaint'
import EditComplaint from './pages/AppPage/complaint/EditComplaint'
import AddSales from './pages/AppPage/salesProducts/AddSales'
import ViewSales from './pages/AppPage/salesProducts/ViewSales'
import EditSales from './pages/AppPage/salesProducts/EditSales'
import AddContact from './pages/AppPage/contact/AddContact'
import EditContact from './pages/AppPage/contact/EditContact'
import Contact from './pages/AppPage/contact/Contacts'
import Donations from './pages/AppPage/donation/Donations'
import EditDonation from './pages/AppPage/donation/EditDonation'
import AddDonation from './pages/AppPage/donation/AddDonation'
import AddWaste from './pages/AppPage/waste/AddWaste'
import EditWaste from './pages/AppPage/waste/EditWaste'
import TrackWaste from './pages/AppPage/waste/TrackWaste'
import AddAnnouncement from './pages/AppPage/announcement/AddAnnouncement'
import EditAnnouncement from './pages/AppPage/announcement/EditAnnouncement'
import ViewAnnouncement from './pages/AppPage/announcement/ViewAnnouncement'
import AddImage from './pages/AppPage/gallery/AddImage'
import ViewImage from './pages/AppPage/gallery/ViewImage'
import DetailedAnnouncement from './pages/AppPage/announcement/DetailedAnnouncement'
export  const API_URL ="http://localhost:8001"
// export const API_URL = "https://rural-development-be.onrender.com"


function App() {
  return <>
  <BrowserRouter>
   <Routes>
      <Route path='/landing-page' element={<LandingPage/>}/>

      {/* Auth Pages  */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>

      {/* Complaint Pages  */}
      <Route path='/complaint/:id' element={<Complaint/>}/>
      <Route path='/track-complaint/:referenceLink' element={<TrackComplaint/>}/>
      <Route path='/edit-complaint' element={<EditComplaint/>}/>

      {/* Product Pages  */}
      <Route path='/add-sales-product' element={<AddSales/>}/>
      <Route path='/view-sales-product' element={<ViewSales/>}/>
      <Route path='/edit-sales-product' element={<EditSales/>}/>

      {/* Contact Page  */}
      <Route path='add-contact' element={<AddContact/>}/>
      <Route path='edit-contact' element={<EditContact/>}/>
      <Route path='view-contact' element={<Contact/>}/>

      {/* Donation Page  */}
      <Route path='view-donation' element={<Donations/>}/>
      <Route path='edit-donation' element={<EditDonation/>}/>
      <Route path='add-donation' element={<AddDonation/>}/>

      {/* Waste Page  */}
      <Route path='add-waste' element={<AddWaste/>}/>
      <Route path='edit-waste' element={<EditWaste/>}/>
      <Route path='track-waste' element={<TrackWaste/>}/>

      {/* Announcement Page  */}
      <Route path='add-announcement' element={<AddAnnouncement/>}/>
      <Route path='edit-announcement' element={<EditAnnouncement/>}/>
      <Route path='view-announcement' element={<ViewAnnouncement/>}/>
      <Route path='view-announcement/:id' element={<DetailedAnnouncement/>}/>

       {/* Gallery  */}
      <Route path='add-image' element={<AddImage/>}/>
      <Route path='gallery' element={<ViewImage/>}/>
       

      {/* Admin Pages  */}
      <Route path='/dashboard' element={<Dashboard/>}/>

      {/* Default Routes  */}
      <Route path='' element={<Navigate to={'/landing-page'}/>}/>
      <Route path='*' element={<DefaultPage/>}/>


   </Routes>
  </BrowserRouter>
  

  </>
}

export default App