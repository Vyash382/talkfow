// NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';
const Notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
      <div style={{height:'5%',width:'35%',backgroundColor:'blue',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>        <Link to='/' style={{color:'white',textDecoration:'none'}}>  Continue Using Talkfow  </Link>
</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#222', // Dark background color
    color: '#fff', // Text color
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.5rem',
  },
};

export default Notfound;
