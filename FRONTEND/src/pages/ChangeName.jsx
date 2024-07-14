import React from 'react'
import { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';
const ChangeName = (props) => {
    const [name,setName] = useState('');
    const {uri,onC} = props;
    const onClose= ()=>{
        onC(false);
    }
    const onSubmit = async()=>{
        const response = await fetch('https://talkfow-backend-3.onrender.com/chat/changeName', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:uri,
              name:name
            }),
            credentials: 'include'
          });
          const json = await response.json();
          console.log(json);
          console.log('8888888');
        onC(false);
    }
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>New Name?</DialogTitle>
    <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <TextField
        variant="outlined"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onSubmit} color="primary" style={{ marginRight: '10px' }}>Change</Button>
        <Button onClick={onClose} color="secondary" style={{ marginRight: '10px' }}>Close</Button>
       
      </div>
    </div>
  </Dialog>
  )
}

export default ChangeName
