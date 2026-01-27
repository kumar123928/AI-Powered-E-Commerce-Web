import React, { Children, createContext } from 'react'
export const AuthDataContext = createContext()

function AuthContext({children}) {
let serverUrl = "https://ai-powered-e-commerce-web-backend.onrender.com"

    let value = {
serverUrl
    }

  return (
    
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>

   
  )
}

export default AuthContext
