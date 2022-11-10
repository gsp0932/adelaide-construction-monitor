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

class DeviceHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      datetime_from: moment().format(),
      datetime_to: moment().format(),
      display_by: "Date-time",
      
      dynamo_history_api: "https://8tuqawfgv0.execute-api.us-west-1.amazonaws.com/history/demo-01/1668060174/1668060359",
      error: null,
      isLoaded: false,
      history_data_response: []
    }
    
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    // this.handleChangeDisplayBy = this.handleChangeDisplayBy.bind(this);
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
  
  componentDidMount(){
    fetch(this.state.dynamo_history_api)
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          history_data_response: result.Items
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
  render(){
    return (
      <Grid container spacing={2} direction="column" flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item maxWidth="1000px">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" width="400px" margin="10px">
              <BackButton/>
              <div style={{fontSize: '22px', fontWeight:'bold', color: 'black', padding: '15px', marginLeft: '5px'} }>construction_esp32</div>
              <div style={{fontSize: '17px', color: 'black', padding: '15px'} }>Building 21</div>
            </Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker label="From" 
              value={this.state.datetime_from} 
              onChange={this.handleChangeFrom} 
              renderInput={(params)=><TextField {...params}/>}
              />
            </LocalizationProvider>
            <Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker label="To" 
              value={this.state.datetime_to} 
              onChange={this.handleChangeTo} 
              renderInput={(params)=><TextField {...params}/>}
              />
            </LocalizationProvider>              
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
            <MixedChart/>
            <BrushChart/>
            <ul>
              {this.state.history_data_response.map(e => (
                <li key={e.sample_time}>
                  {JSON.stringify(e.data_temp)}
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
    ); 
  }
}

export default DeviceHistory;