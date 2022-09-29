import React, {Component} from 'react';
import { PubSub } from 'aws-amplify';
import RadialBarChart from './RadialBarChart';
import RealtimeLineChart from './RealtimeLineChart';

import Box from '@mui/material/Box';

import { Button, Collapse, Divider, IconButton, ToggleButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Switch from '@mui/material/Switch';
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Grid from '@mui/material/Grid';

// Time range real-time chart
const TIME_RANGE_IN_MILLISECONDS = 10 * 1000;

// Styling expanding button
const ExpandMore = styled((props)=>{
	const {expand, ...other} = props;
	return <IconButton {...other}/>;
})(({theme, expand})=>({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform',{
		duration: theme.transitions.duration.shortest,
	})
}));

class DeviceCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deviceID: 'ID000123',
			currentTemp: [0], dataList: [{name: "Temperature", data: []}],
			currentHum: [0],
			currentPM25: [0],
      IoT_payload_object: {}, IoT_device_data: {},
			TempExpanded: true, HumExpanded: true, PM25Expanded: true
    }
		
		this.handleTempExpandClick = this.handleTempExpandClick.bind(this);
		this.handleHumExpandClick = this.handleHumExpandClick.bind(this);
		this.handlePMExpandClick = this.handlePMExpandClick.bind(this);
	}
	
	componentDidMount(){
    // Handle MQTT payload and trigger rerendering with setstate
    // PubSub.subscribe('real-time-monitor').subscribe({
			let device_data_publish = 'device/' +  this.state.deviceID + '/data/pub';
			PubSub.subscribe(device_data_publish).subscribe({
			next: data => 
			{
			// Convert packet to string
			let message = '';
      message = JSON.stringify(data);
      // Grep message content and convert to object
      let message_object = JSON.parse(message.substring(message.indexOf('value')+7).slice(0,-1));
      this.setState({IoT_payload_object:message_object, IoT_device_data: message_object.data, current_datalist_timestamp: message_object.data.timestamp});
      
			// Has to be nested inside subcribe as an asyncrhonous call, otherwise, won't trigger rerendering chart.
      // Push device temp to chart
      this.setState({currentTemp: [message_object.data.temp]});
      this.setState({currentHum: [message_object.data.humid]});
      this.setState({currentPM25: [message_object.data.pm25]});
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
        currentData = this.addData(currentData, this.state.IoT_device_data);
        newDatalist.push({name: e.name, data: currentData})
    })
    this.setState({dataList: newDatalist});
  }
  
  addData(currentData, payloadData){
    return[...currentData,  {x: new Date(),y: payloadData.temp} ]
  }
	
	handleTempExpandClick(){this.setState(prevState => ({TempExpanded: !prevState.TempExpanded}));}
	handleHumExpandClick(){this.setState(prevState => ({HumExpanded: !prevState.HumExpanded}));}
	handlePMExpandClick(){this.setState(prevState => ({PM25Expanded: !prevState.PM25Expanded}));}
	
	render () {
		return (
			<Grid item xs={6} md={8}>
				<Box className="DeviceCard" sx={{maxWidth: 350}}>
				<Box style={{backgroundColor: '#172153', width: '300px', 
				height: '45px', width: '340px',
				display: 'flex', flexDirection: 'row', 
				alignItems: 'center', justifyContent: 'center', gap: '80px'}}>
					<div style={{color:"white"}}> Device: {this.state.deviceID} </div>
					<div style={{color:"lime"}}> Status: Normal </div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box>
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={8}>
						<div >Temperature</div>
						<Switch defaultChecked/>
						<ExpandMore expand={this.state.TempExpanded} onClick={this.handleTempExpandClick} aria-expanded={this.state.TempExpanded}>
							<ExpandMoreIcon/>
						</ExpandMore>
					</Box>
					
					<Collapse in={this.state.TempExpanded} timeout="auto" unmountOnExit>
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
							<div >
								<RadialBarChart series={this.state.currentTemp}/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.dataList}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box>
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={9}>
						<div >Humidity</div>
						<Switch defaultChecked/>
						<ExpandMore expand={this.state.HumExpanded} onClick={this.handleHumExpandClick} aria-expanded={this.state.HumExpanded}>
							<ExpandMoreIcon/>
						</ExpandMore>
					</Box>
					
					<Collapse in={this.state.HumExpanded} timeout="auto" unmountOnExit>
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
							<div >
								<RadialBarChart series={this.state.currentHum}/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.dataList}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box>
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10}>
						<div >PM2.5</div>
						<Switch defaultChecked/>
						<ExpandMore expand={this.state.PM25Expanded} onClick={this.handlePMExpandClick} aria-expanded={this.state.PM25Expanded}>
							<ExpandMoreIcon/>
						</ExpandMore>
					</Box>
					
					<Collapse in={this.state.PM25Expanded} timeout="auto" unmountOnExit>
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
							<div >
								<RadialBarChart series={this.state.currentPM25}/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.dataList}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
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
				
			</Grid>
		);
	}
}

export default DeviceCard;