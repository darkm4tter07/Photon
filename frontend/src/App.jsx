import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster} from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  // console.log(onlineUsers);

  if(isCheckingAuth && !authUser){
    return <div>Loading...</div>
  }

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={authUser? <Home />: <Navigate to="/login"/>} />
      <Route path='/signup' element={!authUser? <Signup/> : <Navigate to="/" />} />
      <Route path="/login" element={!authUser? <Login /> :<Navigate to="/" />} />
      <Route path="/profile" element={authUser? <Profile />: <Navigate to="/login"/>} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App