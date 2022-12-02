import './App.css';
import React, {Component} from 'react';

import {AwsIoT_connect} from './utils/connection';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DeviceCard from './components/DeviceCard';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, TextField, DialogActions } from '@mui/material';

// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();


// Main App
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      addDeviceOpen : false
    }
    
    this.handleClickAddDevice = this.handleClickAddDevice.bind(this);
    this.handleAddDeviceClose = this.handleAddDeviceClose.bind(this);
  }
  
  handleClickAddDevice(){
    this.setState({addDeviceOpen: true})
  }
  
  handleAddDeviceClose(){
    this.setState({addDeviceOpen: false})
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
              
              <div>
                <Button onClick={this.handleClickAddDevice}
                variant='contained' style={{backgroundColor: '#71797E', color: 'white'}}>
                  Add device
                </Button>
                
                <Dialog open={this.state.addDeviceOpen} onClose={this.handleAddDeviceClose}>
                  <DialogTitle>
                    Add device
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Device ID:
                    </DialogContentText>
                    <TextField>
                      autoFocus
                      margin="dense"
                      label="Device ID"
                      type="string"
                      variant="standard"
                    </TextField>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleAddDeviceClose}>
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
                
            </Box>
            
            <DeviceCard/>
            
          
              
          </Grid>
          
        
              
      </div>
    ); 
  }
}



export default App;
