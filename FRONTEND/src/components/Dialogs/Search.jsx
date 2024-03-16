import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  const onClose = () => {
    const { ss: setIsSearch } = props;
    setIsSearch(false);
  };

  return (
    <Dialog open={true} onClose={onClose}>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="secondary" style={{ marginRight: '10px' }}>Close</Button>
          <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
