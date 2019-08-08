import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DialogDelete({
    dialogOpen,
    toggleClose,
    group,
    contact
}){

  const [alertDel, setAlertDel]= useState(false);
  const [cidDel, setCidDel] = useState(0);

  

    var group_name = '';
    if(group.name){
        group_name = group.name.toUpperCase()
    }

    return (
        <div>
          <Dialog
            open={dialogOpen}
            onClose={toggleClose}
            maxWidth="sm" 
            fullWidth="true"
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#42a5f5', color: 'white'}}>{group_name}</DialogTitle>
            <DialogContent>
            <Grid item xs={12} md={12}>

                    {contact.map(row =>(
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
                })


              }} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      );
}