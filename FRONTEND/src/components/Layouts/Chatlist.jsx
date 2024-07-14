import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../../socket';

const Chatlist = () => {
  const navigate = useNavigate();
  const [obj, setObj] = useState([]);
  const [c, setC] = useState(1);
  const socket = getSocket();

  const refetch_chats = useCallback(() => {
    
    setC(prevC => (prevC === 1 ? 0 : 1));
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch('https://talkfow-backend-3.onrender.com/chat/my', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const json = await response.json();
      console.log(json);
      setObj(json.arr);
    };
    fetchChats();
  }, [c]);

  useEffect(() => {
    socket.on('REFETCH_CHATS', refetch_chats);
    socket.on('REFETCH_GROUP',refetch_chats);
    socket.on('KICKED',refetch_chats);
    return () => {
      socket.off('REFETCH_CHATS', refetch_chats);
      socket.off('KICKED', refetch_chats);
      socket.off('REFETCH_GROUP', refetch_chats);
    };
  }, [refetch_chats, socket]);

  const handleClick = (id) => {
    // console.log
    (id);
    setSelectedChat(id);
    navigate(`/chat/${id}`);
  };

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      {obj.map((element, index) => (
        <div
          key={element.id}
          style={{
            width: '100%',
            height: '7%',
            backgroundColor: selectedChat === element.id ? '#1976d2' : '#F0FFFF',
            color: selectedChat === element.id ? 'white' : 'black',
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'background-color 0.3s',
          }}
          onClick={() => handleClick(element.id)}
        >
          <img
            style={{ borderRadius: '40px' }}
            src={element.avatar}
            alt=""
          />
          <div>
            <p style={{ fontSize: '1em', marginTop: '0px', marginBottom: '2px' }}>
              {element.name}
            </p>
            <p style={{ fontSize: '0.5em' }}>{element.last_mesg}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Chatlist;
