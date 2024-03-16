import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Attachh = (props) => {
  // const [st,setSt] = useState();
  // if()
  const handleClose = ()=>{
    if(props.msg) {
      props.control(false);
    }
    else {
      props.control(true);
    }
  }
  return (
    <div style={{backgroundColor:"white",height:"60px",width:"200px",position:"absolute",bottom:"10%",left:"17%",display:`${props.msg?"flex":"none"}`,flexWrap:"wrap",borderRadius:"20%",alignItems:"center",justifyContent:"center"}}>
      <IconButton onClick={() => console.log('Video icon clicked')}>
          <VideocamIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Photo icon clicked')}>
          <PhotoCameraIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Music icon clicked')}>
          <MusicNoteIcon />
        </IconButton>
        <IconButton onClick={() => console.log('File icon clicked')}>
          <InsertDriveFileIcon />
        </IconButton>
    </div>
  )
}

export default Attachh
