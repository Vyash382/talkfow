import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children,user,redirect}) => {

  if(!user){return <Navigate to={redirect} />}
  else {return children;}
}

export default ProtectRoute
