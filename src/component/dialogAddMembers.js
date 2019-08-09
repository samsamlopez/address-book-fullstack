import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
}));
export default function DialogDelete({
    dialogOpen,
    toggleClose,
    contact,
    group
}){
  const classes = useStyles();
  var contactId = [];
  var group_name = '';
  if(group.name){
    group_name = group.name.toUpperCase();
  }
  
  
    return (
      <React.Fragment>
      <ToastContainer enableMultiContainer/>
      <Dialog open={dialogOpen} onClose={toggleClose} maxWidth="xs" fullWidth="true" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{backgroundColor: '#cddc39', color: 'black'}}>Add Contacts to  {group_name} </DialogTitle>
        <DialogContent >
        
        <Paper className={classes.root}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contact.map(row => (
                <TableRow key={row.id} hover={true} >
                  
                    <TableCell component="th" scope="row" >
                    
                    <FormControlLabel style={{marginLeft: '20px',  width: '80%'}}
                      control={
                        <Checkbox
                          color="primary"
                          onClick = {()=>{
                            if(contactId.indexOf(row.id) !== -1 ){
                              contactId.splice(contactId.indexOf(row.id),1);
                            }else{
                              contactId.push(row.id);
                            }
                            
                          }}
                        />
                      }
                      label={`${row.last_name.toUpperCase()}, ${row.first_name.toUpperCase()}`}
                      
                    />
                      
                    </TableCell>

                </TableRow>
               
              ))}
            </TableBody>
          </Table>
        </Paper>
  
        </DialogContent>
  
  
        <DialogActions style={{margin: "auto"}}>
          <Button onClick={toggleClose} color="primary">
            Close
          </Button>
          <Button onClick={()=>{
              var postData = {
                contact: contactId
              }

              toggleClose();
              // console.log(postData);

              axios({
                method: 'post',
                url: ` http://localhost:3001/api/addMember?group_id=${group.id}`,
                json: true,
                data: postData
              }).then(function(response){
                console.log(response);

                setTimeout(()=>{
                  toast.success("Assigned contact to group",{
                    position:toast.POSITION.TOP_RIGHT,
                    autoClose:3696
                  })
                },200)
                
              })
              
          }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
      );
}