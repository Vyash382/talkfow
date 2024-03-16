import React from 'react'
import Header from './Header';
import Chatlist from './Chatlist';
import Myself from './Myself';

const AppLayout = () =>(WrappedComponent)=>{
    return(props) =>{
        return (
            <div>
            <Header />
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
                    width:'55vw',
                    color:'black',
                    backgroundColor:'white'
                    }}
                >
                    <WrappedComponent {...props} />
                </div>
                <div
                    style={{
                        height:'92vh',
                    width:'28vw',
                    color:'black',
                    backgroundColor:'#F0FFFF'
                    }}
                >
                    <Myself />
                </div>
            </div>
            <div>Footer</div>
            </div>
            
        );
    };
} ;

export default AppLayout;
