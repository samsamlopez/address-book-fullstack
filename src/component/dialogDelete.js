import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function DialogDelete({
    dialogOpen,
    toggleClose,
    reset,
    deleteId
}){


    return (
        <div>
          <ToastContainer enableMultiContainer/>
          <Dialog
            open={dialogOpen}
            onClose={toggleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#f44336', color: 'white'}}>{"DELETE CONTACT"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={()=>{
                  toggleClose()
                  axios({
                      method: 'delete',
                      url: `  http://localhost:3001/api/delete?cid=${deleteId}`,
                    }).then(function(response){
                      
                      setTimeout(()=>{
                        toast.error(`Deleted`,{
                          position:toast.POSITION.TOP_RIGHT,
                          autoClose:3696
                        })
                      },200)
                      
 
                      
                    // console.log(response.data.token)
                    })
                    reset();
              }} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}