import { useRef, useState } from 'react';
import React from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import { Icon, IconButton, Stack,TextField, Typography } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import Attachh from '../components/Dialogs/Attachh';

const Chat = () => {
  const [user,setUser] = useState(1);
  const [dbx,setDbx] = useState(false);
  const dbxHandler = ()=>{
    if(dbx){
      setDbx(false);
    }
    else {
      setDbx(true);
    }
    console.log(dbx);
  }
  const messages = [{
    "sender._id":1,
    "content":"Hello"
  },
  {
    "sender._id":2,
    "content":"Hi"
  },
  {
    "sender._id":1,
    "content":"Kaise Ho"
  },
  {
    "sender._id":2,
    "content":"Mai theek hu, aap batao"
  },
  {
    "sender._id":1,
    "content":"mai bhi theek hu, aap kaha ho?"
  },
  {
    "sender._id":2,
    "content":"ghar me hu kuch kaam the kya"
  },
  {
    "sender._id":1,
    "content":"Nahi kuch khaas nahi"
  },
  {
    "sender._id":2,
    "content":"Batao"
  },
  {
    "sender._id":1,
    "content":"Ok bye"
  },
  {
    "sender._id":2,
    "content":"Bye"
  },
  {
    "sender._id":1,
    "content":"Fuck Me Daddy"
  },
  {
    "sender._id":2,
    "content":"Ohh yeah "
  },
  {
    "sender._id":2,
     "content":"Galat Baatein nahi"
  }
  ]
  const containerRef = useRef(null);
  const [msg,setMsg] = useState("");
  return (
    <>
    <Stack
    ref={containerRef}
    boxSizing={"border-box"}
    padding={"1rem"}
    spacing={"1rem"}
    bgcolor={"#f0f8ff"}
    height={"90%"}
    sx={{
      overflowX:"hidden",
      overflowY:"auto"
    }}
    >
      {
        messages.map((Element, index) => (
          Element['sender._id']==user?(
            <div style={{display:"flex"}}>
              <img src="https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain" alt="Avatar" style={{
               width: '40px',
               height: '40px',
               borderRadius: '50%',
               marginRight: '10px'
             }} /> 
            <div  style={{marginRight:"auto",display:"flex",alignItems:"center",padding:"7px",borderRadius:"5px",backgroundColor:"#1976d2",minHeight:"50px",height:"auto",maxWidth:"100%",color:"white"}}>
    
              {Element.content}
            </div>
            </div>
            
          ):(
            <div style={{display:"flex",gap:"10px"}}>
              
            <div  style={{marginLeft:"auto",display:"flex",alignItems:"center",padding:"7px",borderRadius:"5px",backgroundColor:"bisque",minHeight:"50px",height:"auto",width:"auto"}}>
    
              {Element.content}
            </div>
            <img src="https://th.bing.com/th/id/OIP.0l7k5zqRUVQ5Yq9eTpW2LgHaLJ?rs=1&pid=ImgDetMain" alt="Avatar" style={{
               width: '40px',
               height: '40px',
               borderRadius: '50%',
               marginRight: '10px'
             }} /> 
            </div>
          )
        ))
      }
      <Attachh msg={dbx} control={setDbx} />
    </Stack>
    <form style={{height:"10%"}}>
      <Stack direction={"row"} height={"100%"} >
        
        <IconButton onClick={dbxHandler}>
          <AttachFile/>
        </IconButton>
        <TextField
          variant="outlined"
          label="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          fullWidth
          style={{marginTop:"5px"}}
        />
        <IconButton >
          <Send/>
        </IconButton>
      </Stack>

    </form>
    </>
    
  )
}

export default AppLayout()(Chat);
