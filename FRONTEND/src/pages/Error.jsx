import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Error = (props) => {
    const Navigate = useNavigate();
    const {message,setDialog,redirect} = props;
    const onClose= ()=>{
        Navigate(redirect);
        setDialog(false);
    }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ALERT</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Error;
