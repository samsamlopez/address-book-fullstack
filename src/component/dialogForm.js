import React,{useState} from 'react';
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
    handleClose,
    handleClickOpen,
    openDialog,
    userID,
    reset
}){
    // console.log(openDialog)
    // console.log(userID);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');

  const postData = {
    first_name: firstname,
    last_name: lastname,
    home_phone: homePhone,
    mobile_phone: mobilePhone,
    work_phone: workPhone,
    email: email,
    city: city,
    state_or_province: stateProvince,
    postal_code: postal,
    country: country
  };

    return (
    <React.Fragment>
      <ToastContainer enableMultiContainer/>
    <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth="true" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{backgroundColor: '#42a5f5', color:'white'}}>ADD CONTACT</DialogTitle>

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
        onChange={(event)=>{
            setFirstname(event.target.value)
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Lastname"
        type="search"
        margin="normal"
        variant="outlined"
        onChange={(event)=>{
            setLastname(event.target.value)
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
        onChange={(event)=>{
            setHomePhone(event.target.value)
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Mobile Phone"
        type="search"
        margin="normal"
        variant="outlined"
        onChange={(event)=>{
            setMobilePhone(event.target.value)
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
        onChange={(event)=>{
            setWorkPhone(event.target.value)
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
        onChange={(event)=>{
            setEmail(event.target.value)
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
        onChange={(event)=>{
            setCity(event.target.value)
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="State or Province"
        type="search"
        margin="normal"
        variant="outlined"
        onChange={(event)=>{
            setStateProvince(event.target.value)
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
        onChange={(event)=>{
            setPostal(event.target.value)
        }}
        />
        <TextField
        style={{width:"48%"}}
        id="outlined-search"
        label="Country"
        type="search"
        margin="normal"
        variant="outlined"
        onChange={(event)=>{
            setCountry(event.target.value);
        }}
        />

      </DialogContent>
      <DialogActions style={{margin: "auto"}}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{
            console.log(userID);
            console.log(postData);
            handleClose();

            axios({
              method: 'post',
              url: `http://localhost:3001/api/addContact/${userID}`,
              json: true,
              data: postData
            }).then(function(response){
              // console.log(response.data.token)
              setTimeout(()=>{
                toast.success("Successfully added",{
                  position:toast.POSITION.TOP_RIGHT,
                  autoClose:3696
                })
              },200)
              
            })
            reset()
        }} color="primary">
          ADD
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
    )
}