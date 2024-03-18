import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, FormControl } from '@mui/material';
import Error from './Error.jsx' 
const Login= (props) => {
    const {user,setUser} = props;
    const [dialog,setDialog] = useState(false);
    const [message,setMessage] = useState('');
    const [redirect,setRedirect] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async(e) => {
        const {email,password} = formData;
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/user/login`,{
          method: "POST",
            headers:{
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({email,password})
          } );  
        const json = await response.json();
        if(json.status){
          setUser(true);
        }
        else{
          setMessage(json.content);
          setRedirect('./');
          setDialog(true);
        }
      };
      
  return (
    
    <>
    <div style={{height:'100%',width:'100%',position:'fixed',zIndex:'-1'}}>
        <img src="https://www.wallpapertip.com/wmimgs/82-825704_cool-backgrounds-for-twitch.jpg" style={{objectFit:'cover'}} alt="" />
    </div>
    <div 
    style={{
        height: '75vh',
        width: '40vw',
        minWidth: '300px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'20px'
      }}
    >
        <h1 style={{color:'white'}}>Please Login</h1>
        <form onSubmit={handleSubmit} style={{ color: 'white', maxWidth: '400px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ color: 'white',
          backgroundColor:'black', width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid white' }}
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
          style={{ color: 'white',
          backgroundColor:'black', width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid white' }}
          required
        />
      </div>
      <div>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '12px', width: '100%', borderRadius: '5px', border: 'none' }}>
          Submit
        </button>
       
      </div>
      
    </form>
    <p style={{color:'white'}}>Not Having Account?</p>
        <div style={{height:'5%',width:'35%',backgroundColor:'blue',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>        <Link to='/register' style={{color:'white',textDecoration:'none'}}>  Create Your Account  </Link>
</div>
    </div>
      
    {dialog && <Error message={message} redirect={redirect}  setDialog={setDialog} />}
    </>
  );
};

export default Login;
