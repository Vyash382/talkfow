import React, { useState } from 'react'
import Header from './Header';
import Chatlist from './Chatlist';
import { getSocket } from '../../socket';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AppLayout = () =>(WrappedComponent)=>{
    
     
    return(props) =>{
        
        const { user } = useSelector((state) => state.auth);
        const socket = getSocket();
        console.log(socket.id);
        return (
            <div>
            <Header  />
            <div 
                style={{
                    height:'92vh',
                    width:'99vw',
                    color:'white',
                    backgroundColor:'white',
                    display:'flex',
                    justifyContent:'space-between',
                    position:"absolute",
                    zIndex:"0"
                }}
            >
                <div 
                    style={{
                        height:'92vh',
                    width:'17vw',
                    color:'white',
                    backgroundColor:'white',
                    overflowY: 'scroll',
                    display:'flex',
                    flexDirection:'column',
                    gap:'2px'
                    }}
                >
                 <Chatlist />
                </div>
                <div
                    style={{
                        height:'92vh',
                    width:'83vw',
                    color:'black',
                    backgroundColor:'white'
                    }}
                >
                    <WrappedComponent {...props}  user={user} />
                </div>
                
            </div>
            <div>Footer</div>
            </div>
            
        );
    };
} ;

export default AppLayout;