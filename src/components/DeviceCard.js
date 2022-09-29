import React, {Component} from 'react';
import { PubSub } from 'aws-amplify';
import RealtimeLineChart from './RealtimeLineChart';
import {tempRadialChartOption, humRadialChartOption, pmRadialChartOption, soundRadialStroke, vibrationRadialStroke} from './DeviceCardChartOptions';
import ReactApexChart from "react-apexcharts";

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
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;

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
			currentTemp: [0], tempDatalist: [{name: "Temperature", data: []}],
			currentHum: [0], humDatalist: [{name: "Humidity", data: []}],
			currentPM25: [0], pmDatalist: [{name: "PM2.5", data: []}],
			currentSound: [0],
			currentVibration: [0],
      IoT_payload_object: {}, IoT_device_data: {},
			TempExpanded: true, HumExpanded: true, PM25Expanded: true, SoundExpanded: true
    }
		
		this.handleTempExpandClick = this.handleTempExpandClick.bind(this);
		this.handleHumExpandClick = this.handleHumExpandClick.bind(this);
		this.handlePMExpandClick = this.handlePMExpandClick.bind(this);
		this.handleSoundExpandClick = this.handleSoundExpandClick.bind(this);
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
      // Push device data to each type of charts
      this.setState({currentTemp: [message_object.data.temp]});
      this.setState({currentHum: [message_object.data.humid]});
      this.setState({currentPM25: [message_object.data.pm25]});
			this.setState({currentSound: [-message_object.data.sound]});
			this.setState({currentVibration: [message_object.data.vib]});
      this.setState({tempDatalist: this.setDataList(this.state.tempDatalist,this.state.IoT_device_data.temp)});
      this.setState({humDatalist: this.setDataList(this.state.humDatalist,this.state.IoT_device_data.humid)});
			this.setState({pmDatalist: this.setDataList(this.state.pmDatalist,this.state.IoT_device_data.pm25)});
      },
      error: error => console.error(error),
      close: () => console.log('Done'),
  });
      
  }
  
  setDataList(attributeDatalist, payloadAtrributeData){
    let newDatalist = [];
    attributeDatalist.forEach((e)=>{
        let currentData = e.data;
        currentData = this.addData(currentData, payloadAtrributeData);
        newDatalist.push({name: e.name, data: currentData})
    })
		return newDatalist;
  }
	
  addData(currentData, payloadAttributeData){
    return[...currentData,  {x: new Date(),y: payloadAttributeData} ]
  }
	
	handleTempExpandClick(){this.setState(prevState => ({TempExpanded: !prevState.TempExpanded}));}
	handleHumExpandClick(){this.setState(prevState => ({HumExpanded: !prevState.HumExpanded}));}
	handlePMExpandClick(){this.setState(prevState => ({PM25Expanded: !prevState.PM25Expanded}));}
	handleSoundExpandClick(){this.setState(prevState => ({SoundExpanded: !prevState.SoundExpanded}));}
	
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
				<Box className="tempCharts">
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={8}>
						<div >Temperature</div>
						<Switch defaultChecked/>
						<ExpandMore expand={this.state.TempExpanded} onClick={this.handleTempExpandClick} aria-expanded={this.state.TempExpanded}>
							<ExpandMoreIcon/>
						</ExpandMore>
					</Box>
					
					<Collapse in={this.state.TempExpanded} timeout="auto" unmountOnExit>
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
							<div>
								<ReactApexChart options={tempRadialChartOption} series={this.state.currentTemp} type="radialBar" height={120} width={80}
								/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.tempDatalist}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box className="humCharts">
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
								<ReactApexChart options={humRadialChartOption} series={this.state.currentHum} type="radialBar" height={120} width={80}/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.humDatalist}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box className="pm25Charts">
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
								<ReactApexChart options={pmRadialChartOption} series={this.state.currentPM25} type="radialBar" height={120} width={80}/>
							</div>
							<div className="LineChart">
								<RealtimeLineChart
									dataList={this.state.pmDatalist}
									range={TIME_RANGE_IN_MILLISECONDS}
									/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box className="soundAndVibChart">
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1.5}>
						<div >Sound</div>
						<Switch defaultChecked/>
						<div >Vibration</div>
						<Switch defaultChecked/>
						<ExpandMore expand={this.state.SoundExpanded} onClick={this.handleSoundExpandClick} aria-expanded={this.state.SoundExpanded}>
							<ExpandMoreIcon/>
						</ExpandMore>
					</Box>
					
					<Collapse in={this.state.SoundExpanded} timeout="auto" unmountOnExit>
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-around" marginTop={0.5}>
							<div >
								<ReactApexChart options={soundRadialStroke} series={this.state.currentSound} type="radialBar" height={220} width={150}/>
							</div>
							<div >
								<ReactApexChart options={vibrationRadialStroke} series={this.state.currentVibration} type="radialBar" height={220} width={150}/>
							</div>
						</Box>
					</Collapse>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<Box className="deviceControl"
				style={{backgroundColor: 'white', width: '300px', 
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