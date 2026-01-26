import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
// import { authDataContext } from './authContext'
import { AuthDataContext } from '../context/AuthContext'

import axios from 'axios'
import { useEffect } from 'react'

export const userDataContext = createContext();
function UserContext({children}) {
let [userData, setUserData] = useState(undefined)
let {serverUrl} = useContext(AuthDataContext)

// const getCurrentuser = async() =>{
// try {
//      axios.post(serverUrl + "/api/user/getcurrentuser",{},{withCredentials:true})

//     setUserData(result.data)
//     console.log(result.data)
// } catch (error) {
//     setUserData(null)
//     console.log(error)
// }
// }

const getCurrentUser = async() =>{
try {
     let result = await axios.post(serverUrl + "/api/user/getcurrentuser",
        {},
        {withCredentials:true})

    setUserData(result.data)
    console.log(result.data)
} catch (error) {
    setUserData(null)
    console.log(error)
}
}

useEffect(()=>{
    getCurrentUser()
},[])

let value = {
userData, 
setUserData,
getCurrentUser,
}


  return (
  
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>

           
  )
}

export default UserContext
