import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import DialogForm from './dialogForm';
import DialogEdit from './dialogEdit';
import DialogDelete from './dialogDelete';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflowX: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  table: {
    // minWidth: 650,
    // minHeight: 500, 
  },
  blue: {
    // background: 'rgb(9,9,121)',
    background: 'linear-gradient(90deg, rgba(9,9,121,1) 35%, rgba(115,168,179,1) 100%)'
  },
  appBar: { 
  }
}));

export default function AddressBook() {


  const token = localStorage.getItem('token');
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');
  if(!token){
    window.location.href='/#/';
  }
  

  var decoded = jwtDecode(token);
  const logged_userID = decoded.userId;
  const classes = useStyles();

  const [open, setOpen] =useState(false);
  const [stopper, setStopper] = useState(true);
  const [contactData, setContactData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData ] = useState([]);
  const [editCid, setEditCid] = useState(0);
  const [search, setSearch] = useState('');

  const [alertDelete, setAlertDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  /*
  REMINDER:
    search
    notification for signup
    redirect for signup
    Groups
  */
  const filteredData = contactData.filter((data)=>{
    let fname = data.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    let lname = data.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if(fname){
      return fname;
    }else{
      return lname;
    }
  });

 
  if(stopper){
    axios({
      method: 'get',
      url: ` http://localhost:3001/api/getContact?id=${logged_userID}`,
    }).then(function(response){
      // console.log(...response.data)
      setContactData([...response.data])
      setStopper(false);
    })
  }

  
  
  function resetStopper(){
    setStopper(true);
  }

  function handleClickOpen() {
    setOpen(true);
  }
  
  function handleClose() {
      setOpen(false);
  }

  function HandleOpenEdit() {
    setOpenEdit(true);
    
  }
  
  function HandleCloseEdit() {
    setOpenEdit(false);
  }

  function ToggleDelete(){
    setAlertDelete(false);
  }
  

  return (
    <React.Fragment>
    <AppBar position="static" style={{
        backgroundColor: '#a43cbd'
        // background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
    }}>
        <Toolbar>
          <Icon className={classes.menuButton}  color="disabled" fontSize="large">
              library_books
          </Icon>
          <Typography variant="h6" className={classes.title} style={{letterSpacing: '5px'}}>
            ADDRESS BOOK
          </Typography>
          <IconButton className={classes.button} onClick={()=>{
            localStorage.clear();
            window.location.href= "/#/";
            
          }}
            style={{color:'white'}}
          >
              LOGOUT
          </IconButton>
        </Toolbar>
    </AppBar>
    
    <Grid container  style={{padding: '50px'}}>
        <Grid item xs={12} md={12}>
          <h2>Welcome {lastname.toLocaleUpperCase()}, {firstname.toLocaleUpperCase()}!</h2>
        {/* <Paper className={classes.root} style={{padding: '10px'}}>
          <Typography style={{padding: '10px', letterSpacing: '5px'}}>
            GROUPS
          </Typography>
          <Divider/>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                <ListItemAvatar>
                    <Avatar style={{background: '#833ab4'}}>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Sample Group 1" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar style={{background: '#833ab4'}}>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Sample Group 2" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
        </Paper> */}
        </Grid>
        <Grid item xs={12} md={12}>
        <Paper className={classes.root}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{float: 'left', marginLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>
              <SearchIcon style={{marginTop: '21px', marginRight: '7px', color: 'gray'}} />
              <TextField
                id="standard-search"
                label="Search field"
                type="search"
                onChange={(event)=>{
                  setSearch(event.target.value);
                }}
                />
            </span> 
            <span style={{float: 'left', marginRight: '25px', marginTop: '20px', marginBottom: '10px'}}>
                <Fab size="medium" style={{backgroundColor: '#42a5f5'}} aria-label="add" onClick={()=>{handleClickOpen()}} >
                    <AddIcon style={{float: 'right', color: 'white'}} />
                </Fab>
            </span>
          </div>
          <Table className={classes.table}>
            <TableHead> 
              <TableRow>
                <TableCell>FIRST NAME</TableCell>
                <TableCell align="right">LAST NAME</TableCell>
                <TableCell align="right">MOBILE NUMBER</TableCell>
                <TableCell align="right">ACTION </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.mobile_phone}</TableCell>
                  <TableCell align="right">
                      {/* <Fab size="small" style={{backgroundColor: '#42a5f5', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}>
                        <ViewIcon />
                      </Fab> */}
                      <Fab size="small" style={{backgroundColor: '#cddc39', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}  onClick={()=>{
                        HandleOpenEdit()
                        setEditData(row);
                        setEditCid(row.id)
                        // console.log(row.id);
                        }}>
                      <EditIcon />
                      </Fab>
                      <Fab size="small" style={{backgroundColor: '#f44336', color: 'white'}} aria-label="add" className={classes.margin} onClick={()=>{
                        setAlertDelete(true);
                        setDeleteId(row.id);
                        // axios({
                        //   method: 'delete',
                        //   url: `  http://localhost:3001/api/delete?cid=${row.id}`,
                        // }).then(function(response){
                          
                        // // console.log(response.data.token)
                        // })
                        // resetStopper()
                      }} >
                        <DeleteIcon />
                      </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </Grid>
    </Grid>
    <DialogForm
      handleClose = {handleClose}
      handleClickOpen = {handleClickOpen}
      openDialog = {open}
      userID = {logged_userID}
      reset = {resetStopper}
    />

    <DialogEdit 
      closeEdit = {HandleCloseEdit}
      dialogOpen = {openEdit}
      editData = {editData}
      cid = {editCid}
      reset = {resetStopper}
    />

    <DialogDelete
      dialogOpen = {alertDelete}
      toggleClose = {ToggleDelete}
      reset = {resetStopper}
      deleteId = {deleteId}
    />

    </React.Fragment>
  );
}