import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function DialogForm({
    closeEdit,
    dialogOpen,
    editData,
    cid,
    reset
}){

    var postData = {
        first_name: editData.first_name,
        last_name: editData.last_name,
        home_phone: editData.home_phone,
        mobile_phone: editData.mobile_phone,
        work_phone: editData.work_phone,
        email: editData.email,
        city: editData.city,
        state_or_province: editData.state_or_province,
        postal_code: editData.postal_code,
        country: editData.country
    }
 
    return (
    <React.Fragment>
      <ToastContainer enableMultiContainer/>
    <Dialog open={dialogOpen} onClose={closeEdit} maxWidth="sm" fullWidth="true" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{backgroundColor: '#6d4c41', color: 'white'}}>View or Edit Details</DialogTitle>

      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Firstname"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.first_name}
        onChange = {(event)=>{
            postData.first_name = event.target.value;
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Lastname"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.last_name}
        onChange = {(event)=>{
            postData.last_name = event.target.value;
        }}
        />

      </DialogContent>

      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Home Phone"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.home_phone}
        onChange = {(event)=>{
            postData.home_phone = event.target.value;
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Mobile Phone"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.mobile_phone}
        onChange = {(event)=>{
            postData.mobile_phone = event.target.value;
        }}
        />

      </DialogContent>
      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <TextField
        style={{width:"100%"}}
        id="outlined-search"
        label="Work Phone"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.work_phone}
        onChange = {(event)=>{
            postData.work_phone = event.target.value;
        }}
        />
      </DialogContent>

      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        
        <TextField
        style={{width:"100%"}}
        id="outlined-search"
        label="Email"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.email}
        onChange = {(event)=>{
            postData.email = event.target.value;
        }}
        />

      </DialogContent>

      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="City"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.city}
        onChange = {(event)=>{
        postData.city = event.target.value;
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="State or Province"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.state_or_province}
        onChange = {(event)=>{
            postData.state_or_province = event.target.value;
        }}
        />

      </DialogContent>

      <DialogContent style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Postal Code"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.postal_code}
        onChange = {(event)=>{
            postData.postal_code = event.target.value;
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Country"
        type="search"
        margin="normal"
        variant="outlined"
        defaultValue={editData.country}
        onChange = {(event)=>{
            postData.country = event.target.value;
        }}
        />

      </DialogContent>
      <DialogActions style={{margin: "auto"}}>
        <Button onClick={closeEdit} color="primary">
          Close
        </Button>
        <Button onClick={()=>{
            console.log(postData);
            console.log(cid)
            closeEdit();

            axios({
                method: 'patch',
                url: ` http://localhost:3001/api/update?cid=${cid}`,
                json: true,
                data: postData
            }).then(function(response){
            // console.log(response.data.token)
            

              setTimeout(()=>{
                toast.success("Successfully Updated",{
                  position:toast.POSITION.TOP_RIGHT,
                  autoClose:3696
                })
              },200)
            })
            reset()
            //action
        }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
    )
}