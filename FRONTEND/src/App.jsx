import React, { useState } from 'react'
import { useEffect } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Group from './pages/Group'
import Chat from './pages/Chat'
import Register from './pages/Register'
import ProtectRoute from './components/Auth/ProtectRoute.jsx'
import Notfound from './pages/Notfound.jsx'
import GroupItem from './pages/GroupItem.jsx'
const App = () => {
  const [user,setUser] = useState(false);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectRoute user={user} redirect='/login'><Home /></ProtectRoute>}></Route>
        <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login user={user} setUser={setUser} /></ProtectRoute>}></Route>
        <Route path='/group' element={<ProtectRoute user={user} redirect='/login'><Group /></ProtectRoute>}></Route>
        <Route path='/chat/:chatID' element={<ProtectRoute user={user} redirect='/login'><Chat /></ProtectRoute>}></Route>
        <Route path='/register' element={<ProtectRoute user={!user} redirect='/'><Register /></ProtectRoute>}></Route>
        <Route path='/group/:groupID' element={<ProtectRoute user={user} redirect='/login'><GroupItem /></ProtectRoute>}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
