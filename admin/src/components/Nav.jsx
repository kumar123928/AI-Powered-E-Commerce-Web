import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useContext } from 'react'
import { AuthDataContext } from '../context/AuthContext'
import { AdminDataContext } from '../context/AdminContext'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


function Nav() {
  <>
  <ToastContainer position="top-right" />
  </>
  let navigate = useNavigate()
  let {serverUrl} = useContext(AuthDataContext)
  let {getAdmin} = useContext(AdminDataContext)

  const logout = async () => {
    try {
       const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
       toast.success("Logout Succesfully")
       getAdmin();
       navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>
<div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=> navigate("/")}>
  <img src={logo} alt="" className='w-[30px]' />
  <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>
 

</div>
 <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-[white] ' onClick={logout}>Logout
  </button>
    </div>
  )
}

export default Nav