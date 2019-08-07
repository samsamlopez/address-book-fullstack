import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




export default function DialogDelete({
    dialogOpen,
    toggleClose,
}){
  const classes = useStyles();



  
    return (
      <React.Fragment>
      <Dialog open={dialogOpen} onClose={toggleClose} maxWidth="xs" fullWidth="true" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{backgroundColor: '#cddc39', color: 'black'}}>Add Contact to Probinsyana</DialogTitle>
  
        <DialogContent >
        
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name} hover={true} >
                  
                    <TableCell component="th" scope="row" >
                    
                    <FormControlLabel style={{marginLeft: '20px',  width: '80%'}}
                      control={
                        <Checkbox

                          color="primary"
                        />
                      }
                      label={row.name}
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

              toggleClose();
  
              
          }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
      );
}