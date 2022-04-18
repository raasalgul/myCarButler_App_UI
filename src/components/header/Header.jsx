import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import theme from "../themes/Theme"
import Button from '@mui/material/Button';
import {useState,useContext,useEffect} from 'react';
import {UserInfoContext} from "../../App"
import { useHistory } from "react-router-dom";


const useStyle=makeStyles({
    link_style:{
        textDecoration: 'none',
        color:'#FFF'
    }
})

function Header(){
    const classes=useStyle();
    const history = useHistory();

    const userInfoContext = useContext(UserInfoContext)
    const [isAvatarClick,setIsAvatarClick]=useState(false);
    const [isLogin,setIsLogin]=useState(false);
    useEffect(()=>{
        setIsLogin(userInfoContext.userInfoState.userId!=="")
        },[userInfoContext.userInfoState.userId]
        )
       
      
    return(
    <ThemeProvider theme={theme}>
         {isLogin? 
        <div>
    <Grid container justifyContent="space-between" 
    style={{ backgroundColor: theme.palette.primary.main,color:theme.palette.primary.light,marginBottom:"3em",marginRight:"1em"}}>
        <Grid item container xs={10} md={11} spacing={2}>
        <Grid item xs={2} md={1}>
        <Link to="/home" className={classes.link_style}><p>Home</p></Link>
            </Grid>
            <Grid item xs={3} md={1}>
            <Link to="/profile" className={classes.link_style}><p>Profile</p></Link>
            </Grid>
            <Grid item xs={2} md={1}>
            <Link to="/bookings" className={classes.link_style}><p>History</p></Link>
            </Grid>
            <Grid item xs={2} md={1}>
            <Link to="/about" className={classes.link_style}><p>About</p></Link>
            </Grid>
            <Grid item xs={4} md={2} lg={1}>
            <Link to="/contact-us" className={classes.link_style}><p>Contact Us</p></Link>
            </Grid>
            </Grid>
            <Grid item container xs={2} md={1} justifyContent="flex-end">
            <Grid item xs={6}
            >
            <Button 
            style={{ backgroundColor: theme.palette.secondary.main,
                color:theme.palette.primary.main,minHeight:'57px'}}
            onClick={()=>{
                setIsAvatarClick((state)=>{return !state});
            }}
            >
                {userInfoContext.userInfoState.userObject.firstname !== undefined?userInfoContext.userInfoState.userObject.firstname.substring(0,2):""}</Button>
            </Grid>
            </Grid>
        </Grid> 
        {isLogin?
        <Grid>
            </Grid>:null}
        {isAvatarClick?
       <Grid container justifyContent="flex-end">
           <Button variant="contained" onClick={()=>{
              localStorage.removeItem("user");
              history.push("/sign-in");
              window.location.reload(false)
      }}>Logout</Button>
      </Grid>:null
            }
      </div>
      : <div 
      style={{ backgroundColor: theme.palette.primary.main,color:theme.palette.primary.light,marginBottom:"3em"}}><br/><br/><br/></div>}
        </ThemeProvider>
        )
}

export default Header;