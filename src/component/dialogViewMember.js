import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DeleteAlert from './dialogDeleteGroup';
import Typography from '@material-ui/core/Typography';

export default function DialogViewMember({
    dialogOpen,
    toggleClose,
    group,
    contact,
    reset
}){

  const [alertDel, setAlertDel]= useState(false);
  const [cidDel, setCidDel] = useState(0);
  const [editBool, setEditBool]= useState(true);

  const [bgColor, setBgColor] = useState('#00796b')
  const [editName, setEditName] = useState(''); 
  const [popDel, setPopDel] = useState(false);


  function PopClose(){
    setPopDel(false);
  }

  var noData = false

  if(contact.length > 0){
    noData = false
  }else{
    noData = true
  }

  var deleteAvailable = true;

  if(contact.length > 0){
    deleteAvailable = false;
  }

    var group_name = '';
    if(group.name){
        group_name = group.name.toUpperCase()
    }

    return (
        <div>
          <ToastContainer enableMultiContainer/>
          <Dialog
            open={dialogOpen}
            onClose={toggleClose}
            maxWidth="sm" 
            fullWidth="true"
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: bgColor, color: 'white'}}>
            
            
            {editBool?
              <Grid container direction='row' justify='space-between' alignItems='center' >
              <Grid item>
                {group_name}
              </Grid>
              <Grid>

                <IconButton onClick={()=>{
                  setEditBool(false)
                  setBgColor('white')
                }} >
                <EditIcon style={{width:'30px',height: '30px', color: 'white'}} />
                </IconButton>
                
                {deleteAvailable? 
                  <IconButton onClick={()=>{
                    setPopDel(true);
                  }}>
                  <DeleteIcon style={{width:'30px',height: '30px', color: 'white'}} />
                  </IconButton> 
                : null
                }
                

              </Grid>
            </Grid>
            :
            <Grid container direction='row' justify='space-between' alignItems='center' >
            <Grid item>
            <TextField
              id="outlined-bare"
              defaultValue={group_name}
              margin="normal"
              variant="outlined"
              onChange= {(event)=>{
                setEditName(event.target.value)
              }}
            />
            </Grid>
            <Grid item >
              <IconButton onClick={()=>{
                  setEditBool(true);
                  setBgColor('#42a5f5');
                  toggleClose();
                  var postData = {
                    name: editName
                  }
                  axios({
                    method: 'patch',
                    url: ` http://localhost:3001/api/updateName/${group.id}`,
                    json: true,
                    data: postData
                  }).then(function(response){
                    console.log(response);
                    reset();
                    setTimeout(()=>{
                      toast.success("Updated Group Name",{
                        position:toast.POSITION.TOP_RIGHT,
                        autoClose:3696
                      })
                    },200)
                    
                  })

                }} >
              <CheckIcon style={{width:'30px',height: '30px'}} />
              </IconButton>

              <IconButton onClick={()=>{
                  setEditBool(true);
                  setBgColor('#42a5f5');
                  
                }}>
              <CancelIcon style={{width:'30px',height: '30px'}} />
              </IconButton>
            </Grid>
          </Grid>
            
            }
            
              
            </DialogTitle>
            <DialogContent>
            <Grid item xs={12} md={12}>

                    {noData?
                    <Typography variant="h4" align="center">
                        No Members Found
                    </Typography>
                    :
                    contact.map(row =>(
                    <List dense={true} key ={row.id}>
                        <ListItem>
                            {/* <ListItemAvatar>
                                <Avatar>
                                <FolderIcon />
                                </Avatar>
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={`${row.last_name}, ${row.first_name}`}
                                secondary= {row.mobile_phone}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" 
                                onClick={()=>{
                                  setAlertDel(true)
                                  setCidDel(row.id);
                                }}
                                >
                                <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>))
                    }
                    
                </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={toggleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>



          <Dialog
            open={alertDel}
            onClose={()=>{setAlertDel(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#f44336', color: 'white'}}>{"Remove Member"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove this?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setAlertDel(false)}} color="primary">
                No
              </Button>
              <Button 
 
              onClick={()=>{
                setAlertDel(false)
                toggleClose()
                console.log(group.id, " - ", cidDel)

                axios({
                  method: 'delete',
                  url: `http://localhost:3001/api/removeMember?cid=${cidDel}&&gid=${group.id}`,
                }).then(function(response){
                  console.log(response);
                setTimeout(()=>{
                  toast.error("Removed Contact",{
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
          <DeleteAlert
            dialogOpen = {popDel}
            PopClose = {PopClose}
            toggleClose = {toggleClose}
            reset = {reset}
            gid = {group.id}
          />
        </div>
      );
}