import './App.css';
import React, {Component} from 'react';

import { button, PubSub } from 'aws-amplify';
import {AwsIoT_connect} from './utils/connection';

import Clock from './components/Clock';
import RealtimeLineChart from './components/RealtimeLineChart';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Collapse, Divider, IconButton, ToggleButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Switch from '@mui/material/Switch'
import RadialBarChart from './components/RadialBarChart';

// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();

// Time range real-time chart
const TIME_RANGE_IN_MILLISECONDS = 10 * 1000;

// Initialize line chart data
const nameList = ["Temperature"]
const defaultDatalist = nameList.map(name =>({
name: name,
data: []
}));


// Main App
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataList: defaultDatalist,
      temp: [0],
      IoT_payload: '',
      IoT_payload_data: {}
    }
  }
  
  
  componentDidMount(){
    // Handle MQTT payload and trigger rerendering with setstate
    let message = '';
    // PubSub.subscribe('real-time-monitor').subscribe({
    PubSub.subscribe('device/ID000123/data/pub').subscribe({
      next: data => 
      {
      // console.log('Message received', data);
      message = JSON.stringify(data);
      // Comment the line below to view the full payload
      message = message.substring(message.indexOf('value')+7).slice(0,-1);
      // Convert payload to JSON
      data = JSON.parse(message);
      data = data.data;
      this.setState({IoT_payload:message, IoT_payload_data: data, current_datalist_timestamp: data.timestamp});
      
      console.log(JSON.stringify(this.state.IoT_payload_data.temp));
      this.setState({temp: [parseFloat(JSON.stringify(this.state.IoT_payload_data.temp))]})
      
      // Push new data into datalist and rerender // Has to be nested inside subcribe as an asyncrhonous call, otherwise, won't trigger rerendering chart.
      this.setDataList();
      
      },
      error: error => console.error(error),
      close: () => console.log('Done'),
  });
      
  }
  
  setDataList(){
    let newDatalist = [];
    this.state.dataList.forEach((e)=>{
        let currentData = e.data;
        currentData = this.addData(currentData, this.state.IoT_payload_data);
        newDatalist.push({name: e.name, data: currentData})
    })
    this.setState({dataList: newDatalist});
  }
  
  addData(currentData, payloadData){
    return[...currentData,  {x: new Date(),y: payloadData.temp} ]
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
            marginTop={5} 
            >
              <div style={{fontSize: '1.3rem', fontWeight:'bold', color: 'white', marginLeft: '20px'} }>Device</div>
              <button>Add device</button>
            </Box>
            
            <Grid item xs={6} md={8}>
              <Box className="DeviceCard" sx={{maxWidth: 350}}>
                <Box style={{backgroundColor: '#172153', width: '300px', 
                height: '45px', width: '340px',
                display: 'flex', flexDirection: 'row', 
                alignItems: 'center', justifyContent: 'center', gap: '80px'}}>
                  <div style={{color:"white"}}> Device: ID00123 </div>
                  <div style={{color:"lime"}}> Status: Normal </div>
                </Box>
                
                <Divider style={{width:'100%'}}></Divider>
                <Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={20}>
                    <div>Temperature</div>
                    <Switch defaultChecked/>
                  </Box>
                  
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
                    {/* <div>{this.state.dataList[this.state.dataList.length]}</div> */}
                    <div >
                      <RadialBarChart series={this.state.temp}/>
                    </div>
                    <div className="LineChart">
                      <RealtimeLineChart
                        dataList={this.state.dataList}
                        range={TIME_RANGE_IN_MILLISECONDS}
                        />
                    </div>
                  </Box>
                </Box>
                                
                <Divider style={{width:'100%'}}></Divider>
                <Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={20}>
                    <div>Temperature</div>
                    <Switch defaultChecked/>
                  </Box>
                  
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
                    {/* <div>{this.state.dataList[this.state.dataList.length]}</div> */}
                    <div >
                      <RadialBarChart series={this.state.temp}/>
                    </div>
                    <div className="LineChart">
                      <RealtimeLineChart
                        dataList={this.state.dataList}
                        range={TIME_RANGE_IN_MILLISECONDS}
                        />
                    </div>
                  </Box>
                </Box>
                                
                <Divider style={{width:'100%'}}></Divider>
                <Box>
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={20}>
                    <div>Temperature</div>
                    <Switch defaultChecked/>
                  </Box>
                  
                  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
                    {/* <div>{this.state.dataList[this.state.dataList.length]}</div> */}
                    <div >
                      <RadialBarChart series={this.state.temp}/>
                    </div>
                    <div className="LineChart">
                      <RealtimeLineChart
                        dataList={this.state.dataList}
                        range={TIME_RANGE_IN_MILLISECONDS}
                        />
                    </div>
                  </Box>
                </Box>
                
                
                
                <Divider style={{width:'100%'}}></Divider>
                <Box style={{backgroundColor: 'white', width: '300px', 
                height: '45px', display: 'flex', flexDirection: 'row', 
                alignItems: 'center', justifyContent: 'center', gap: '90px'}}>
                  <IconButton>
                    <SettingsIcon/>
                  </IconButton>
                  <IconButton>
                    <HistoryIcon/>
                  </IconButton>
                  <Box style={{border: "1px solid #000", borderColor:"gray", borderRadius:30, overflow: "hidden", height: 30, width: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {/* <ToggleButton aria-label="device-option" > */}
                      <PowerSettingsNewIcon/>
                    {/* </ToggleButton> */}
                  </Box>
                  
                </Box>
                
              </Box>
              
              
            </Grid >
            
              
          </Grid>
          
        
              
      </div>
    ); 
  }
}



export default App;
