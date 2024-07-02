import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/Layouts/AppLayout';
import { IconButton, Stack, TextField } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import Attachh from '../components/Dialogs/Attachh';
import axios from 'axios';
import { getSocket } from '../socket';
import { useParams } from 'react-router-dom';
const Chat = ({user}) => {
  const params = useParams();
  
  const chatId = params.chatID;
        
  const socket = getSocket();
  const [dbx, setDbx] = useState(false);
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [members,setMembers] = useState([]);
  const newMessages = useCallback((data)=>{
    console.log(data);
  },[]);
  useEffect(()=>{
    const fetchChatMembers = async (chatId) => {
      try {
        const formData = {
          chatId: chatId
        };
        
        const response = await fetch('http://localhost:3000/chat/members', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
        const yt = res.members;
        console.log(yt);
        // const arr = await res.json();
        setMembers(yt);
        // console.log(members);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchChatMembers(chatId);
  },[]);
  useEffect(() => {
   socket.on('NEW_MESSAGE',newMessages);
    return ()=>{
      socket.off('NEW_MESSAGES',newMessages);
    }
  }, []);
  const dbxHandler = () => {
    setDbx(!dbx);
    console.log(dbx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (!messages.trim()) return;
    socket.emit('NEW_MESSAGE', { chatId, members, message:msg });
    setMsg("");
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
