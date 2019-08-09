import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


export default function DialogDelete({
    dialogOpen,
    toggleClose,
    user_id,
    reset,
}){
  
    const [groupName, setGroupName] = useState('');
    const [addToggle, setAddToggle] = useState(true);


    return (
        <div>
          <ToastContainer enableMultiContainer/>
          <Dialog
            open={dialogOpen}
            onClose={toggleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#42a5f5', color: 'white'}}>{"Create Group"}</DialogTitle>
            <DialogContent>
            <TextField
                id="outlined-search"
                label="Group Name"
                type="search"
                margin="normal"
                variant="outlined"
                onChange = {(event)=>{
                  setGroupName(event.target.value)

                  if(event.target.value === ''){
                    setAddToggle(true)
                  }else{
                    setAddToggle(false)
                  }
                  
            }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleClose} color="primary">
                Close
              </Button>
              <Button 
              disabled = {addToggle}
              onClick={()=>{
                  toggleClose()
                  console.log(user_id)
                  let postData = {
                    name: groupName,
                    user_id: user_id
                  }
                  
                  console.log(postData)
                  axios({
                    method: 'post',
                    url: ` http://localhost:3001/api/addGroup`,
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }, 
                    json: true,
                    data: postData
                  }).then(function(response){
                    console.log(response);
                    reset()
                  })

                  setTimeout(()=>{
                    toast.success("Successfully added",{
                      position:toast.POSITION.TOP_RIGHT,
                      autoClose:3696
                    })
                  },200)
                  

              }} color="primary" autoFocus>
                Add Group
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}