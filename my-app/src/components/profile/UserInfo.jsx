/*This Component is used for viewing, modifiying and adding the user information and vehicle information */
import { ThemeProvider } from '@mui/styles';
import theme from "../themes/Theme";
import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Box, Grid, IconButton, TextField, Paper } from '@mui/material';
import { UserInfoContext } from "../../App"
import authHeader from "../services/auth-header"
import VehicleCard from '../home/Cards/VehicleCard';
import { userInfoUpdate } from '../constants/Constant';


export default function UserInfo() {
  
  /** Initialize state variables for the text fields*/
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [emailId,setemailId]=useState("");

  const [address,setaddress]=useState("");
 
  const [vehicleList,setVehicleList] =useState([]);

  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const userInfoContext = useContext(UserInfoContext)

  /** Before the page load we get the redux state values and store in the local state variables*/
  useEffect(() => {

    let {firstname,lastname,email,address} = userInfoContext.userInfoState.userObject;
    let {results} =userInfoContext.userInfoState.vehicleObject;
    setFirstname(firstname);
    setLastname(lastname);
    setemailId(email);
    setaddress(address);
    console.log(results)
    setVehicleList(results)
    
    },[userInfoContext.userInfoState.userObject,userInfoContext.userInfoState.vehicleObject]
  )
 
  /** When the save button is clicked for user info update, the request is send to the server for updating in the database*/
  async function onSave() {
    let requestData={...data};
    delete requestData.role;
    delete requestData.isEmailVerified;
    delete requestData.id;
    delete requestData.code;
    delete requestData.message;
    delete requestData.stack;
    let token =localStorage.getItem("user").replaceAll('"', '')
    console.log(token)
    requestData.email = requestData.email!==emailId?emailId:requestData.email;
    requestData.address = requestData.address!==address?address:requestData.address;
    requestData.lastname = requestData.lastname!==lastname?lastname:requestData.lastname;
    requestData.firstname = requestData.firstname!==firstname?firstname:requestData.firstname;
    requestData.token=token;
    console.log(requestData)
    let header={...authHeader(),'Content-Type':'application/json'}
    const response = await fetch(userInfoUpdate, {
      method: 'PATCH', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',  
      headers: header,
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(requestData) 
    });
    return await response.json().then((value)=>{
     setData(value)
     setIsEdit((previous)=>!previous)
    });
  }
  return (
  /** Grid is used for positioning of the elements
   * Theme contant file is used for global theme
   * Paper is used for card view
  */
  <ThemeProvider theme={theme}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper style={{ minHeight: "400px", margin: "10px", textAlign: "left", padding: "10px" }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
          <Typography variant="h5" component="h2" style={{ display: 'inline-block' }} color="textSecondary">Profile</Typography>
          </Grid>
          <Grid item>
          {!isEdit?
          <IconButton onClick={()=>{setIsEdit((previous)=>!previous)}}>
             <EditIcon>
               </EditIcon>
               </IconButton>:
               <Grid>
               <Button variant="contained" style={{backgroundColor:theme.palette.secondary.main, marginRight:"5px", color:theme.palette.primary.main}} 
               onClick={onSave}
               >Save</Button>
               <Button variant="contained" style={{backgroundColor:theme.palette.secondary.main, color:theme.palette.primary.main}} onClick={()=>{setIsEdit((previous)=>!previous)}}>Cancel</Button>
               </Grid>}
          </Grid>
          </Grid>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Firstname"
              fullWidth
              margin="normal"
              disabled={!isEdit}
              value={firstname}
              onChange={(e)=>{setFirstname(e.target.value)}}
            />
            <TextField
              label="Lastname"
              fullWidth
              margin="normal"
              disabled={!isEdit}
              value={lastname}
              onChange={(e)=>{setLastname(e.target.value)}}
            />
           
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              disabled={!isEdit}
              value={address}
              onChange={(e)=>{setaddress(e.target.value)}}
            />
            <TextField
              label="Email Id"
              fullWidth
              margin="normal"
              disabled={!isEdit}
              value={emailId}
              onChange={(e)=>{setemailId(e.target.value)}}
            />

          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
      <Paper style={{ minHeight: "600px", margin: "10px", textAlign: "left", padding: "10px" }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3">List Of Vehicles</Typography>
      </div>
      <Grid container>
          {vehicleList.map((vehicle,index)=>{return (<VehicleCard key={index} count={index} vehicle={vehicle}/>)})}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:"20px" }}>
      <Button
        onClick={()=>{
          let val =[...vehicleList]

          let newAdd = {
            "make": "",
            "model": "",
            "registrationNumber": ""
        }
          val.push(newAdd)
          setVehicleList(val)
        }}
        style={{backgroundColor:theme.palette.primary.main}}
        variant="contained"
      >
        Add Vehicle
      </Button>
      </div>
    </Paper>
      </Grid>
      
    </Grid>
    
  </ThemeProvider>)
}