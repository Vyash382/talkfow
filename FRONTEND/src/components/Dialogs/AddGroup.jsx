import React, { useState } from 'react';
import { Dialog, DialogTitle, Stack, Button, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import './AddGroup.css'; // Import your CSS file

const AddGroup = (props) => {
  const users = [{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"6"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"5"
  },{
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"4"
  },
  {
    "Sender":{
      "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      "name":"Yash Sinha"
    },
    "_id":"3"
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
    "_id":"1"
  }];
  const [groupMember, setGroupMember] = useState([]);
  const [groupName, setGroupName] = useState("");

  const addHandler = (id) => {
    if (!groupMember.includes(id)) {
      const newArr = [...groupMember, id];
      setGroupMember(newArr);
    } else {
      const newArray = groupMember.filter(item => item !== id);
      setGroupMember(newArray);
    }
  };

  const isSelected = (id) => {
    return groupMember.includes(id);
  };

  const handleClose = () => {
    props.msg2(false);
  };

  return (
    <div style={{ height: "100px", width: "250px", position: "fixed", zIndex: "12" }}>
      <Dialog open={props.msg} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Create Group</DialogTitle>
        <TextField
          variant="outlined"
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          width="sm"
          style={{ marginBottom: '10px' }}
        />
        <Stack spacing={2} p={2} sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {users.length === 0 ? (
            <p>Add some friends first</p>
          ) : (
            users.map((notification) => (
              <div key={notification._id} className={`user-item ${isSelected(notification._id) ? 'selected' : ''}`} onClick={() => addHandler(notification._id)}>
                <img src={notification.Sender.avatar} alt={notification.Sender.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>{notification.Sender.name} </div>
              </div>
            ))
          )}
          <Button variant="contained"  onClick={handleClose}>Create Group</Button>
          <Button variant="contained" color='error' onClick={handleClose}>Cancel</Button>
        </Stack>
      </Dialog>
    </div>
  );
};

export default AddGroup;
