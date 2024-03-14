import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const scrollbarStyle = `
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #2f2f2f;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4f5c57;
  }
`;

const Chatlist = () => {
  const Navigate = useNavigate();
  const defaultProfilePicture =
    'https://th.bing.com/th/id/OIP.47he9BjOXlu02-_mF3NhmwHaHa?rs=1&pid=ImgDetMain';
  const obj = Array.from({ length: 30 }, (_, index) => ({
    id: (index + 4).toString(),
    'Profile Picture': defaultProfilePicture,
    name: `User ${index + 2}`,
    last_mesg: 'Random message',
  }));

  const [selectedChat, setSelectedChat] = useState(null);

  const handleClick = (id) => {
    console.log(id);
    setSelectedChat(id);
    Navigate(`/chat/${id}`);
  };

  return (
    <>
      <style>{scrollbarStyle}</style>
      {obj.map((element, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '7%',
            backgroundColor: selectedChat === element.id ? 'grey' : 'black',
            color: 'white',
            display: 'flex',
            position: 'relative',
            transition: 'background-color 0.3s',
          }}
          onClick={() => handleClick(element.id)}
        >
          <img
            style={{ borderRadius: '40px' }}
            src={element['Profile Picture']}
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
