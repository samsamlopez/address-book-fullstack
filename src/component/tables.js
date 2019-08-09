import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import SoloIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';
import AddtoGroup from '@material-ui/icons/GroupAdd';
import GroupAddIcon from '@material-ui/icons/LibraryAdd';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import UpDownIcon from '@material-ui/icons/ImportExport'

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DialogForm from './dialogForm';
import DialogEdit from './dialogEdit';
import DialogDelete from './dialogDelete';
import DialogAddGroup from './dialogAddGroup';
import DialogViewMember from './dialogViewMember';
import DialogAddMember from './dialogAddMembers';
import DialogDeleteGroup from './dialogDeleteGroup';
import NoDataFound from '../images/no_data_found.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

  if(token === "" || token === null){
    window.location.href='/';
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

  const [groupToggle, setGroupToggle] = useState(true);
  const [gridSize, setGridSize] = useState(8);
  const [dialogGroup, setDialogGroup] = useState(false);


  const [stopperG, setStopperG] = useState(true);
  const [groupData, setGroupData] = useState([]);
  const [searchGroup, setSearchGroup]= useState('');
  

  const [dialogView,setDialogView] = useState(false);
  const [dialogAdd,setDialogAdd] = useState(false);
  const [dialogDelete,setDialogDelete] = useState(false); 
  const [groupMemberData, setGroupMemberData] = useState([])
  const [selectedGroup,setSelectedGroup] = useState([]);
  const [viewMember,setViewMember] = useState([]);
  const [noContact, setContact] = useState(true)
  const [noGroup, setGroup] = useState(true)

  const [ordered,setOrdered] = useState('ASC');

  const filteredData = contactData.filter((data)=>{
    let fname = data.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    let lname = data.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if(fname){
      return fname;
    }else{
      return lname;
    }
  });
  const filteredGroups = groupData.filter((data)=>{
    return data.name.toLowerCase().indexOf(searchGroup.toLowerCase()) !== -1;
    
    
  });
  

  if(stopper){
    axios({
      method: 'get',
      url: ` http://localhost:3001/api/getContact?id=${logged_userID}&&sort=${ordered}`,
    }).then(function(response){
      // console.log(...response.data)
      setContactData([...response.data])
      setStopper(false);
      if(response.data.length>0){
        setContact(false)
      }else{
        setContact(true)
      }
    })
  }
  

  if(stopperG){
    axios({
      method: 'get',
      url: `http://localhost:3001/api/getGroups?id=${logged_userID}`,
    }).then(function(response){
      // console.log(...response.data)
      setStopperG(false);
      setGroupData([...response.data])   
      if(response.data.length>0){
        setGroup(false)
      }else{
        setGroup(true)
      }
    })
    
  }

  
  console.log(noContact,"-",noGroup)

  // http://localhost:3001/api/getGroups?id=1

  
  
  
  function resetStopper(){
    setStopper(true);
  }
  function resetStopperG(){
    setStopperG(true);
  }

  function handleClickOpen() {
    setOpen(true);
  }
  
  function handleClose() {
      setOpen(false);
  }

  
  function HandleCloseEdit() {
    setOpenEdit(false);
  }

  function ToggleDelete(){
    setAlertDelete(false);
  }

  function HandleView(){setDialogView(false)}
  function HandleAdd(){setDialogAdd(false)}
  function HandleDelete(){setDialogDelete(false)}

  console.log(ordered);
  return (
    <React.Fragment>
    <ToastContainer enableMultiContainer/>
    <AppBar position="static" style={{
        backgroundColor: '#a43cbd'
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
          <LogoutIcon /> 
            
          </IconButton>
        </Toolbar>
    </AppBar>
    
    <Grid container  style={{padding: '50px'}} justify="center" >
        <Grid item xs={12} md={12} style={{display:'flex', justifyContent: 'center'}}>
          <h2>Welcome {lastname.toLocaleUpperCase()}, {firstname.toLocaleUpperCase()}!</h2>
      
        </Grid>
        


        <Grid item xs={12} md={gridSize}>
        <Paper className={classes.root}>


          {groupToggle?<div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                <Fab size="medium" style={{backgroundColor: '#42a5f5', marginRight:'8px'}} aria-label="add" onClick={()=>{handleClickOpen()}} >
                    <AddIcon style={{float: 'right', color: 'white'}} />
                </Fab>
                <Fab size="medium" style={{backgroundColor: '#fb8c00'}} aria-label="Group" 
                onClick={()=>{
                  setGroupToggle(!groupToggle);
                  if(gridSize === 6){
                    setGridSize(8)
                  }else{
                    setGridSize(6)
                  }
                  
                }} >
                    <GroupIcon style={{float: 'right', color: 'white'}} />
                </Fab>
            </span>
          </div>
          : 
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{float: 'left', marginLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>
            <SearchIcon style={{marginTop: '21px', marginRight: '7px', color: 'gray'}} />
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              onChange={(event)=>{
                // setSearch(event.target.value);
                setSearchGroup(event.target.value);
              }}
              />
          </span> 
          <span style={{float: 'left', marginRight: '25px', marginTop: '20px', marginBottom: '10px'}}>
              <Fab size="medium" style={{backgroundColor: '#42a5f5', marginRight:'8px'}} aria-label="add" 
              onClick={()=>{
                setDialogGroup(true);
              }
              } >
                  <GroupAddIcon style={{float: 'right', color: 'white'}} />
              </Fab>
              <Fab size="medium" style={{backgroundColor: '#fb8c00'}} aria-label="Group" 
              onClick={()=>{
                setGroupToggle(!groupToggle);
                if(gridSize === 6){
                  setGridSize(8)
                }else{
                  setGridSize(6)
                }
                
              }} >
                  <SoloIcon style={{float: 'right', color: 'white'}} />
              </Fab>
          </span>
          </div>
          }


          {groupToggle?
          <Table className={classes.table}>
            <TableHead> 
              <TableRow>
                <TableCell>


                  LAST NAME 
                  <UpDownIcon style={{cursor:'pointer'}} onClick={()=>{
                    if(ordered === "ASC"){
                      setOrdered('DESC');
                    }else{
                      setOrdered('ASC')
                    }
                    setStopper(true);
                    
                  }} />
                  
                 </TableCell>
                <TableCell align="right">FIRST NAME</TableCell>
                <TableCell align="right">MOBILE NUMBER</TableCell>
                <TableCell align="right">ACTION </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noContact? 
                <TableCell colSpan={4}>
                <img src={NoDataFound} alt="NoDataFound" width="100%" height="100%" />
                </TableCell>
              :
                filteredData.map(row => (
                <TableRow key={row.id} hover={true}>
                  <TableCell component="th" scope="row">
                    
                    {row.last_name}
                  </TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.mobile_phone}</TableCell>
                  <TableCell align="right">
                      <Fab size="small" style={{backgroundColor: '#cddc39', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}  onClick={()=>{
                        setOpenEdit(true);
                        setEditData(row);
                        setEditCid(row.id)
                        }}>
                      <EditIcon />
                      </Fab>
                      <Fab size="small" style={{backgroundColor: '#f44336', color: 'white'}} aria-label="add" className={classes.margin} onClick={()=>{
                        setAlertDelete(true);
                        setDeleteId(row.id);
                        
                      }} >
                        <DeleteIcon />
                      </Fab>
                  </TableCell>
                </TableRow>
              ))
              }



            </TableBody>
          </Table>
          :
          <Table className={classes.table}>
            <TableHead> 
              <TableRow>
                <TableCell align="center">
                  Group NAME
                  </TableCell>

                <TableCell align="center">ACTION </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {noGroup?
                <TableCell colSpan={2}>
                <img src={NoDataFound} alt="NoDataFound" width="100%" height="100%" />
                </TableCell>
              :
              
                filteredGroups.map(row => (
                  <TableRow key={row.id} hover={true}>
                    <TableCell component="th" scope="row" align="center">
                    
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                        <Fab size="small" style={{backgroundColor: '#fb8c00', marginRight: '10px'}} aria-label="Group" 
                          onClick={()=>{
                            setDialogView(true);
                            setSelectedGroup(row);
                            // setViewMember
                            axios({
                              method: 'get',
                              url: `http://localhost:3001/api/viewMember?group_id=${row.id}`,
                            }).then(function(response){
                              // console.log(...response.data)
                              // console.log(response);
                              setViewMember([...response.data])
                            })

                          }} >
                              <ViewIcon style={{float: 'right', color: 'white'}} />
                          </Fab>

                        <Fab size="small" style={{backgroundColor: '#cddc39', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}  onClick={()=>{
                          setDialogAdd(true)
                          setSelectedGroup(row);
                          axios({
                            method: 'get',
                            url: `  http://localhost:3001/api/memberList?group_id=${row.id}`,
                          }).then(function(response){
                            // console.log(...response.data)
                            // console.log(response);
                            setGroupMemberData([...response.data])
                          })


                        }}>
                        <AddtoGroup />
                        </Fab>

                    </TableCell>
                  </TableRow>
                ))

              }
                
              

              {}
            </TableBody>
          </Table>
          }


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

    <DialogAddGroup
      dialogOpen = {dialogGroup}
      toggleClose = {function(){
        setDialogGroup(!dialogGroup)
      }}
      user_id = {logged_userID}
      reset = {resetStopperG}
    />

    <DialogViewMember
      dialogOpen = {dialogView}
      toggleClose = {HandleView}
      group = {selectedGroup}
      contact = {viewMember}
      reset = {resetStopperG}
    />
    <DialogAddMember
      dialogOpen = {dialogAdd}
      toggleClose = {HandleAdd}
      contact = {groupMemberData}
      group = {selectedGroup}

    />
    <DialogDeleteGroup
      dialogOpen = {dialogDelete}
      toggleClose = {HandleDelete}

    />

    </React.Fragment>
  );
}