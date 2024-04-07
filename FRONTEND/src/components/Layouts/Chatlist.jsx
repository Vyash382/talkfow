import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';


const Chatlist = () => {
  const Navigate = useNavigate();
  const [obj,setObj] = useState([]);
  useEffect(()=>{
    const fn = async()=>{
      const response = await fetch('http://localhost:3000/user/friends', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    const json = await response.json();
    setObj(json);
    }
    setInterval(()=>{
      fn();
    },1000)
  },[])

  const [selectedChat, setSelectedChat] = useState(null);

  const handleClick = (id) => {
    console.log(id);
    setSelectedChat(id);
    Navigate(`/chat/${id}`);
  };

  return (
    <>
      
      {obj.map((element, index) => (
        <div
          key={element.id}
          style={{
            width: '100%',
            height: '7%',
            backgroundColor: 
            
            selectedChat === element.id ? '#1976d2' : '#F0FFFF',           
           color: selectedChat === element.id ? 'white' : 'black',
            display: 'flex',
            // alignItems : 'center',
            justifyContent:'space-between',
            // position: 'relative',
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
