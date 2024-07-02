import React from 'react'
import AppLayout from '../components/Layouts/AppLayout.jsx'
import { Typography } from '@mui/material'

const Home = () => {
  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#51a0a0', fontSize: '2rem' }}
      >Select a friend to chat</Typography>
    </div>
  )
}

export default AppLayout()(Home)