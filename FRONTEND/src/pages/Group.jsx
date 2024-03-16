import { KeyboardBackspace, WidthFull } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import GroupLayout from '../components/Layouts/GroupLayout'

const Group = () => {
  const Navigate = useNavigate();
  const handleClick = ()=>{
    Navigate('/')
  }
  return (
    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <h1 style={{color:'grey'}}>Click On A Group</h1>
    </div>
  )
}

export default GroupLayout(Group);
