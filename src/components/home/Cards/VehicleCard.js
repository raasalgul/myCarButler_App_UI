import React from "react";
import { Grid, Button,Typography,IconButton } from "@material-ui/core";
import theme from "../../themes/Theme"
import { useState ,useContext} from "react";
import { TextField } from "@mui/material";
import { UserInfoContext } from "../../../App"
import EditIcon from '@mui/icons-material/Edit';
import authHeader from "../../services/auth-header"
import { createVehicle, getVehicles } from "../../constants/Constant";



  export default function Card(props)  {
    const [make,setMake] = useState(props.vehicle.make);
    const [model,setModel] = useState(props.vehicle.model);
    const [regNumber,setRegNumber] = useState(props.vehicle.registrationNumber);
    const [data, setData] = useState({});
    const userInfoContext = useContext(UserInfoContext)
    let owner=userInfoContext.userInfoState.userObject.id
    async function onSave() {
      let requestData={...data};
    let token =localStorage.getItem("user").replaceAll('"', '')
    console.log(token)
    requestData.make = requestData.make!==make?make:requestData.make;
    requestData.model = requestData.model!==model?model:requestData.model;
    requestData.registrationNumber = requestData.registrationNumber!==regNumber?regNumber:requestData.registrationNumber;
    requestData.owner = requestData.owner!==owner?owner:requestData.owner;
    requestData.name='not needed'
    console.log(requestData)
    let header={...authHeader(),'Content-Type':'application/json'}
    const response = await fetch(createVehicle, {
      method: 'POST', 
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
       userInfoContext.userInfoDispatch({type:'userState',payload:{...userInfoContext.userInfoState , "vehicleObject":myJson}})
       console.log(userInfoContext.userInfoState)
       });
    });
    }

    console.log(props)
    const [isEdit, setIsEdit] = useState(false);
    return (
      <Grid item xs={12}>
      <Grid>
      {!isEdit?
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={4}>
      <Typography>Vehicle {props.count+1}</Typography>
      </Grid>
      <Grid item xs={4} direction={'row-reverse'} alignContent={'flex-end'}>
      <IconButton onClick={()=>{setIsEdit((previous)=>!previous)}}>
         <EditIcon>
           </EditIcon>
           </IconButton></Grid></Grid>:
           <Grid>
           <Button variant="contained" style={{backgroundColor:theme.palette.secondary.main, marginRight:"5px", color:theme.palette.primary.main}} 
           onClick={onSave}
           >Save</Button>
           <Button variant="contained" style={{backgroundColor:theme.palette.secondary.main, color:theme.palette.primary.main}} onClick={()=>{setIsEdit((previous)=>!previous)}}>Cancel</Button>
           </Grid>}
      </Grid>
      <div style={{ display: 'grid'}}>
      <TextField
          label="Vehicle Name"
          fullWidth
          margin="normal"
          disabled={!isEdit}
          value={make}
          onChange={(e)=>{setMake(e.target.value)}}
        />
         <TextField
          label="Model"
          fullWidth
          margin="normal"
          disabled={!isEdit}
          value={model}
          onChange={(e)=>{setModel(e.target.value)}}
        />
         <TextField
          label="Vehicle Number"
          fullWidth
          margin="normal"
          disabled={!isEdit}
          value={regNumber}
          onChange={(e)=>{setRegNumber(e.target.value)}}
        />
      </div>
    
      </Grid>
     
    );
  }