import * as React from 'react';
import { PubSub } from 'aws-amplify';
import RealtimeLineChart from './charts/RealtimeLineChart';
import {tempRadialChartOption, humRadialChartOption, multiPMsCustomAngleRadialChartOption, soundRadialStroke, vibrationRadialStroke, multiVibrationCustomAngleRadialChartOption} from './charts/ChartOptions';
import ReactApexChart from "react-apexcharts";

import Box from '@mui/material/Box';

import { 
	// Button, 
	// Collapse, 
	// ToggleButton ,
	Divider, IconButton, 
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import {styled} from '@mui/material/styles';
import {HistoryButton} from './buttons/HistoryButton';

import Grid from '@mui/material/Grid';
// import {flushSync} from 'react-dom';

// Time range real-time chart
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;

export interface MyProps {
	deviceID: any
};

export interface MyState {
  deviceID: string,
	currentTemp: any[], 
	tempDatalist: any[],
	currentHum: any[], 
	humDatalist: any[],
	currentPM1: any[], 
	currentPM10: any[], 
	currentPM25: any[], 
	pmDatalist: any[],
	currentSound: any[],
	currentVibration: any[],
	IoT_payload_object: {}, IoT_device_data: {},
};
	
class DeviceCard extends React.Component <MyProps, MyState>{
	constructor(props: any){
		super(props);
		this.state = {
			deviceID: props.deviceID,
			currentTemp: [0], 
			tempDatalist: [{name: "Temperature", data: []}],
			currentHum: [0], 
			humDatalist: [{name: "Humidity", data: []}],
			currentPM1: [0], 
			currentPM10: [0], 
			currentPM25: [0], 
			pmDatalist: [{name: "PM2.5", data: []}],
			currentSound: [0],
			currentVibration: [0],
      IoT_payload_object: {}, IoT_device_data: {},
    };
		
		this.handlePowerOffClick = this.handlePowerOffClick.bind(this);
		
	}
	
	
	componentDidMount(){

    // Handle MQTT payload and trigger rerendering with setstate
		let device_data_publish = "aws/things/" +  "construction_esp32" + "/shadow/update"
		PubSub.subscribe(device_data_publish).subscribe({
			next: data => 
			{
			// Convert packet to string
			let message = '';
      message = JSON.stringify(data);
      // Grep message content and convert to object
      let message_object = JSON.parse(message.substring(message.indexOf('value')+7).slice(0,-1));
			
			// Loop through data array
			// Has to be nested inside subscribe as an asynchronous call, otherwise, won't trigger rerendering chart.
			// Push device data to each type of charts
			this.setState({IoT_payload_object:message_object});
			if(message_object.state.reported.data[0].deviceId ===  this.state.deviceID)						// !
			{
				for (let i = 0; i < message_object.state.reported.data.length; i++){
					this.setState({IoT_device_data: message_object.state.reported.data[i]});
					setTimeout(()=>{
						this.setState({deviceID: message_object.state.reported.data[0].deviceId})
						this.setState({currentTemp: [message_object.state.reported.data[i].temp]});
						this.setState({currentHum: [message_object.state.reported.data[i].humid]});
						this.setState({currentPM1: [message_object.state.reported.data[i].pm1]});
						this.setState({currentPM10: [message_object.state.reported.data[i].pm10]});
						this.setState({currentPM25: [message_object.state.reported.data[i].pm25]});
						this.setState({currentSound: [message_object.state.reported.data[i].sound]});
						this.setState({currentVibration: [message_object.state.reported.data[i].vib]});
						this.setState({tempDatalist: this.setDataList(this.state.tempDatalist, message_object.state.reported.data[i].temp)});
						this.setState({humDatalist: this.setDataList(this.state.humDatalist,message_object.state.reported.data[i].humid)});
						this.setState({pmDatalist: this.setDataList(this.state.pmDatalist,message_object.state.reported.data[i].pm25)});
						// ! setTimeout is a non-blocking.
					// }, i*1000);
					}, i*900);
				}
			}
			},
      error: error => console.error(error),
      // close:() => console.log('Done'),			// 'close' is not declared in definition
  });
	
			
  }
  
  setDataList(attributeDatalist: any, payloadAtrributeData: any){
		let newDatalist : any = [];
    attributeDatalist.forEach((e: any)=>{
			let currentData = e.data;
			currentData = this.addData(currentData, payloadAtrributeData);
			if(newDatalist.length > 10){
				newDatalist.shift();
			}
			newDatalist.push({name: e.name, data: currentData});
    })
		return newDatalist;
  }
	
	addData(currentData: any, payloadAttributeData: any){
		return[...currentData,  {x: new Date(), y: payloadAttributeData}];
	}
	
	handlePowerOffClick(){
		PubSub.publish('aws/things/construction_esp32/command/' + this.state.deviceID, {msg: 'OFF'});
	}
	
	render () {
		return (
			<Grid item xs={6} md={8}>
				<Box className="DeviceCard" sx={{maxWidth: 350}}>
				<Box style={{backgroundColor: '#172153',
				width: '340px', height: '45px',
				display: 'flex', flexDirection: 'row', 
				alignItems: 'center', justifyContent: 'center', gap: '95px', padding: '5px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
						<div style={{color:"white", fontWeight:"bold"}}>  {this.state.deviceID} </div>
						<div style={{color:"white", fontSize: "14px"}}> Building 21 </div>
					</div>
					<div style={{color:"lime", fontWeight:"bold"}}> Normal </div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Temperature</div>
				<Box className="tempCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={tempRadialChartOption} series={this.state.currentTemp} type="radialBar" height={120} width={80}/>
					</Box>
						<div className="LineChart">
							<RealtimeLineChart
								dataList={this.state.tempDatalist}
								range={TIME_RANGE_IN_MILLISECONDS}/>
						</div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold",color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Humidity</div>
				<Box className="humCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={humRadialChartOption} series={this.state.currentHum} type="radialBar" height={120} width={80}/>
					</Box>
						<div className="LineChart">
							<RealtimeLineChart
								dataList={this.state.humDatalist}
								range={TIME_RANGE_IN_MILLISECONDS}
								/>
						</div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold",color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Sound</div>
				<Box className="humCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={humRadialChartOption} series={this.state.currentSound} type="radialBar" height={120} width={80}/>
					</Box>
						<div className="LineChart">
							<RealtimeLineChart
								dataList={this.state.humDatalist}
								range={TIME_RANGE_IN_MILLISECONDS}
								/>
						</div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px", fontSize: "13px"}}>PM1/PM2.5/PM10</div>
				<Box className="pmCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart 
						options={multiPMsCustomAngleRadialChartOption} 
						series={[this.state.currentPM1,this.state.currentPM25,this.state.currentPM10]} 
						type="radialBar" 
						height={150} width={100}/>
					</Box>
					<div className="LineChart">
						<RealtimeLineChart
							dataList={this.state.pmDatalist}
							range={TIME_RANGE_IN_MILLISECONDS}
							/>
					</div>
				</Box>
				
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px", fontSize: "13px"}}>Horizontal/Vertical Vibration</div>
				<Box className="pmCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart 
						options={multiVibrationCustomAngleRadialChartOption} 
						series={[this.state.currentPM1,this.state.currentPM25]} 
						type="radialBar" 
						height={150} width={100}/>
					</Box>
					<div className="LineChart">
						<RealtimeLineChart
							dataList={this.state.pmDatalist}
							range={TIME_RANGE_IN_MILLISECONDS}
							/>
					</div>
				</Box>
				
				
				<Divider style={{width:'100%'}}></Divider>
				<Box className="deviceControl"
				style={{backgroundColor: 'white', width: '300px', 
				height: '45px', display: 'flex', flexDirection: 'row', 
				alignItems: 'center', justifyContent: 'center', gap: '90px'}}>
					<IconButton>
						<SettingsIcon/>
					</IconButton>
					
					<HistoryButton deviceID={this.state.deviceID}/>
					
					<Box style={{border: "1px solid #000", borderColor:"gray", borderRadius:30, overflow: "hidden", height: 30, width: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
					<IconButton onClick={this.handlePowerOffClick}>
						<PowerSettingsNewIcon/>
					</IconButton>
					</Box>
				</Box>
			</Box>
				
			</Grid>
		);
	}
}

export default DeviceCard;