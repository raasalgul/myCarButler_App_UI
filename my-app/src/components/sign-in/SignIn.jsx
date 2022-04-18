// This component is used by the user to login to the application
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from "../themes/Theme"
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {UserInfoContext} from "../../App"
import { useContext,useState } from 'react';
import authHeader from '../services/auth-header';
import axios from 'axios';
import { getVehicles, userLogin } from '../constants/Constant';

const useStyle=makeStyles({
  link_style:{
      textDecoration: 'none',
      color:'#FFF'
  }
})
export default function SignIn(props) {

  // Save the user id to the state
  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

    // Save the user password to the state
  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  // Send the user id and password for validation to the server
  function handleLogin(e) {
    e.preventDefault();
    // setMessage("");
    // setLoading(true);
      let formData={
        "email":username,
        "password":password 
      }
      console.log(formData)
      axios
      .post(userLogin,
      formData).then((response)=>{
        console.log(response.data);
        let token = response.data.tokens.access.token
        let userObject = response.data.user
        console.log(token)
        localStorage.setItem("user", JSON.stringify(token));
        console.log(userObject)
        fetch(getVehicles,
        { 
            method: 'GET', 
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
          headers: {...authHeader()} })
        
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson)
          localStorage.setItem("user", JSON.stringify(token));
          // Update the user information and vehicle information to the redux and used in user profile page
          userInfoContext.userInfoDispatch({type:'userState',payload:{"userToken":token,"userObject":userObject,"vehicleObject":myJson}})
          props.history.push("/home");
          });

      
       
      }).catch(e=> {
        console.log(e)
      })
  }

  const [username, setUsername] = useState('');
  const [password,setPassword]=useState('');
  // const [message, setMessage] = useState('');
  // const [loading,setLoading]=useState(false);

  const userInfoContext = useContext(UserInfoContext)

  const classes=useStyle();
    let error=React.useState(false);
  return (
    // Used the constant theme file for getting theme and used grid for component positioning. The Paper component is used for the card view.
    <ThemeProvider theme={theme}>
    <Grid container alignItems="center" justifyContent="center"
    >
    <Paper elevation={24} style={{height:"50vh",width:"40vw",display:"flex",alignItems:"space-between",justifyContent:"center"}}>
        <Grid container direction="column" alignItems="center" height="50vh" width="80vw">
        <Grid item container direction="column" xs={4} md={4} spacing={2} justifyContent="center">
        <div style={{display: 'block',marginLeft: 'auto',width: '54%'}}>
        <Avatar style={{width:100,height:100}} src="/broken-image.jpg" />
        </div>
        </Grid>
        <Grid item container direction="column" xs={8} md={8} justifyContent="center" spacing={2}>
        <Grid item>
        <TextField
          error={error[0]}
          id="userName"
          label="UserName"
          value={username}
          onChange={onChangeUsername}
        />
        </Grid>
        <Grid item>
        <TextField
          error={error[0]}
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={onChangePassword}
          helperText={error[0]?"Incorrect Username or Password.":""}
        />
        </Grid>
        <Grid item container justifyContent="center" spacing={3}>
        <Grid item>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        </Grid>
        <Grid item justifyContent="center" alignSelf="center">
        <Link to="/sign-up" className={classes.link_style}>
        <Button variant="contained">SignUp</Button>
        </Link>
        </Grid>
        </Grid>
   </Grid>
   </Grid>
    </Paper>
    </Grid>
    </ThemeProvider>
  );
}
