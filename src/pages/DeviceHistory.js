import React from 'react';
import MixedChart from '../components/MixedChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BrushChart from '../components/BrushChart';
import { BackButton } from '../components/BackButton';

class DeviceHistory extends React.Component {
  constructor(props){
    super(props);

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
            <MixedChart/>
            <BrushChart/>
          </Box>
        </Grid>
      </Grid>
    ); 
  }
}

export default DeviceHistory;