import React, { useState, useEffect } from 'react';

const Myself = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/getUserDetails`, {
          method: "GET",
          credentials: 'include'
        });
        const json = await response.json();
        console.log(json);
        setUserData(json);
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []); 

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <h1 style={{color:"#1976d2", margin: '0'}}>Your Id</h1>
      <img src={userData.avatar} style={{height: '50%', width: '90%', borderRadius: '500px', objectFit: 'cover'}} alt="" /> 
      <h2 style={{color:"#1976d2", margin: '0'}}>{userData.name}</h2>
      <h2 style={{color:"#1976d2", margin: '0'}}>{userData.username}</h2>
    </>
  );
}

export default Myself;
