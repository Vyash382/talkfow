import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Search from '../Dialogs/Search';
import Notifications from '../Dialogs/Notifications';
import AddGroup from '../Dialogs/AddGroup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    const [isMobile,setIsMobile]= useState(false);
    const [isSearch,setIsSearch]= useState(false);
    const [isNewGroup,setIsNewGroup]= useState(false);
    const [isNotification,setIsNotification]= useState(false);
    const Navigate = useNavigate();
    const HandleMobile = ()=>{
        setIsMobile(!isMobile);
    }
    const handleOnAdd=()=>{
        setIsNewGroup(!isNewGroup);

        console.log("Adding");
    }
    const handleLogout=()=>{
        console.log("Logging Out");
    }
    const handleOnGroup=()=>{
        console.log("Showing Groups");
        Navigate('/group');
    }
    const handleOnNotification=()=>{
        setIsNotification(!isNotification);
        console.log("Showing Notification");
    }
    const handleOnSearch=()=>{
        setIsSearch(!isSearch);
        console.log("Searching");
        
    }
    

  return (
    <>
    <div
        style={{
            height:'8vh',
            width:'99vw',
            backgroundColor:'#35443e',
            color:'white',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between'
        }}
    >
        <div style={{fontSize:'2em'}}> 
            {/* <img src="https://i.pinimg.com/736x/00/f8/6b/00f86b1463e599e15d0cc3d870505a2e.jpg" style={{height:'29px',marginRight:'5px'}} alt="" /> */}
            TALKFOW
        </div>
        <div
            style={{
                display:'flex',
                alignItems:'center',
                gap:'20px'

                
            }}
        >
        
        <i style={{cursor:'pointer'}} className="material-icons" onClick={handleOnSearch}>search</i>
        <i style={{cursor:'pointer'}} className="material-icons" onClick={handleOnAdd}>add</i>
        <i style={{cursor:'pointer'}} class="material-icons" onClick={handleOnNotification}>notifications</i>
        <i style={{cursor:'pointer'}} class="material-icons" onClick={handleOnGroup}>group</i>
        <i style={{cursor:'pointer'}} class="material-icons" onClick={handleLogout}>exit_to_app</i>

        </div>
        
        
    </div>
    {
        isSearch && (
            <Search ss={setIsSearch} />
        )
    }
    {
        isNotification && (
            <Notifications />
        )
    }
    {
        isNewGroup && (
            <AddGroup />
        )
    }
    </>
  )
}

export default Header
