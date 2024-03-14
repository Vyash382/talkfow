import React, { useState } from 'react';

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
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Set a semi-transparent white background
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: '999'
        // Apply a blur effect to the background
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3>Find People</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
      />
      <button onClick={handleSearch} style={{ marginTop: '10px' }}>
        Search
      </button>
    </div>
  );
};

export default Search;
