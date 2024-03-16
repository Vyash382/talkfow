import React, { useState } from 'react';
import { Dialog, DialogTitle, Stack, Button } from '@mui/material';

const Notifications = (props) => {
  const [open, setOpen] = useState(true);
  const notf = [{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"1"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"2"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"3"
  },
  {
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"1"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"2"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":" Yash Sinha "
    },
    "_id":"3"
  }];

  const handleClose = () => {
    props.msg2(false);
  };

  return (
    <div style={{ height: "100px", width: "250px", position: "fixed", zIndex: "12" }}>
      <Dialog open={props.msg} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Notifications</DialogTitle>
        <Stack spacing={2} p={2} sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {notf.length === 0 ? (
            <p>No Notifications</p>
          ) : (
            notf.map((notification) => (
              <div key={notification._id} style={{ display: "flex", gap:"20px", alignItems: "center" }}>
                <img src={notification.Sender.avatar} alt={notification.Sender.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>{notification.Sender.name} sent you a friend request</div>
                <div style={{display:"flex",gap:"5px"}}>
                  <Button variant="contained" color="primary">Accept</Button>
                  <Button variant="contained" color="error">Reject</Button>
                </div>
              </div>
            ))
          )}
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </Stack>
      </Dialog>
    </div>
  );
};

export default Notifications;
