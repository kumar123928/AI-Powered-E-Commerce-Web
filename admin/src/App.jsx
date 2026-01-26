 import React, { useContext } from 'react'
 import {  Routes, Route } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { AdminDataContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

 function App() {
  return (
    <>
    <ToastContainer position="top-right" />
        <AppRoutes />
      </>
  );
}

 
function AppRoutes() {
  const { adminData } = useContext(AdminDataContext);

  if (!adminData) return <Login />;

  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/list" element={<List />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

 export default App
 