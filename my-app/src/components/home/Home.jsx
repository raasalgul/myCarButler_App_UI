// This 

import { ThemeProvider } from '@mui/material/styles';
import theme from "../themes/Theme"
import React, { useState,useEffect } from 'react';
import { Button, Grid, Typography, TextField, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserInfoContext } from "../../App" 
import { useContext } from 'react';
import authHeader from '../services/auth-header'
import { booking, createCharge, getPaymentInfo, makePayment } from '../constants/Constant';


export default function Home(){

  const [vehicle, setVehicle] = React.useState([]);
  const userInfoContext = useContext(UserInfoContext) 

  const handleChange1 = (event) => {
    setVehicle(event.target.value);
  };


  const [isBooking,setIsBooking]=useState(true);

    const [vehicleList,setVehicleList] =useState([])
    const [pickUpLocation,setPickUpLocation] = useState('')
    const [destination,setDestination] = useState('')
    const [pickUpTime,setPickUpTime] = useState('')
    const [dropTime,setdropTime] = useState('')

    const [number,setNumber] = useState('')
    const [expMonth,setExpMonth] = useState('')
    const [expYear,setExpYear] = useState('')
    const [cvc,setCvc] = useState('')
    const [price,setPrice] = useState('')
    const [paymentError,setPaymentError] =useState(false);
    const [paymentSucess,setPaymentSuccess] =useState(false);
    
   
    useEffect(()=>{
      let {results} =userInfoContext.userInfoState.vehicleObject;
      setVehicleList(results);
      console.log(results)
    },[vehicle,userInfoContext.userInfoState.vehicleObject])
    console.log(pickUpTime)
    return(<ThemeProvider theme={theme}>
      {isBooking?
        (<Grid container spacing={2} justifyContent={'center'}>
        <Paper style={{ minHeight: "400px", margin: "10px", textAlign: "left", padding: "10px" }}>
          <Typography variant="h5" component="h2" style={{ display: 'inline-block' }} color="textSecondary">Creating Booking</Typography>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-filled-label">Vehicle</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={vehicle}
          onChange={handleChange1}
        >
          {vehicleList.map((val,index)=>{
            console.log(index)
            return(<MenuItem key ={index} value={val.id}>{val.make+" "+val.model}</MenuItem>)
          })}
          
        </Select>
      </FormControl>
            <TextField
              label="Pickup Location"
              fullWidth
              margin="normal"
              value={pickUpLocation}
              onChange={(e)=>{setPickUpLocation(e.target.value)}}
            />
           
           <TextField
              label="Destination"
              fullWidth
              margin="normal"
              value={destination}
              onChange={(e)=>{setDestination(e.target.value)}}
            />

  <LocalizationProvider dateAdapter={AdapterDateFns}>
           <Grid container justifyContent={'space-between'}>
             <Grid item>
          <DateTimePicker
          label="Pickup Time"
          value={pickUpTime}
          onChange={(val)=>{
            setPickUpTime(val)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </Grid>
        <Grid item>
          <DateTimePicker
          label="Drop Time"
          value={dropTime}
          onChange={(val)=>{
            setdropTime(val)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </Grid>
          </Grid>
            </LocalizationProvider>
<br/>
      <Grid container justifyContent={"right"}>
        <Button color="secondary" size="large" type="submit" variant="contained" onClick={()=>{
            let req={
              "user": userInfoContext.userInfoState.userObject.id,
              "vehicle": vehicle,
              "pickupLocation": pickUpLocation,
              "destination": destination,
              "pickupTime": pickUpTime,
              "dropTime": dropTime
          }
          console.log(req)
          let header={...authHeader(),'Content-Type':'application/json'}
          setIsBooking(false);
            fetch(booking, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: header,
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(req) 
          }).then((response)=>{
            response.json().then((value)=>{
              // setData(value)
              // setIsEdit((previous)=>!previous)
              console.log(value);
              setPrice(value.price);
             });
          });
          }}>
        Book
        </Button>
      </Grid>      
        </Paper>
        </Grid>):
          paymentSucess?
          (<Grid container spacing={2} direction={'column'} justifyContent={'center'}>
          {/* <Paper style={{ minHeight: "400px", margin: "10px", textAlign: "left", padding: "10px" }}> */}
            <Typography variant="h3" component="h1" style={{ display: 'inline-block' }} color="secondary">Sucess</Typography>
            <Button variant='contained' style={{maxWidth:"200px"}} onClick={()=>{setIsBooking(true); setPaymentSuccess(false)}}>New Booking</Button>
            </Grid>
            )
          :
        (<Grid container spacing={2} justifyContent={'center'}>
        <Paper style={{ minHeight: "400px", margin: "10px", textAlign: "left", padding: "10px" }}>
          <Typography variant="h5" component="h2" style={{ display: 'inline-block' }} color="textSecondary">Payment</Typography>
          <TextField
              label="Price"
              fullWidth
              margin="normal"
              value={price}
              disabled={true}
              // onChange={(e)=>{setNumber(e.target.value)}}
            />
           
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              value={number}
              onChange={(e)=>{setNumber(e.target.value)}}
            />
           
           <TextField
              label="Expire Month"
              fullWidth
              margin="normal"
              value={expMonth}
              onChange={(e)=>{setExpMonth(e.target.value)}}
            />

              <TextField
              label="Expire Year"
              fullWidth
              margin="normal"
              value={expYear}
              onChange={(e)=>{setExpYear(e.target.value)}}
            />

              <TextField
              label="CVC"
              fullWidth
              margin="normal"
              value={cvc}
              onChange={(e)=>{setCvc(e.target.value)}}
            />  

 
<br/>
      <Grid container justifyContent={"right"}>
        <Button color="secondary" size="large" type="submit" variant="contained" onClick={()=>{
            let req={
              "userId": userInfoContext.userInfoState.userObject.id,
              "number": number,
              "expMonth": expMonth,
              "expYear": expYear,
              "cvc": cvc
          }

          let header={...authHeader(),'Content-Type':'application/json'}
            fetch(makePayment, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: header,
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(req) 
          }).then((response)=>{
            response.json().then((value)=>{
              console.log(value);
              fetch(getPaymentInfo+'/'+userInfoContext.userInfoState.userObject.id, {
                method: 'GET', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: header,
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
              }).then((response1)=>{
                response1.json().then((value1)=>{
                  console.log(value1);
                  let reqCreateCharge = {
                    "userId":userInfoContext.userInfoState.userObject.id,
                    "stripeId":value1.user.stripeIds[0],
                    "amount":Math.round(price),
                    "stripeClientId":value1.user.stripeClientId,
                    "description":"Booking"  
                }
                fetch(createCharge, {
                  method: 'POST', 
                  mode: 'cors', 
                  cache: 'no-cache', 
                  credentials: 'same-origin', 
                  headers: header,
                  redirect: 'follow',
                  referrerPolicy: 'no-referrer', 
                  body: JSON.stringify(reqCreateCharge) 
                }).then((response)=>{
                  response.json().then((value2)=>{
                    console.log(value2)
                    setPaymentSuccess(true);
                  })}).catch(()=>{
                    setPaymentError(true);
                  })
                 });
              });
              setPrice(value.price);
             });
          });

          console.log(req)
          }}>
        Make Payment
        </Button>
      </Grid>      
        </Paper>
        </Grid>)
}
    </ThemeProvider>)
}