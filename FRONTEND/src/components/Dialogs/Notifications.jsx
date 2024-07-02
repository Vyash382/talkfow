import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Stack, Button } from '@mui/material';

const Notifications = (props) => {
  const [open, setOpen] = useState(true);
  const [notf,setNotf] = useState([]);
  const [ue,setUe] = useState(0);
  useEffect(()=>{
    const func = async()=>{
      const response = await fetch(`http://localhost:3000/user/fetchRequests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      const json = await response.json();
      setNotf(json);
    };
    func();
  },[])
  const accept = async(id)=>{
    
    const response = await fetch(`http://localhost:3000/user/accept`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        sender: id
    }),
    credentials: 'include'
});


      const json = await response.json();
      console.log(json);
      setUe(ue+1);
  }
  const reject = async(id)=>{
    
    const response = await fetch(`http://localhost:3000/user/reject`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        sender: id
    }),
    credentials: 'include'
});


      const json = await response.json();
      console.log(json);
      setUe(ue+1);
  }
  

  const handleClose = () => {
    props.msg2(false);
  };

  return (
    
      <Dialog open={props.msg} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Notifications</DialogTitle>
        <Stack spacing={2} p={2} sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {notf.length === 0 ? (
            <p>No Notifications</p>
          ) : (
            notf.map((notification) => (
              <div key={notification.idd} style={{ display: "flex", gap:"20px", alignItems: "center" }}>
                <img src={notification.avatar} alt={notification.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>{notification.name} sent you a friend request</div>
                <div style={{display:"flex",gap:"5px"}}>
                  <Button variant="contained" color="primary" onClick={()=>{accept(notification.idd)}}>Accept</Button>
                  <Button variant="contained" color="error" onClick={()=>{reject(notification.idd)}}>Reject</Button>
                </div>
              </div>
            ))
          )}
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </Stack>
      </Dialog>
    
  );
};

export default Notifications;
