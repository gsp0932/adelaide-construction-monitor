import * as React from 'react';
// import MixedChart from '../components/MixedChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BrushChart from '../components/charts/BrushChart';
import { BackButton } from '../components/buttons/BackButton';

import moment from 'moment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import {vibAndSoundBrushOption, tempHumPMBrushOption} from '../components/charts/ChartOptions';

import {useParams} from "react-router";     // for passing argument deviceID

class DeviceHistory extends React.Component <any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      datetime_from: moment().unix()-7*24*60*60,
      datetime_to: moment().unix(),
      display_by: "Date-time",
      
      deviceID: this.props.params.deviceID,     // get deviceID from device card
      
      dynamo_history_api_request: 
      "https://8tuqawfgv0.execute-api.us-west-1.amazonaws.com/history/"
      +
      this.props.params.deviceID
      // + "/" 
      // + "1675697737"
      // + "/" 
      // + "1675697752"
      
      // moment().unix() is in seconds, while apexcharts use milliseconds
      + "/" 
      + (moment().unix()-7*24*60*60)           // Latest 1 week data
      + "/" 
      + (moment().unix())
      
      ,
      error: null,
      isLoaded: false,
      
      propsTempHumPM: {
        series: [{
          name: 'Temperature (C)',
          data: [],
        },
        {
          name: 'Humidity (%)',
          data: [],
        },
        {
          name: 'PM25 (mm)',
          data: [],
        }],
        seriesLine: [{
          data: [],
        }],
        options: tempHumPMBrushOption.options,
        optionsLine: tempHumPMBrushOption.optionsLine
      },
      propsVibAndSound: {
        series: [{
          name: 'Acoustic (-dB)',
          data: [],
        },
        {
          name: 'Vibration (hz)',
          data: [],
        }],
        seriesLine: [{
          data: [],
        }],
        options: vibAndSoundBrushOption.options,
        optionsLine: vibAndSoundBrushOption.optionsLine
      }
    }
    
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
  }

  // Handle datetime changes
  handleChangeFrom(new_datetime_from: any){
    this.setState({datetime_from: new_datetime_from});
  }
  handleChangeTo(new_datetime_to: any){
    this.setState({datetime_to: new_datetime_to});
  }
  
  setAttributesSeries(history_data_items: any){
    let temp_series: any = [];
    let humid_series: any = [];
    let pm25_series: any = [];
    let vib_series: any = [];
    let sound_series: any = [];
    
    let max_timestamp = 0;    // For identifying last datetime in query result
    let min_timestamp = 0;    // For identifying first datetime in query result
    
    if(history_data_items.length > 0){
      history_data_items.forEach((e: any)=>{
        let timestamp = new Date(parseInt(JSON.stringify(e.sample_time).slice(6, -2))*1000).getTime();
        
        // Identify the min and max timestamps from the query result
        if (timestamp > max_timestamp){
          max_timestamp = timestamp;
        }
        if (min_timestamp === 0 || timestamp < min_timestamp){
          min_timestamp = timestamp;
        }
        
        temp_series.push([timestamp, parseInt(JSON.stringify(e.data_temp).slice(6,-2))]);
        humid_series.push([timestamp, parseInt(JSON.stringify(e.data_humid).slice(6,-2))]);
        pm25_series.push([timestamp, parseInt(JSON.stringify(e.data_pm25).slice(6,-2))]);
        vib_series.push([timestamp, parseInt(JSON.stringify(e.data_vib).slice(6,-2))]);
        sound_series.push([timestamp, parseInt(JSON.stringify(e.data_vib).slice(6,-2))]);
      });
    }
    
    // Fill lower bound
    if(min_timestamp > this.state.datetime_from || history_data_items.length === 0){
      temp_series.unshift([this.state.datetime_from*1000, 0]);
      humid_series.unshift([this.state.datetime_from*1000, 0]);
      pm25_series.unshift([this.state.datetime_from*1000, 0]);
      vib_series.unshift([this.state.datetime_from*1000, 0]);
      sound_series.unshift([this.state.datetime_from*1000, 0]);
    }
    
    // Fill upper bound
    if(max_timestamp < this.state.datetime_to || history_data_items.length === 0){
      temp_series.push([this.state.datetime_to*1000, 0]);
      humid_series.push([this.state.datetime_to*1000, 0]);
      pm25_series.push([this.state.datetime_to*1000, 0]);
      vib_series.push([this.state.datetime_to*1000, 0]);
      sound_series.push([this.state.datetime_to*1000, 0]);
    }
    
    
    this.setState({
      propsTempHumPM: {
        series: [{
          name: 'Temperature (C)',
          data: temp_series,
          type: 'column'
        },
        {
          name: 'Humidity (%)',
          data: humid_series,
          // type: 'column'
        },
        {
          name: 'PM25 (mm)',
          data: pm25_series,
        }],
        seriesLine: [{
          data: temp_series,
        }],
        options: tempHumPMBrushOption.options,
        optionsLine: {
          chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush: {
              target: 'chart2',
              enabled: true
            },
            selection: {
              enabled: true,
              xaxis: {
                // The apexchart use milliseconds format
                // THE SELECTED ZONE HAVE TO BE INSIDE THE RETURNED DATA TIMEFRAME TO PREVENT UNDESIRED DISPLAY
                min: min_timestamp,
                max: max_timestamp
              }
            },
          },
          colors: ['#FF5349'],
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.91,
              opacityTo: 0.1
            }
          },
          xaxis: {
            type: 'datetime',
            tooltip: {
              enabled: false
            }
          },
          yaxis: {
            tickAmount: 2
          }
        }
      },
      propsVibAndSound: {
        series: [{
          name: 'Acoustic (-dB)',
          data: vib_series,
          type: 'column'
        },
        {
          name: 'Vibration (hz)',
          data: sound_series,
        }],
        seriesLine: [{
          data: vib_series,
        }],
        options: vibAndSoundBrushOption.options,
        optionsLine: {
          chart: {
            id: 'chart3',
            height: 130,
            type: 'area',
            brush: {
              target: 'chart4',
              enabled: true
            },
            selection: {
              enabled: true,
              xaxis: {
                min: min_timestamp,
                max: max_timestamp
              }
            },
          },
          colors: ['#00FFFF'],
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.91,
              opacityTo: 0.1
            }
          },
          xaxis: {
            type: 'datetime',
            tooltip: {
              enabled: false
            }
          },
          yaxis: {
            tickAmount: 2
          }
        }
      },
    });
  }
  
  componentDidMount(){
    // Break long-duration query to multiple queries and then merge as Lambda limits payload size
    if((this.state.datetime_to - this.state.datetime_from) > (60*60*24) ){
      let merged_history_data_items: any = [];
      let e = this.state.datetime_from;
      
      while(e <= this.state.datetime_to - (this.state.datetime_to - this.state.datetime_from) % (60*60*24))
      {
        
        let uri = "https://8tuqawfgv0.execute-api.us-west-1.amazonaws.com/history/"
        + this.state.deviceID
        + "/" 
        + e
        + "/" 
        + (e + 60*60*24);
        
        fetch(uri)
        .then(response => response.json())
        .then(
          (result) => {
            result.Items.forEach((e: any)=>{
              merged_history_data_items.push(e);
            })
            this.setAttributesSeries(merged_history_data_items);       // ! Position
            console.log(merged_history_data_items.length);            // ! Debug
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
            console.log(error);
          }
        );
        
        e = e + 60*60*24;
      };
      
      
    } else {
      fetch(this.state.dynamo_history_api_request)
      .then(response => response.json())
      .then(
        (result) => {
          this.setAttributesSeries(result.Items);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log(error);
        }
      );
    }
    
  }
  
  render(){
    return (
      <Grid container spacing={2} direction="column" flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item maxWidth="1000px">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" width="400px" margin="10px">
              <BackButton/>
              <div style={{fontSize: '22px', fontWeight:'bold', color: 'black', padding: '15px', marginLeft: '5px'} }>
                {this.state.deviceID}
              </div>
              <div style={{fontSize: '17px', color: 'black', padding: '15px'} }>Building 21</div>
            </Box >
            
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
              <Box maxWidth={180}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker label="From"
                  value={moment.unix(this.state.datetime_from).format()}                // NOT USING CUSTOM FORMAT TO PREVENT UNCONSISTENT DISPLAY BETWEEN DEVICES
                  onChange={this.handleChangeFrom} 
                  renderInput={(params)=><TextField {...params}/>}
                  ampm={false}
                  />
                </LocalizationProvider>
              </Box>
            
              <Box maxWidth={180}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker label="To" 
                  value={moment.unix(this.state.datetime_to).format()} 
                  onChange={this.handleChangeTo} 
                  renderInput={(params)=><TextField {...params}/>}
                  ampm={false}
                  />
                </LocalizationProvider>              
              </Box>

            </Box>
            
            <Box>
              <BrushChart  {...this.state.propsTempHumPM}/>
            </Box>
            <Box>
              <BrushChart  {...this.state.propsVibAndSound}/>
            </Box>
            
          </Box>
        </Grid>
      </Grid>
    ); 
  }
}

export default (props: any) => (           // !
  <DeviceHistory 
  {...props}
  params={useParams()}
  />
);