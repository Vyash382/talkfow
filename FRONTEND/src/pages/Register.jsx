import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Error from './Error.jsx'
const Register = () => {
  const [formData, setFormData] = useState({
    named: '',
    email: '',
    password: '',
  });
  const [dialog,setDialog] = useState(false);
    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);                                                             
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { named, email, password } = formData; 
    const formData2 = new FormData();
    formData2.append('named', named);
    formData2.append('email', email);
    formData2.append('password', password);
    formData2.append('avatar', selectedPhoto);
    const response = await fetch(`https://talkfow-backend-3.onrender.com/user/signup`,{
          method: "POST",
            
            body: formData2
          } );  
        const json = await response.json();
        if(json.status){
          setMessage("User registered successfully");
          setRedirect('./');
          setDialog(true);
        }
        else{
          setMessage(json.content);
          setRedirect('./');
          setDialog(true);
        }
        setFormData({named: '',
        email: '',
        password: ''});
        setSelectedPhoto(null);
  };
  

  return (
    <>
      <div style={{ height: '100%', width: '100%', position: 'fixed', zIndex: '-1' }}>
        <img
          src="https://media.istockphoto.com/photos/register-online-picture-id869283118?k=6&m=869283118&s=612x612&w=0&h=CSMDQten6MWctMIMEoPuN_s0MbAV_rLPvwuHMJlSKgY="
          style={{ height: '100%', width: '100%' }}
          alt=""
        />
      </div>
      <div
        style={{
          height: '85vh',
          width: '40vw',
          minWidth: '300px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:'20px'
        }}
      >
                  <h1 style={{ color: 'white' }}>Make Account</h1>

        <label htmlFor="photoInput" style={{ cursor: 'pointer', marginBottom: '20px' }}>
          {selectedPhoto ? (
            <img
              src={URL.createObjectURL(selectedPhoto)}
              alt="Selected"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <span style={{ color: 'white', fontSize: '24px' }}>+</span>
            </div>
          )}
          <label htmlFor="photoInput" style={{color:'white',marginTop:'5px'}}>Profile Picture</label>
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </label>
        
        <form onSubmit={handleSubmit} style={{ color: 'white', maxWidth: '400px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.named}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  named: e.target.value,
                }));
              }}
              style={{
                color: 'white',
                backgroundColor:'black',
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid white',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                color: 'white',
                backgroundColor:'black',
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid white',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                color: 'white',
                backgroundColor:'black',
                width: '100%',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                border: '1px solid white',
              }}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '12px',
                width: '100%',
                borderRadius: '5px',
                border: 'none',
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <p style={{color:'white'}}>Already Having Account?</p>
        <div style={{height:'5%',width:'35%',backgroundColor:'blue',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>        <Link to='/login' style={{color:'white',textDecoration:'none'}}>  Login With Your Account  </Link>
</div>
        
      </div>
      {dialog && <Error message={message} redirect={redirect}  setDialog={setDialog} />}
    </>
  );
};

export default Register;