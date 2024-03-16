import React from 'react';
import Myself from './Myself';
import Button from '@mui/material/Button';
import { Slide } from '@mui/material';

const Profile = (props) => {
  return (
    <Slide direction="down" in={props.msg} mountOnEnter unmountOnExit>
      <div
        style={{
          height: '0',
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
          height: props.msg ? '72vh' : '0', // Set initial and final height
        }}
      >
        <Myself />
        <Button variant='contained' color='error'>
          Log Out
        </Button>
      </div>
    </Slide>
  )
}

export default Profile;
