import React, { useRef, useState } from 'react';
import AppLayout from '../components/Layouts/AppLayout';
import { IconButton, Stack, TextField } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import Attachh from '../components/Dialogs/Attachh';

const Chat = () => {
  const [user, setUser] = useState(1);
  const [dbx, setDbx] = useState(false);
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);
  const [msg, setMsg] = useState("");

  const dbxHandler = () => {
    setDbx(!dbx);
    console.log(dbx);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const randomSenderId = Math.random() < 0.5 ? 1 : 2;
  const obj = { "sender._id": randomSenderId, "content": msg };
    const updatedMessages = [...messages, obj];
    setMessages(updatedMessages);
    setMsg(""); // Clear input field after submission
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

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
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {messages.map((Element, index) => (
          Element['sender._id'] === user ? (
            <div style={{ display: "flex" }}>
              <img src="https://i.pinimg.com/originals/4f/5a/3d/4f5a3d7be9361605886989491b1c69d5.jpg" alt="Avatar" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px'
              }} />
              <div style={{ marginRight: "auto", display: "flex", alignItems: "center", padding: "7px", borderRadius: "5px", backgroundColor: "#1976d2", minHeight: "50px", height: "auto", maxWidth: "100%", color: "white" }}>
                {Element.content}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", padding: "7px", borderRadius: "5px", backgroundColor: "bisque", minHeight: "50px", height: "auto", width: "auto" }}>
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
        ))}
        <Attachh msg={dbx} control={setDbx} />
      </Stack>
      <form onSubmit={handleSubmit} style={{ height: "10%" }}>
        <Stack direction={"row"} height={"100%"} >
          <IconButton onClick={dbxHandler}>
            <AttachFile />
          </IconButton>
          <TextField
            variant="outlined"
            label="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            fullWidth
            style={{ marginTop: "5px" }}
          />
          <IconButton type='submit'>
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};

export default AppLayout()(Chat);
