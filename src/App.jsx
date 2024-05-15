import React from 'react'
import Login from './pages/AuthPage/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from './pages/AuthPage/SignUp'
import ForgotPassword from './pages/AuthPage/ForgotPassword'
import ResetPassword from './pages/AuthPage/ResetPassword'
import Complaint from './pages/AppPage/complaint/Complaint'
import DefaultPage from './components/DefaultPage'
import Dashboard from './pages/AppPage/Dashboard'
import TrackComplaint from './pages/AppPage/complaint/TrackComplaint'
import EditComplaint from './pages/AppPage/complaint/EditComplaint'

export  const API_URL ="http://localhost:8001"
// export const API_URL = "https://rural-development-be.onrender.com"


function App() {
  return <>
  <BrowserRouter>
   <Routes>
      <Route path='/landing-page' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/complaint/:id' element={<Complaint/>}/>
      <Route path='/track-complaint' element={<TrackComplaint/>}/>
      <Route path='/edit-complaint' element={<EditComplaint/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

      
      <Route path='' element={<Navigate to={'/landing-page'}/>}/>
      <Route path='*' element={<DefaultPage/>}/>


   </Routes>
  </BrowserRouter>
  

  </>
}

export default App