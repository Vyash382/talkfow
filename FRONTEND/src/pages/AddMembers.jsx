import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Stack, Button, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';
const AddMembers = (props) => {
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    const fn = async()=>{
      const response = await fetch('http://localhost:3000/chat/NewMembers', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : props.uri
      }),
      credentials: 'include'
    });
    const json = await response.json();
    // console.log("-------");
    // console.log(json);
    // console.log("-------");
    setUsers(json);
    }
    fn();
  },[])
  const [groupMember, setGroupMember] = useState([]);
  const [groupName, setGroupName] = useState("");

  const addHandler = (id) => {
    console.log(id);
    console.log(groupMember);
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

  const handleClose = async() => {
    const formData = {
      id:props.uri,
      members : groupMember
    };
    const response = await fetch('http://localhost:3000/chat/AddMembs', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
    props.msg(false);
  };
  const close = ()=>{
    props.msg(false);
  }
  return (
    
      <Dialog open={true} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Members</DialogTitle>
        <Stack spacing={2} p={2} sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {users.length === 0 ? (
            <p>All your friends are in this group</p>
          ) : (
            users.map((notification) => (
              <div key={notification.id} className={`user-item ${isSelected(notification.id) ? 'selected' : ''}`} onClick={() => addHandler(notification.id)}>
                <img src={notification.avatar} alt={notification.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>{notification.name} </div>
              </div>
            ))
          )}
          <Button variant="contained"  onClick={handleClose}>Add Here</Button>
          <Button variant="contained" color='error' onClick={close}>Cancel</Button>
        </Stack>
      </Dialog>
    
  );
};

export default AddMembers;
