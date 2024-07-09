import React, { useEffect, useState } from 'react'
import GroupLayout from '../components/Layouts/GroupLayout'
import { Button, IconButton } from '@mui/material';
import { Delete, Edit, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
const GroupItem = () => {
    const [users, setUsers] = useState([]);
    const [name,setName] = useState('');
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
        funcc2(uri);
        funcc(uri);
      },[uri]);
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',height:'95vh'}}>
        <h1>{name}</h1>
        

        <p>MEMBERS</p>
        <div style={{backgroundColor:'azure',overflowY:'auto',display:'flex',width:'40%',flexDirection:'column',height:'auto',alignItems:'center',gap:'5px',padding:'10px'}}>
        {
            users.map((e)=>(
                <div key={e._id} style={{width:'90%',height:'15%',backgroundColor:'#1976d2',color:'white',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                    <img src={e.Member.avatar} alt="Group Profile" style={{ width: '50px', height: '50px', borderRadius:'40px' }} />
                        <span style={{ color: 'white' }}>{e.Member.name}</span>
                    </div>
                    <div>
                        <IconButton>
                            <Remove style={{color:'white'}}></Remove>
                        </IconButton>
                    </div>
                </div>
            ))
        }
        
        </div>
        <div style={{width:'40%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
        <Button variant='contained' >Add Member</Button>
        <Button variant='contained' >Change Name</Button>
        <Button variant='contained' color='error' >Delete Group</Button>
        </div>
        
    </div>
  )
}

export default GroupLayout(GroupItem);

