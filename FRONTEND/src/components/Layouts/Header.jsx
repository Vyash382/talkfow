import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Notifications as NotificationsIcon, Group as GroupIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Search from '../Dialogs/Search';
import Notifications from '../Dialogs/Notifications';
import AddGroup from '../Dialogs/AddGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Profile from './Profile';
const Header = () => {
    
    const [isSearch, setIsSearch] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [profile,setProfile] = useState(false);
    const navigate = useNavigate();
    const getP =()=>{
        if(profile) {
            return "block";
        }
        else {
            return "none";
        }
    }

    const handleOnAdd = () => {
        setIsNewGroup(!isNewGroup);
    };

    const handleLogout = () => {
        if(profile){
            setProfile(false);
        }
        else{
            setProfile(true);
        }
    };

    const handleOnGroup = () => {
        navigate('/group');
    };

    const handleOnNotification = () => {
        setIsNotification(!isNotification);
    };

    const handleOnSearch = () => {
        setIsSearch(!isSearch);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        TALKFOW
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <IconButton color="inherit" onClick={handleOnSearch}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleOnAdd}>
                            <AddIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleOnNotification}>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleOnGroup}>
                            <GroupIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogout}>
                        <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {isSearch && <Search ss={setIsSearch} />}
            <Notifications msg={isNotification} msg2={setIsNotification} />
             <AddGroup msg={isNewGroup} msg2={setIsNewGroup} />
             <Profile msg={profile}  />
        </>
    );
};

export default Header;