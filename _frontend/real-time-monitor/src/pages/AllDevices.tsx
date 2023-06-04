import '../Devices.css';
import * as React  from 'react';

import {AwsIoT_connect} from '../utils/Connection';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DeviceCard from '../components/DeviceCard';

import Button from '@mui/material/Button';
import AddCircleRoundedIcon from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Badge, makeStyles } from '@mui/material';
// import {makeStyles} from '@mui/styles';
import Notifications from '@mui/icons-material/Notifications';

// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();

export interface MyProps {
};

export interface MyState {
  add_device_open: boolean
  add_device_textfield_value: string,
  device_id_list: Array<string>
};

// const useStyles = makeStyles(theme => ({
//   whiteNotificationIcon:{
//     color: '#ffffff'
//   }
// }))

// Main App - Homepage
class Devices extends React.Component <MyProps, MyState>{
  constructor(props: any){
    super(props);
    this.state = {
      add_device_open : false,
      add_device_textfield_value: "",
      device_id_list: ['demo_1', 'demo_2', 'demo_3', 'demo_4', 'demo_5', 'demo-01']
    }
    
    this.handleClickAddDevice = this.handleClickAddDevice.bind(this);
    this.handleAddDeviceClose = this.handleAddDeviceClose.bind(this);
    this.handleAddDeviceAdd = this.handleAddDeviceAdd.bind(this);
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }
  
  handleClickAddDevice(){
    this.setState({add_device_open: true})
  }
  
  handleTextfieldChange(event: any){
    this.setState({add_device_textfield_value: event.target.value});
  }
  
  handleAddDeviceAdd(){
    let newList = this.state.device_id_list;
    newList.push(this.state.add_device_textfield_value);
    this.setState({
      device_id_list: newList,
      add_device_open: true
    })
  }
  
  handleAddDeviceClose(){
    this.setState({add_device_open: false})
  }
      
  render(){
    return (
      
      <div className="App">
        
        <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center">
          <Box 
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            width={'100%'}
            >
              <div style={{fontSize: '1.3rem', fontWeight:'bold', color: 'white', marginLeft: '20px'}  }>Device</div>
              
              <Box
                display="flex"
                flexDirection={"row"}
                justifyContent="space-around"
                marginRight={8}
              >
                <div style={{marginRight: '16px'}}>
                  <Badge badgeContent={4} color="secondary">
                    <Notifications sx={{color: 'white'}} />  
                  </Badge>
                </div>
                
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
                      <TextField
                        autoFocus
                        margin="dense"
                        type="string"
                        variant="standard"
                        value={this.state.add_device_textfield_value}
                        onChange={this.handleTextfieldChange}
                        />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleAddDeviceClose}> Close </Button>
                      <Button onClick={this.handleAddDeviceAdd}> Add </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Box>
            </Box>
          
          <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center">
            <Grid container spacing={2} display={'flex'} flexWrap={'wrap'} justifyContent={'flex-start'} padding={2}>
              {this.state.device_id_list.map((deviceID)=>
                  <Grid item key={deviceID}>
                    <Grid container direction="column">
                          <DeviceCard deviceID={deviceID}/>
                    </Grid>
                  </Grid> 
              )}
            </Grid>
          </Box>
          
        </Box>
              
      </div>
    ); 
  }
}



export default Devices;
