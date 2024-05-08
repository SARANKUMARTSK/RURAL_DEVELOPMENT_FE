import React from 'react'
import TopBar from './LandingPage/TopBar'
import About from './LandingPage/About'
import Specification from './LandingPage/Specification'
import Footer from './LandingPage/Footer'
import Login from './AuthPage/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import SignUp from './AuthPage/SignUp'
import ForgotPassword from './AuthPage/ForgotPassword'
import ResetPassword from './AuthPage/ResetPassword'
import Complaint from './AppPage/Complaint'

export  const API_URL ="http://localhost:8001"


function App() {
  return <>
  <BrowserRouter>
   <Routes>
      <Route path='/landing-page' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/complaint' element={<Complaint/>}/>

      
      <Route path='*' element={<Navigate to='/landing-page'/>}/>


   </Routes>
  </BrowserRouter>
  
  {/* <Login/> */}
  </>
}

export default App