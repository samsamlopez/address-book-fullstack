import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


export default function DialogDelete({
    dialogOpen,
    toggleClose,
}){
  


    return (
        <div>
          <Dialog
            open={dialogOpen}
            onClose={toggleClose}
            maxWidth="sm" 
            fullWidth="true"
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#42a5f5', color: 'white'}}>Group List</DialogTitle>
            <DialogContent>
            <TextField
                id="outlined-search"
                label="Group Name"
                type="search"
                margin="normal"
                variant="outlined"
                onChange = {(event)=>{
                 
                  
            }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleClose} color="primary">
                Close
              </Button>
              <Button 
              
              onClick={()=>{
                  toggleClose()
              }} color="primary" autoFocus>
                Add Group
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}