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
import AddWaste from './pages/AppPage/waste/AddWaste'
import EditWaste from './pages/AppPage/waste/EditWaste'
import TrackWaste from './pages/AppPage/waste/TrackWaste'
import AddAnnouncement from './pages/AppPage/announcement/AddAnnouncement'
import EditAnnouncement from './pages/AppPage/announcement/EditAnnouncement'
import ViewAnnouncement from './pages/AppPage/announcement/ViewAnnouncement'
import AddImage from './pages/AppPage/gallery/AddImage'
import ViewImage from './pages/AppPage/gallery/ViewImage'
import DetailedAnnouncement from './pages/AppPage/announcement/DetailedAnnouncement'
import UserProduct from './pages/AppPage/salesProducts/UserProduct'
import Home from './pages/AdminPage/Home'
import ComplaintList from './pages/AdminPage/complaints/ComplaintList'
import WasteList from './pages/AdminPage/query/WasteList'
import User from './pages/AdminPage/user/User'
import ContactList from './pages/AdminPage/contact/ContactList'
import EditUser from './pages/AdminPage/user/EditUser'
import YourComplaints from './pages/AppPage/complaint/YourComplaints'
import AssignComplaint from './pages/AdminPage/complaints/AssignComplaint'
import ComplaintView from './pages/AdminPage/complaints/ComplaintView'
import YourQueries from './pages/AppPage/waste/YourQueries'
import AssignWaste from './pages/AdminPage/query/AssignWaste'
import WasteView from './pages/AdminPage/query/WasteView'
import AddContact from './pages/AdminPage/contact/AddContact'
import EditContact from './pages/AdminPage/contact/EditContact'
import CustomerCare from './pages/AppPage/customerCare/CustomerCare'
import ViewQueries from './pages/AdminPage/customerCare/ViewQueries'
import DetailedCustomerCare from './pages/AdminPage/customerCare/DetailedCustomerCare'

export  const API_URL ="http://localhost:8001"
// export const API_URL = "https://rural-development-be.onrender.com"


function App() {
  return <>
  <BrowserRouter>
   <Routes>
      <Route path='/landing-page' element={<LandingPage/>}/>

      {/* Admin Pages  */}
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='complaints' element={<ComplaintList/>}/>
        <Route path='complaint-detailed-view/:id' element={<ComplaintView/>}/>
        <Route path='waste-collection' element={<WasteList/>}/>
        <Route path='users' element={<User/>}/>
        <Route path='edit-user/:id' element={<EditUser/>}/>
        <Route path='contacts' element={<ContactList/>}/>
        <Route path='assign-complaint/:id' element={<AssignComplaint/>}/>
        <Route path='assign-waste-query/:id' element={<AssignWaste/>}/>
        <Route path='waste-detailed-view/:id' element={<WasteView/>}/>
        <Route path='add-contact' element={<AddContact/>}/>
        <Route path='edit-contact/:id' element={<EditContact/>}/>
        <Route path='customer-care-queries' element={<ViewQueries/>}/>
        <Route path='detailed-view-customer-care/:id' element={<DetailedCustomerCare/>}/>
        <Route path='' element={<Navigate to={"home"}/>}/>
      </Route>

      
      {/* Auth Pages  */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>

      {/* Complaint Pages  */}
      <Route path='/add-complaint/:id' element={<Complaint/>}/>
      <Route path='/track-complaint/:referenceLink' element={<TrackComplaint/>}/>
      <Route path='/edit-complaint/:id' element={<EditComplaint/>}/>
      <Route path='/your-complaints/:id' element={<YourComplaints/>}/>

      {/* Waste Page  */}
      <Route path='/add-waste/:id' element={<AddWaste/>}/>
      <Route path='/edit-waste/:id' element={<EditWaste/>}/>
      <Route path='/track-waste/:referenceLink' element={<TrackWaste/>}/>
      <Route path='/your-queries/:id' element={<YourQueries/>}/>

      {/* Customer Care*/}
      <Route path='view-customer-care' element={<CustomerCare/>}/>

      {/* Product Pages  */}
      <Route path='/add-sales-product/:id' element={<AddSales/>}/>
      <Route path='/view-sales-product/:id' element={<ViewSales/>}/>
      <Route path='/edit-sales-product/:id' element={<EditSales/>}/>
      <Route path='/user-sales-product/:id' element={<UserProduct/>}/>



      {/* Announcement Page  */}
      <Route path='/add-announcement' element={<AddAnnouncement/>}/>
      <Route path='/edit-announcement' element={<EditAnnouncement/>}/>
      <Route path='/view-announcement' element={<ViewAnnouncement/>}/>
      <Route path='/view-announcement/:id' element={<DetailedAnnouncement/>}/>

       {/* Gallery  */}
      <Route path='/add-image' element={<AddImage/>}/>
      <Route path='/gallery' element={<ViewImage/>}/>

      {/* Default Routes  */}
      <Route path='' element={<Navigate to={'/landing-page'}/>}/>
      <Route path='*' element={<DefaultPage/>}/>


   </Routes>
  </BrowserRouter>
  

  </>
}

export default App