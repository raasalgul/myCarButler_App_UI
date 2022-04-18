import { ThemeProvider,makeStyles } from '@mui/styles';
import * as React from 'react';
import theme from "../../themes/Theme"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useEffect,useState,useContext } from 'react';
import { Grid } from '@mui/material';
import { UserInfoContext } from "../../../App" 

const useStyles = makeStyles({
    root: {
      minWidth: 444,
      alignContent:'center'
    },
  });
  

export default function HistoryCard(props){
  const userInfoContext = useContext(UserInfoContext) 
   let [vechicle,setVehicle] =useState('')
useEffect(()=>{
  let vehicles={}
  let {results} =userInfoContext.userInfoState.vehicleObject;
  for(let i=0;i<results.length;i++){
    vehicles[results[i].id]=results[i].make+" "+results[i].model;
    console.log(results[i])
  }
  console.log(vehicles)
  console.log(vehicles[props.history.vehicle])
  setVehicle(vehicles[props.history.vehicle])
},[props.history.vehicle,userInfoContext.userInfoState.vehicleObject])

    const classes = useStyles();
    return(<ThemeProvider theme={theme}>
      { console.log(props)}
          <Card className={classes.root} variant="outlined">
         <CardContent>
         <Grid alignSelf="center">
              <Typography variant="h4">{props.booking}</Typography>
              </Grid>
           <div style={{display: 'block',marginLeft: 'auto'}}>
         </div>
         <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Date:</Typography>
          <Typography value={props.history.createdAt} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.createdAt}</Typography>
        <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Vehicle:</Typography>
          <Typography value={vechicle} variant="h5" component="h2" style={{display: 'inline-block'}}>{vechicle}</Typography>
          <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Booking Status:</Typography>
          <Typography value={props.history.status} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.status}</Typography>
        <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Pickup Location: </Typography> 
          <Typography value={props.history.pickupLocation} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.pickupLocation}</Typography>
          <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Pickup Time:</Typography>
          <Typography value={props.history.pickupTime} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.pickupTime}</Typography>
          <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Destination:</Typography> 
          <Typography value={props.history.destination} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.destination}</Typography>
          <br/><br/>
          <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Drop Time:</Typography>
          <Typography value={props.history.dropTime} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.dropTime}</Typography>
          <br/><br/>
        <Typography variant="h5" component="h2" style={{display: 'inline-block'}} color="textSecondary">Price: </Typography>
          <Typography value={props.history.price} variant="h5" component="h2" style={{display: 'inline-block'}}>{props.history.price}</Typography>
      </CardContent>
    </Card>
    </ThemeProvider>)
}