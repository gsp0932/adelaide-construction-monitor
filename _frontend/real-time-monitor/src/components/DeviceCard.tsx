import * as React from 'react';
import { PubSub } from 'aws-amplify';
import {tempRadialChartOption, humRadialChartOption, soundRadialChartOption, multiPMsRadialChartOption, multiVibrationsRadialChartOption, tempRealtimeLinechartOption, multiVibrationsRealtimeLinechartOption, humRealtimeLinechartOption, soundRealtimeLinechartOption, multiPMsRealtimeLinechartOption} from './charts/ChartOptions';
import ReactApexChart from "react-apexcharts";
import ReportIcon from '@mui/icons-material/Report';
import Box from '@mui/material/Box';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography} from '@mui/material';
import { Button,Collapse, ToggleButton ,Divider, IconButton, } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import {styled} from '@mui/material/styles';
import {HistoryButton} from './buttons/HistoryButton';

import Grid from '@mui/material/Grid';
// import {flushSync} from 'react-dom';

export interface MyProps {
	deviceID: string
};

export interface MyState {
  deviceID: string,
	latestTemp: number, 
	tempDatalist: any[],
	latestHum: number, 
	humDatalist: any[],
	latestPM1: number, 
	pm1Datalist: any[],
	latestPM25: number, 
	pm25Datalist: any[],
	latestPM10: number, 
	pm10Datalist: any[],
	latestSound: number,
	soundDatalist: any[],
	latestVerticalVibration: number,
	verticalVibrationDatalist: any[],
	latestHorizontalVibration: number,
	horizontalVibrationDatalist: any[],
	IoT_payload_object: {}, IoT_device_data: {},
	warning: string,
	deviceWarningOpen: boolean
	
};
	
