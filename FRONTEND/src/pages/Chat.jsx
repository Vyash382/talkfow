import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppLayout from '../components/Layouts/AppLayout';
import { IconButton, Stack, TextField } from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import Attachh from '../components/Dialogs/Attachh';
import { getSocket } from '../socket';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const params = useParams();
  const chatId = params.chatID;
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const [dbx, setDbx] = useState(false);
  const [user, setUser] = useState('');
  
  const socket = getSocket();
  const containerRef = useRef(null);

  const newMessages = useCallback((data) => {
    console.log(data.chatId+" "+params.chatID);
    if(params.chatID==data.chatId){
      const obj = {
        'sender._id': data.message.sender._id,
        'avatar': data.message.sender.avatar,
        'content': data.message.content
      }
      setMessages(prevMessages => [...prevMessages, obj]);
    }
  }, [params.chatID]);

  useEffect(() => {
    const resetState = () => {
      setPage(1);
      setMessages([]);
    };

    const misc = async () => {
      try {
        const response = await fetch(`https://talkfow-backend-3.onrender.com/user/getMy`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const preMsg = async (chatId, page) => {
      try {
        console.log(chatId + " " + page);
        const response = await fetch(`https://talkfow-backend-3.onrender.com/chat/myMessages/${chatId}?page=${page}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        const yy = data.messages.map(element => ({
          'sender._id': element.sender._id,
          'content': element.content,
          'avatar': element.sender.avatar
        }));

        setMessages(yy);  // Set messages directly without appending
        setPage(2);       // Set the page to the next one
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchChatMembers = async (chatId) => {
      try {
        const formData = { chatId: chatId };

        const response = await fetch('https://talkfow-backend-3.onrender.com/chat/members', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
        console.log(res);
        setMembers(res.members);
      } catch (error) {
        console.error('Error fetching chat members:', error);
      }
    };

    resetState();
    misc();

    if (params.chatID) {
      preMsg(params.chatID, 1);
      fetchChatMembers(params.chatID);
    }
  }, [params.chatID]);

  useEffect(() => {
    socket.on('NEW_MESSAGE', newMessages);
    return () => {
      socket.off('NEW_MESSAGE', newMessages);
    };
  }, [newMessages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const dbxHandler = () => {
    setDbx(!dbx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    socket.emit('NEW_MESSAGE', { chatId, members, message: msg });
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
          Element['sender._id'] !== user ? (
            <div key={index} style={{ display: "flex" }}>
              <img src={Element.avatar} alt="Avatar" style={{
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
            <div key={index} style={{ display: "flex", gap: "10px" }}>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", padding: "7px", borderRadius: "5px", backgroundColor: "bisque", minHeight: "50px", height: "auto", width: "auto" }}>
                {Element.content}
              </div>
              <img src={Element.avatar} alt="Avatar" style={{
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
