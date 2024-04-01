import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      const response = await fetch(`http://localhost:3000/user/getUsers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: searchTerm }),
        credentials: 'include'
      });

      const json = await response.json();
      setData(json.results);
    };

    handleSearch();
  }, [searchTerm]);

  const onClose = () => {
    const { ss } = props;
    ss(false);
  };

  const addFriend = async (id) => {
    const response = await fetch('http://localhost:3000/user/addFriend', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver: id }),
      credentials: 'include'
    });
    const json = await response.json();
    console.log(json);
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Find People</DialogTitle>
      <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          variant="outlined"
          label="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <div style={{ height: '50%', width: '100%', overflowY: 'auto' }}>
          {data &&
            data.map((e) => (
              <div key={e._id} style={{ display: 'flex', color: '#1976d2', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={e.avatar} alt="" style={{ height: '25%', width: '25%', borderRadius: '100%' }} />
                <h3>{e.name}</h3>
                <Button onClick={() => { addFriend(e._id) }} variant="contained" style={{ height: '25px', width: '100px' }} color="primary">Add</Button>
              </div>
            ))
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="secondary" style={{ marginRight: '10px' }}>Close</Button>
         
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
