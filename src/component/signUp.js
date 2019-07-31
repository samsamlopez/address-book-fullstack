import React,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      // backgroundColor: theme.palette.common.white,
      background: 'url(https://source.unsplash.com/random?books)',
      WebkitBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      backgroundSize:'cover',
      backgroundPosition: 'center'
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [changeF, setChangeF] = useState(false);
  const [helperF, setHelperF] = useState('');
  const [changeL, setChangeL] = useState(false);
  const [helperL, setHelperL] = useState('');
  const [changeU, setChangeU] = useState(false);
  const [helperU, setHelperU] = useState('');
  const [changeP, setChangeP] = useState(false);
  const [helperP, setHelperP] = useState('');
  const [btnSignUp, setBtnSignUp] = useState(true);

  // localStorage.setItem('token', token);


  let storeData = {
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
  }

  function BtnChange(){
    if(username.length > 0 && lastname.length > 0 && password.length > 0 && firstname.length > 0){
      setBtnSignUp(false);
    }else{
      setBtnSignUp(true);
    }
  }

  function HandleChange(event, field){
    if(field === "firstname"){
      if(event.length > 0){
        setChangeF(false);
        setHelperF('');
      }else{
        setChangeF(true);
        setHelperF('Firstname is Required');
      }

    }else if(field === "lastname"){
      if(event.length > 0){
        setChangeL(false);
        setHelperL('');
      }else{
        setChangeL(true);
        setHelperL('Lastname is Required');
      }

    }else if(field === "username"){
      if(event.length > 0){
        setChangeU(false);
        setHelperU('');
      }else{
        setChangeU(true);
        setHelperU('Firstname is Required');
      }
    }else if(field === "password"){
      
      if(event.length > 0){
        setChangeP(false);
        setHelperP(''); 
      }else{
        setChangeP(true);
        setHelperP('Password is Required');
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs" 
    style={{
      backgroundColor:'#ffffffeb',
      paddingBottom:'15px', 
      borderRadius: '5px'
      }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={changeF}
                helperText={helperF}
                onBlur={(e)=>{
                  HandleChange(e.target.value,"firstname")
                  BtnChange();
                }}
                onChange= {(e)=>{
                  setFirstname(e.target.value);
                  HandleChange(e.target.value,"firstname")
                  BtnChange();
                }}
                

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={changeL}
                helperText={helperL}
                onBlur={(e)=>{
                  HandleChange(e.target.value,"lastname")
                  BtnChange();
                }}
                onChange= {(e)=>{
                  setLastname(e.target.value);
                  HandleChange(e.target.value,"lastname")
                  BtnChange();
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={changeU}
                helperText={helperU}
                onBlur={(e)=>{
                  HandleChange(e.target.value,"username")
                  BtnChange();
                }}
                onChange= {(e)=>{
                  setUsername(e.target.value);
                  HandleChange(e.target.value,"username")
                  BtnChange();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={changeP}
                helperText={helperP}
                onBlur={(e)=>{
                  HandleChange(e.target.value,"password")
                  BtnChange();
                }}
                onChange= {(e)=>{
                  setPassword(e.target.value);
                  HandleChange(e.target.value,"password")
                  BtnChange();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={btnSignUp}
            onClick = {()=> {
              // console.log(storeData);

              axios({
                method: 'post',
                url: 'http://localhost:3001/api/users',
                json: true,
                data: storeData
              }).then(function(response){
                console.log(response.data.token)
               
              })


            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
