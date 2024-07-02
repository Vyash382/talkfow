import React from 'react';
import Myself from './Myself';
import Button from '@mui/material/Button';
import { Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { UserNotExists } from '../../redux/reducers/auth';
import axios from 'axios';
const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandler = async () => {
    
    try {
      dispatch(UserNotExists());
      const response = await axios.get('http://localhost:3000/user/logout', {
        withCredentials: true, 
      });
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Slide direction="down" in={props.msg} mountOnEnter unmountOnExit>
      <div
        style={{
          height: props.msg ? '72vh' : '0', // Set initial and final height
          width: '27%',
          color: 'black',
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: '5',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
          gap: '4%',
          transition: 'height 0.3s ease-in-out', // Add transition property
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Myself />
        <Button variant="contained" color="error" onClick={logouthandler}>
          Log Out
        </Button>
      </div>
    </Slide>
  );
};

export default Profile;
