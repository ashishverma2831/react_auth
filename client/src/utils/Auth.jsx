import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router';

const Auth = ({children}) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
   isLoggedIn ? children : <Navigate to="/" replace /> 
  )
}

export default Auth