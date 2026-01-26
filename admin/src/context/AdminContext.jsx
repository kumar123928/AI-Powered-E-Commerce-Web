import React, {  createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'


export const  AdminDataContext= createContext() 
function AdminContextProvider({children}) {
    let [adminData, setAdminData] = useState(null)
    let {serverUrl} =useContext(
      AuthDataContext)

    const getAdmin = async () => {
    try {
        let result = await axios.get(serverUrl + "/api/user/getadmin", {withCredentials:true})

      setAdminData(result.data)
      console.log(result.data)
      return result.data; 
    } catch (error) {
      setAdminData(null)
       console.log(error.response?.data || error);
       return null;
    }
    }
useEffect(() => {
getAdmin()
},[])

    let value = {
adminData,
setAdminData,
getAdmin
    }


  return (
   
        <AdminDataContext.Provider value={value}>
            {children}
        </AdminDataContext.Provider>

  )
}

export default AdminContextProvider