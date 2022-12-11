import React from 'react';
import MixedChart from '../components/MixedChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BrushChart from '../components/BrushChart';
import { BackButton } from '../components/BackButton';

import moment from 'moment';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

import {vibAndSoundBrushOption, tempHumPMBrushOption} from '../components/ChartOptions';

import {useParams} from "react-router";

class DeviceHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      datetime_from: moment().unix(),
      datetime_to: moment().unix(),
      display_by: "Date-time",
      
      deviceid: this.props.params.deviceid,     // get deviceid from url
      
      dynamo_history_api_request: 
      "https://8tuqawfgv0.execute-api.us-west-1.amazonaws.com/history/"
      +
      this.props.params.deviceid
      // + "/" 
      // + "1670220412"
      // + "/" 
      // + "1670221447"
      
      // All use millisecond
      + "/" 
      + (moment().unix()-14*24*60*60) // Back to 2 weeks
      + "/" 
      + moment().unix()
      
      ,
      error: null,
      isLoaded: false,
      
      testCounter: 0,
      
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
  
  
  handleChangeFrom(new_datetime_from){
    this.setState({datetime_from: new_datetime_from});
  }
  
  handleChangeTo(new_datetime_to){
    this.setState({datetime_to: new_datetime_to});
  }
  // handleChangeDisplayBy(event){
  //   this.setState({display_by: event.target.value})
  // }
  
  setAttributeSeries(history_data_items){
    let temp_series = [];
    let humid_series = [];
    let pm25_series = [];
    let vib_series = [];
    let sound_series = [];
    let max_timestamp = 0;
    let min_timestamp = 0;
    history_data_items.forEach((e)=>{
      let timestamp = new Date(parseInt(JSON.stringify(e.sample_time).slice(6, -2))*1000).getTime();
      
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
    
    
    this.setState({
      datetime_from: min_timestamp/1000,
      datetime_to: max_timestamp/1000,
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
    
    fetch(this.state.dynamo_history_api_request)
    .then(response => response.json())
    .then(
      (result) => {
        this.setAttributeSeries(result.Items);
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
  
  render(){
    return (
      <Grid container spacing={2} direction="column" flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item maxWidth="1000px">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" width="400px" margin="10px">
              <BackButton/>
              <div style={{fontSize: '22px', fontWeight:'bold', color: 'black', padding: '15px', marginLeft: '5px'} }>
                {this.state.deviceid}
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
              {/* <FormControl fullWidth>
                <InputLabel>Display by</InputLabel>
                <Select
                  value={this.state.display_by}
                  label="Display by"
                  onChange={this.handleChangeDisplayBy}
                >
                  <MenuItem value={"Year"}>Year</MenuItem>
                  <MenuItem value={"Month"}>Month</MenuItem>
                  <MenuItem value={"Date"}>Date</MenuItem>
                  <MenuItem value={"Date-time"}>Date-time</MenuItem>
                </Select>
              </FormControl> */}
            </Box>
            
            {/* <MixedChart/> */}
            
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

export default (props) => (           // ? Explanation ?
  <DeviceHistory 
  {...props}
  params={useParams()}
  />
);