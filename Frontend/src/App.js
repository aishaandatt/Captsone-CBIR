import react from 'react'
import { BroserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import LandingPage from './Components/LandingPage/LandingPage'
import UploadPage from './Components/UploadPage/UploadPage';

import './App.css';
import AdminPage from './Components/AdminPage/AdminPage';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';
function App() {
  const token = useSelector((state) => state.auth.token)
  return (
    <div className='App'>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/edit' element={<ProfileEdit />} />
        {/* <Route path='/profile' element={<ProfileScreen />} /> */}
      </Routes>
    </div>
  );
}

export default App;
