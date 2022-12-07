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


// Main App - Homepage
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      add_device_open : false,
      add_device_textfield_value: "",
      device_id_list: ['demo-01', 'demo_1', 'demo_2', 'demo_3','demo_4','demo_5']
    }
    
    this.handleClickAddDevice = this.handleClickAddDevice.bind(this);
    this.handleAddDeviceClose = this.handleAddDeviceClose.bind(this);
    this.handleAddDeviceAdd = this.handleAddDeviceAdd.bind(this);
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }
  
  handleClickAddDevice(){
    this.setState({add_device_open: true})
  }
  
  // setNewDeviceID(event){
  //   const {value} = event.target;
  //   this.setState({add_device_textfield_value: value})
  //   console.log(event.target);
  // }
  
  handleTextfieldChange(value){
    this.setState({add_device_textfield_value: value})
  }
  
  handleAddDeviceAdd(){
    let newList = this.state.device_id_list;
    newList.push(this.state.add_device_textfield_value);
    this.setState({
      device_id_list: newList,
      add_device_open: false
    })
    console.log(this.state.add_device_textfield_value);
  }
  
  handleAddDeviceClose(){
    this.setState({add_device_open: false})
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
                
                <Dialog open={this.state.add_device_open} onClose={this.handleAddDeviceClose}>
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
                      defaultValue={this.state.add_device_textfield_value}
                      onChange={this.handleTextfieldChange}
                    </TextField>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleAddDeviceClose}> Close </Button>
                    <Button onClick={this.handleAddDeviceAdd}> Add </Button>
                  </DialogActions>
                </Dialog>
              </div>
                
            </Box>
            
              {this.state.device_id_list.map((deviceID)=>
              <DeviceCard key={deviceID} deviceID={deviceID}/>
              )}
            
            <Box height={50}></Box>
          
          </Grid>
          
        
              
      </div>
    ); 
  }
}



export default App;
