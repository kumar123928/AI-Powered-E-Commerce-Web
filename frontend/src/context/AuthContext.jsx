import React, { createContext } from 'react'
export const AuthDataContext = createContext()

function AuthContext({children}) {
    let serverUrl = "https://ai-powered-e-commerce-web-backend.onrender.com"
    let value = {
serverUrl
    }
  return (
    <div>
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
