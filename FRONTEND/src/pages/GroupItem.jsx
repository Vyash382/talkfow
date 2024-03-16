import React from 'react'
import GroupLayout from '../components/Layouts/GroupLayout'
import { Button, IconButton } from '@mui/material';
import { Delete, Edit, Remove } from '@mui/icons-material';
const GroupItem = () => {
    const users = [{
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":"Yash Sinha"
        },
        "_id":"6"
      },{
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":"Yash Sinha"
        },
        "_id":"5"
      },{
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":"Yash Sinha"
        },
        "_id":"4"
      },
      {
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":"Yash Sinha"
        },
        "_id":"3"
      },{
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":"Yash Sinha"
        },
        "_id":"2"
      },{
        "Member":{
          "avatar":"https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?rs=1&pid=ImgDetMain",
          "name":" Yash Sinha "
        },
        "_id":"1"
      }];
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',height:'95vh'}}>
        <img src="https://th.bing.com/th/id/OIP.y8tWWY6Vh7BX50XtbsIcnwHaFe?rs=1&pid=ImgDetMain" style={{height:'20%',width:'20%',borderRadius:'70%', filter: 'brightness(0.5)'}} alt="" />  
        <IconButton style={{position:'absolute',top:'15%'}} color='white'>
            <Edit style={{color:'white'}}></Edit>
        </IconButton>
        <h1>Group 1</h1>
        <IconButton style={{position:'absolute',top:'25%',left:'56%'}}>
            <Edit></Edit>
        </IconButton>

        <p>MEMBERS</p>
        <div style={{backgroundColor:'azure',overflowY:'auto',display:'flex',width:'40%',flexDirection:'column',height:'60%',alignItems:'center',gap:'5px',padding:'10px'}}>
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
        <Button variant='contained' color='error' >Delete Group</Button>
        </div>
        
    </div>
  )
}

export default GroupLayout(GroupItem);

