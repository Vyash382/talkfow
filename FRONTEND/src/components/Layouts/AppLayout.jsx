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
                    backgroundColor:'black',
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
                    backgroundColor:'#2f2f2f',
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
                    color:'white',
                    backgroundColor:'#4f5c57'
                    }}
                >
                    <WrappedComponent {...props} />
                </div>
                <div
                    style={{
                        height:'92vh',
                    width:'28vw',
                    color:'white',
                    backgroundColor:'#2f2f2f'
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
