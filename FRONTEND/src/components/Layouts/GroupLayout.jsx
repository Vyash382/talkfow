import React from 'react'
import Grouplist from './Grouplist';
import { IconButton } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GroupLayout = (WrappedComponent) => {
    
  return(props)=>{
    const Navigate = useNavigate();
    const handleClick = ()=>{
        Navigate('/');
    }
    return(
    <div style={{height:'100vh',width:'100vw',display:'flex'}}>
      <div style={{width:'28vw',backgroundColor:'azure',overflowY:'auto',display:'flex',flexDirection:'column',gap:'5px',alignItems:'center'}}>
        <h1 style={{color:'black'}}>Your Groups</h1>
        <Grouplist /></div>
      <div style={{backgroundColor:'#f8f4ff',width:'72vw',height:'100vh'}}>
        <IconButton  onClick={handleClick}>
            <KeyboardBackspace>

            </KeyboardBackspace>
        </IconButton>
     <WrappedComponent {...props} />
      </div>
    </div>
    )
  }
}

export default GroupLayout;
