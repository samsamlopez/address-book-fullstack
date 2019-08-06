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
    user_id,
}){
  
    const [groupName, setGroupName] = useState('');
    const [addToggle, setAddToggle] = useState(true);


    return (
        <div>
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
                    json: true,
                    data: postData
                  }).then(function(response){
                    console.log(response);
                  })

              }} color="primary" autoFocus>
                Add Group
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}