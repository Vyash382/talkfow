import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';
const SearchItem = (props) => {
  const[clic,setClic] = useState(0);
  const {e} = props;
  const [vari,setVari] = useState('ADD FRIEND');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://talkfow-backend-3.onrender.com/user/requeststatus', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ receiver: e._id }), 
          credentials: 'include'
        });
        const json = await response.json();
        if(json.content == 'pending'){
            setVari('Unsend');
        }
        else if(json.content == 'accepted'){
            setVari('Unfriend')
        }
        else{
            setVari('Add');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  
  }, [clic]);
  const addFriend = async (id) => {
    if(vari=='Add'){
      const response = await fetch('https://talkfow-backend-3.onrender.com/user/addFriend', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver: id }),
      credentials: 'include'
    });
    const json = await response.json();
    setClic(clic+1);
    return;
    };
    if(vari=='Unsend' || vari=='Unfriend'){
      const response = await fetch('https://talkfow-backend-3.onrender.com/user/unsend', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver: id }),
      credentials: 'include'
    });
    const json = await response.json();
    setClic(clic+1);
    }
  }

  return (
    <>
      <img src={e.avatar} alt="" style={{ height: '25%', width: '25%', borderRadius: '50%' }} />
                <h3>{e.name}</h3>
                
                <Button onClick={() => { addFriend(e._id) }} variant="contained" style={{ height: '25px', width: '100px' }} color="primary">{vari}</Button>
    </>
  )
}

export default SearchItem
