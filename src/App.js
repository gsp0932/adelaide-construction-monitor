import './App.css';
import React, {Component} from 'react';

import {AwsIoT_connect} from './utils/connection';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DeviceCard from './components/DeviceCard';



// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();


// Main App
class App extends React.Component {
  constructor(props){
    super(props);

  }
      
  render(){
    return (
      
      <div className="App">
        {/* <header className="App-header"></header> */}
          <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            
            <Box 
            display="flex"
            flexDirection={"row"}
            justify-content="space-between"
            alignItems="stretch"
            gap="150px"
            marginTop={5}>
              <div style={{fontSize: '1.3rem', fontWeight:'bold', color: 'white', marginLeft: '20px'} }>Device</div>
              <button>Add device</button>
            </Box>
            
            <DeviceCard/>
            
              
          </Grid>
          
        
              
      </div>
    ); 
  }
}



export default App;