class DeviceCard extends React.Component <MyProps, MyState>{
	constructor(props: any){
		super(props);
		this.state = {
			deviceID: props.deviceID,
			latestTemp: 0, 
			tempDatalist: [{name: "Temperature", data: []}],
			latestHum: 0, 
			humDatalist: [{name: "Humidity", data: []}],
			latestPM1: 0, 
			pm1Datalist: [{name: "PM1", data: []}],
			latestPM10: 0,
			pm10Datalist: [{name: "PM10", data: []}],
			latestPM25: 0, 
			pm25Datalist: [{name: "PM2.5", data: []}],
			latestSound: 0,
			soundDatalist: [{name: "Sound", data: []}],
			latestHorizontalVibration: 0,
			horizontalVibrationDatalist: [{name: "Horizontal", data: []}],
			latestVerticalVibration: 0,
			verticalVibrationDatalist: [{name: "Vertical", data: []}],
      IoT_payload_object: {}, IoT_device_data: {},
			warning: "",
			deviceWarningOpen: false
    };
		
		this.handlePowerOffClick = this.handlePowerOffClick.bind(this);
		this.handleDeviceWarningClick = this.handleDeviceWarningClick.bind(this);
		this.handleDeviceWarningClose = this.handleDeviceWarningClose.bind(this);
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
			
      // Get message content and convert to object
      let message_object = JSON.parse(message.substring(message.indexOf('value')+7).slice(0,-1));
			
			// Loop through data array
			// Has to be nested inside subscribe as an asynchronous call, otherwise, won't trigger rerendering chart.
			// Push device data to each type of charts
			this.setState({IoT_payload_object:message_object});
			if(message_object.state.reported.data[0].deviceId ===  this.state.deviceID)						// !
			{
				console.log(message_object.state.reported.data[0]);
				for (let i = 0; i < message_object.state.reported.data.length; i++){
					this.setState({IoT_device_data: message_object.state.reported.data[i]});
					setTimeout(()=>{
						this.setState({deviceID: message_object.state.reported.data[0].deviceId})
						this.setState({latestTemp: message_object.state.reported.data[i].temp});
						this.setState({latestHum: message_object.state.reported.data[i].humid});
						this.setState({latestPM1: message_object.state.reported.data[i].pm1});
						this.setState({latestPM10: message_object.state.reported.data[i].pm10});
						this.setState({latestPM25: message_object.state.reported.data[i].pm25});
						this.setState({latestSound: message_object.state.reported.data[i].sound});
						this.setState({latestHorizontalVibration: message_object.state.reported.data[i].vib_h});
						this.setState({latestVerticalVibration: message_object.state.reported.data[i].vib_v});
						this.setState({tempDatalist: this.setDataList(this.state.tempDatalist, message_object.state.reported.data[i].temp)});
						this.setState({humDatalist: this.setDataList(this.state.humDatalist,message_object.state.reported.data[i].humid)});
						this.setState({soundDatalist: this.setDataList(this.state.soundDatalist,message_object.state.reported.data[i].sound)});
						this.setState({pm1Datalist: this.setDataList(this.state.pm1Datalist,message_object.state.reported.data[i].pm1)});
						this.setState({pm25Datalist: this.setDataList(this.state.pm25Datalist,message_object.state.reported.data[i].pm25)});
						this.setState({pm10Datalist: this.setDataList(this.state.pm10Datalist,message_object.state.reported.data[i].pm10)})
						this.setState({horizontalVibrationDatalist: this.setDataList(this.state.horizontalVibrationDatalist,message_object.state.reported.data[i].vib_h)})
						this.setState({verticalVibrationDatalist: this.setDataList(this.state.verticalVibrationDatalist,message_object.state.reported.data[i].vib_v)})
						// ! setTimeout is a non-blocking.
					// }, i*1000);
					}, i*900);
				}
				// console.log(this.state.IoT_device_data);
			}
			},
      error: error => console.error(error),
      // close:() => console.log('Done'),			// 'close' is not declared in definition
  });
	
		let device_warning = "aws/things/construction_esp32/shadow/alarm/warning"
		PubSub.subscribe(device_warning).subscribe({
			next: data =>{
				let message = '';
				message = JSON.stringify(data);	// get content of the MQTT body
				message = JSON.parse(message.substring(message.indexOf('value')+7).slice(0,-1)).message; // get the message from the body content
				let deviceID = message.slice(message.indexOf('Device')+7,message.indexOf(','));	// get Device ID from the message
				console.log(message);
				if(deviceID === this.state.deviceID){
					message = message.slice(message.indexOf('Device')); // cut the abundant part
					this.setState({warning: message});
				}
			},
			error: error => console.error(error),
		})
			
  }
	
  setDataList(attributeDatalist: any, payloadAtrributeData: any){
		let newDatalist : any = [];
    attributeDatalist.forEach((e: any)=>{
			let latestData = e.data;
			latestData = this.addData(latestData, payloadAtrributeData);
			if(newDatalist.length > 10){		// for performance, reducing the data stored
				newDatalist.shift();
			};
			newDatalist.push({name: e.name, data: latestData});
    })
		return newDatalist;
  }
	
	addData(latestData: any, payloadAttributeData: any){
		return[...latestData,  {x: new Date(), y: payloadAttributeData}];
	}
	
	handlePowerOffClick(){
		PubSub.publish('aws/things/construction_esp32/command/' + this.state.deviceID, {msg: 'OFF'});
	}
	
	handleDeviceWarningClick(){
		this.setState({deviceWarningOpen: true})
	}
	
	handleDeviceWarningClose(){
		this.setState({deviceWarningOpen: false, warning: ''})
	}
	
	render () {
		return (
			<Grid item xs={6} md={8}>
				<Box className="DeviceCard" sx={{maxWidth: 350}}>
				<Box style={{backgroundColor: '#172153',
				width: '340px', height: '45px',
				display: 'flex', flexDirection: 'row', 
				alignItems: 'center', justifyContent: 'space-between', padding: '2px'}}>
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px'}}>
						<div style={{color:"white", fontWeight:"bold"}}>  {this.state.deviceID} </div>
						<div style={{color:"white", fontSize: "14px"}}> Building 21 </div>
					</div>
					{(this.state.warning === "") &&
						<Box display="flex" flexDirection="row" alignItems='center'>
						<div style={{color:"lime", fontWeight:"bold", marginRight: "10px", }}> Normal </div>
							<IconButton onClick={this.handleDeviceWarningClick}>
								<ReportIcon sx={{color: 'yellow', fontSize: '30px', opacity: '0'}} />
							</IconButton>
						</Box>
					}
					{(this.state.warning !== "") &&
						<Box display="flex" flexDirection="row" alignItems='center'>
							<div style={{color:"red", fontWeight:"bold", marginRight: "10px", }}> Bad </div>
								<div>
									<IconButton onClick={this.handleDeviceWarningClick}>
										<ReportIcon sx={{color: 'yellow', fontSize: '30px'}} />
									</IconButton>
									<Dialog open={this.state.deviceWarningOpen} onClose={this.handleDeviceWarningClose}>
										<DialogTitle>
											Warning
										</DialogTitle>
										<DialogContent>
											<Typography
												variant="body1"
												style={{whiteSpace:'pre-wrap'}}>
												{this.state.warning}
											</Typography>
										</DialogContent>
										<DialogActions>
											<Button onClick={this.handleDeviceWarningClose}> Close </Button>
										</DialogActions>
									</Dialog>
								</div>
						</Box>
					}
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Temperature</div>
				<Box className="tempCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={tempRadialChartOption} series={[this.state.latestTemp]} type="radialBar" height={130} width={110}/>
					</Box>
						<div className="LineChart">
							<ReactApexChart
								options={tempRealtimeLinechartOption}
								height={120}
								width={220}
								series={this.state.tempDatalist}
							/>
						</div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold",color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Humidity</div>
				<Box className="humCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={humRadialChartOption} series={[this.state.latestHum]} type="radialBar" height={130} width={110}/>
					</Box>
						<div className="LineChart">
							<ReactApexChart
								options={humRealtimeLinechartOption}
								height={120}
								width={220}
								series={this.state.humDatalist}
							/>
						</div>
				</Box>
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold",color:"#454545", marginTop:"7px", marginBottom:"2px"}}> Sound</div>
				<Box className="humCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart options={soundRadialChartOption} series={[this.state.latestSound]} type="radialBar" height={130} width={110}/>
					</Box>
						<div className="LineChart">
						<ReactApexChart
								options={soundRealtimeLinechartOption}
								height={120}
								width={220}
								series={this.state.soundDatalist}
								/>
						</div>
				</Box>

				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px", fontSize: "13px"}}>PM1 / PM2.5 / PM10</div>
				<Box className="pmCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart 
						options={multiPMsRadialChartOption} 
						series={[this.state.latestPM1,this.state.latestPM25, this.state.latestPM10]} 
						type="radialBar" 
						height={150} width={110}/>
					</Box>
					<div className="LineChart">
						<ReactApexChart
							options={multiPMsRealtimeLinechartOption}
							height={120}
							width={220}
							series={[ this.state.pm1Datalist[0],this.state.pm25Datalist[0], this.state.pm10Datalist[0]]}
						/>
					</div>
				</Box>
				
				
				<Divider style={{width:'100%'}}></Divider>
				<div style={{fontWeight:"bold", color:"#454545", marginTop:"7px", marginBottom:"2px", fontSize: "13px"}}>Horizontal / Vertical Vibration</div>
				<Box className="pmCharts" display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end" marginBottom="5px">
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
						<ReactApexChart 
						options={multiVibrationsRadialChartOption} 
						series={[this.state.latestHorizontalVibration, this.state.latestVerticalVibration]} 
						type="radialBar" 
						height={150} width={110}/>
					</Box>
					<div className="LineChart">
						<ReactApexChart
							options={multiVibrationsRealtimeLinechartOption}
							height={120}
							width={220}
							series={[this.state.verticalVibrationDatalist[0], this.state.horizontalVibrationDatalist[0]]}
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