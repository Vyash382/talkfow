import React, { useEffect, useState } from 'react'
import GroupLayout from '../components/Layouts/GroupLayout'
import { Button, IconButton } from '@mui/material';
import { Delete, Edit, Remove } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import ChangeName from './ChangeName';
import AddMembers from './AddMembers';
const GroupItem = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [name,setName] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
    const [chngName,setChngName] = useState(false);
    const [adM,setAdM] = useState(false);
    const params = useParams();
    const uri = params.groupID;
      // },{
      //   "Member":{
      //     "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
      //     "name":"Yash Sinha"
      //   },
      //   "_id":"5"
      // },{
      useEffect(()=>{
        const funcc= async(uri)=>{
          // console.log(uri);
          const response = await fetch('http://localhost:3000/chat/GroupMembers', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:uri
            }),
            credentials: 'include'
          });
          // console.log(response);
          const json = await response.json();
          console.log(json);
          setUsers(json);
        };
        const funcc2 = async()=>{
          const response = await fetch('http://localhost:3000/chat/GroupName', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:uri
            }),
            credentials: 'include'
          });
          // console.log(response);
          const json = await response.json();
          setName(json.name);
        }
        const funcc3=async()=>{
          const response = await fetch('http://localhost:3000/chat/GroupAdmin', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:uri
            }),
            credentials: 'include'
          });
          const json = await response.json();
          setIsAdmin(json.arr);
          
        }
        funcc2(uri);
        funcc(uri);
        funcc3(uri);
      },[uri,chngName,adM]);
      const nameHandler = ()=>{
        setChngName(true);
      }
      const addHandler = ()=>{
        setAdM(true);
      }
      const LeaveHandler= async()=>{
        const response = await fetch('http://localhost:3000/chat/leave', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:uri
          }),
          credentials: 'include'
        });
        navigate('/group');
      };
      const kickHandler = async(idd)=>{
        const response = await fetch('http://localhost:3000/chat/kick', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:uri,
            member: idd
          }),
          credentials: 'include'
        });
        const json = await response.json();
        if(json.success) navigate('/group');
      }
      const deleteHandler = async()=>{
        const response = await fetch('http://localhost:3000/chat/deleteC', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:uri
          }),
          credentials: 'include'
        });
        navigate('/group');
      }
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',height:'95vh'}}>
        <h1>{name}</h1>
        

        <p>MEMBERS</p>
        <div style={{backgroundColor:'azure',overflowY:'auto',display:'flex',width:'40%',flexDirection:'column',height:'auto',alignItems:'center',gap:'5px',padding:'10px'}}>
        {
            users.map((e)=>(
                <div key={e._id} style={{width:'90%',height:'40px',backgroundColor:'#1976d2',color:'white',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                    <img src={e.Member.avatar} alt="Group Profile" style={{ width: '50px', height: '50px', borderRadius:'40px' }} />
                        <span style={{ color: 'white' }}>{e.Member.name}</span>
                        {e.Member.creator?<span>(Admin)</span>:<span></span>}
                    </div>
                    <div>
                      {isAdmin?
                        <IconButton onClick={()=>{kickHandler(e.Member.id)}}>
                            <Remove style={{color:'white'}}></Remove>
                        </IconButton>
                      :<></>}
                    </div>
                </div>
            ))
        }
        
        </div>
        <div style={{width:'60%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
       {isAdmin? <Button variant='contained' onClick={()=>{addHandler()}} >Add Member</Button>:<></> } 
       {adM && <AddMembers uri={uri} msg={setAdM} /> }
        {isAdmin? <Button variant='contained' onClick={()=>{nameHandler()}} >Change Name</Button>: <></> }  
        {chngName && <ChangeName uri={uri} onC = {setChngName} />}
        {isAdmin? <Button variant='contained' color='error'  onClick={()=>{deleteHandler()}} >Delete Group</Button>:<></> } 
        <Button variant='contained' color='error' onClick={()=>{LeaveHandler()}} >Leave Group</Button>
        </div>
        
    </div>
  )
}

export default GroupLayout(GroupItem);

