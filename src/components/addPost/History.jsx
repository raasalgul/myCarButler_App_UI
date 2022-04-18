import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../themes/Theme"
import React, { useState,useEffect } from 'react';
import HistoryCard from './Cards/HistoryCard';
import authHeader from '../services/auth-header';
import { bookingHistory } from '../constants/Constant';

export default function History(){

    const [historyList,setHistoryList] = useState([])

    useEffect(()=>{
      fetch(bookingHistory,{ headers: authHeader() }).then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson)
        setHistoryList(myJson.results)
       })
    
       },[])
    return(<ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          {historyList.map((value,index)=>{
            index++
            return(
              <Grid item>
              <HistoryCard key={index} booking={"Booking "+index} history={value} />
              </Grid>
            )
          })}
        </Grid>
    </ThemeProvider>)
}