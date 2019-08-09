import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default function DialogDelete({
    dialogOpen,
    PopClose,
    toggleClose,
    reset,
    gid
}){
  


    return (
        <div>
          <ToastContainer enableMultiContainer/>
          <Dialog
            open={dialogOpen}
            onClose={PopClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#f44336', color: 'white'}}>{"Delete Group"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={PopClose} color="primary">
                No
              </Button>
              <Button 
 
              onClick={()=>{
                  PopClose()
                  toggleClose()
                  

                  axios({
                    method: 'delete',
                    url: ` http://localhost:3001/api/deleteGroup?gid=${gid}`,
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }, 
                  }).then(function(response){
                    reset()
                    setTimeout(()=>{
                      toast.error("Deleted Group",{
                        position:toast.POSITION.TOP_RIGHT,
                        autoClose:3696
                      })
                    },200)
                  })


                  
                  
              }} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}