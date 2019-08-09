import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link> */}
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(name) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [helperTextPass, setHelperTextPass] = useState(false);
  const [btnSignIn, setBtnSignIn] = useState(true);

  const token = localStorage.getItem('token');
  if(token !== null){
    window.location.href='/#/address/';
  }
  

  function HandleChangeUser(event){
    if(event.length > 0){
      setHelperText('');
      setErrorUser(false);
    }else{
      setHelperText('Username is Required')
      setErrorUser(true);
    }

    if(username.length > 0 && password.length > 0){
      setBtnSignIn(false)
    }else{
      setBtnSignIn(true)
    }

  }

  function HandleChangePass(event){
    if(event.length >0){
      setHelperTextPass('');
      setErrorPass(false);
    }else{
      setHelperTextPass('Password is Required');
      setErrorPass(true);
    }
    if(username.length > 0 && password.length > 0){
      setBtnSignIn(false)
    }else{
      setBtnSignIn(true)
    }
  }

  var userData = {
    username: username,
    password: password
  }
  //  console.log(name);
  return (
    <Grid container component="main" className={classes.root}>
    <ToastContainer enableMultiContainer/>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              autoComplete="username"
              autoFocus 
              error={errorUser}
              helperText={helperText}
              onChange = {(event)=> {
                setUsername(event.target.value);
                HandleChangeUser(event.target.value);
              }}
              onBlur= {(event)=>{
                HandleChangeUser(event.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errorPass}
              helperText={helperTextPass}
              onChange = {(event)=> {
                setPassword(event.target.value);
                HandleChangePass(event.target.value);
              }}
              onBlur={(event) => {
                HandleChangePass(event.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"

              disabled= {btnSignIn}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {(e)=>{
                // console.log(userData);
                e.preventDefault();
                axios({
                  method: 'post',
                  url: 'http://localhost:3001/api/login',
                  json: true,
                  data: userData
                }).then(function(response){
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('firstname',response.data.firstname)
                  localStorage.setItem('lastname',response.data.lastname)
                  window.location.href='/#/address';
                }).catch(function(response){
                  toast.error("Invalid Username or Password",{
                    position:toast.POSITION.TOP_LEFT,
                    autoClose:3696
                  })
                })

              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2"> */}
                  Forgot password?
                {/* </Link> */}
              </Grid>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove /> 
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}