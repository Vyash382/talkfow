import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Group from './pages/Group';
import Chat from './pages/Chat';
import Register from './pages/Register';
import ProtectRoute from './components/Auth/ProtectRoute.jsx';
import Notfound from './pages/Notfound.jsx';
import GroupItem from './pages/GroupItem.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { userExists, UserNotExists } from "./redux/reducers/auth";
import { SocketProvider } from './socket.jsx';
const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getUserDetails', {
          withCredentials: true, 
        });
        console.log(response);
        if (response.data) {
          dispatch(userExists(response.data.username));
        }
        else{
          dispatch(UserNotExists());
        }
      } catch (error) {
        dispatch(UserNotExists());
        console.error("Failed to fetch user details:", error);
        
      }
    };
    
  
    fetchUserDetails();
  }, []);

  return (
    <>
      <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path='/' element={<ProtectRoute user={user} redirect='/login'><Home  /></ProtectRoute>}></Route>
          <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login /></ProtectRoute>}></Route>
          <Route path='/group' element={<ProtectRoute user={user} redirect='/login'><Group /></ProtectRoute>}></Route>
          <Route path='/chat/:chatID' element={<ProtectRoute user={user} redirect='/login'><Chat /></ProtectRoute>}></Route>
          <Route path='/register' element={<ProtectRoute user={!user} redirect='/'><Register /></ProtectRoute>}></Route>
          <Route path='/group/:groupID' element={<ProtectRoute user={user} redirect='/login'><GroupItem /></ProtectRoute>}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;