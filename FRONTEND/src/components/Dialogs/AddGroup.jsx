import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Stack, Button, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import './AddGroup.css'; // Import your CSS file
import axios from 'axios';
const AddGroup = (props) => {
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    const fn = async()=>{
      const response = await fetch('https://talkfow-backend-3.onrender.com/user/friends', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      name : groupName,
      members : groupMember
    };
    const res = await axios.post('https://talkfow-backend-3.onrender.com/chat/newGroupChat', formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });
    setGroupMember([]);
    setGroupName('');
    props.msg2(false);
  };
  const close = ()=>{
    setGroupMember([]);
    setGroupName('');
    props.msg2(false);
  }
  return (
    
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
              <div key={notification.id} className={`user-item ${isSelected(notification.id) ? 'selected' : ''}`} onClick={() => addHandler(notification.id)}>
                <img src={notification.avatar} alt={notification.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                <div>{notification.name} </div>
              </div>
            ))
          )}
          <Button variant="contained"  onClick={handleClose}>Create Group</Button>
          <Button variant="contained" color='error' onClick={close}>Cancel</Button>
        </Stack>
      </Dialog>
    
  );
};

export default AddGroup;
