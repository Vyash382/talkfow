import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';
import SearchItem from './SearchItem';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      const response = await fetch(`https://talkfow-backend-3.onrender.com/user/getUsers`, {
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
          {/* {data &&
            data.map((e) => (
              <div key={e._id} style={{ display: 'flex', color: '#1976d2', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchItem e={e} ></SearchItem>
                
              </div>
            ))
          } */}
          {(!data)?'No Data Found':data.map((e) => (
              <div key={e._id} style={{ display: 'flex', color: '#1976d2', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchItem e={e} ></SearchItem>
                
              </div>
            ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="secondary" style={{ marginRight: '10px' }}>Close</Button>
         
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
