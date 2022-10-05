import React from 'react';
import MixedChart from '../components/MixedChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BrushChart from '../components/BrushChart';

class DeviceHistory extends React.Component {
  constructor(props){
    super(props);

  }
      
  render(){
    return (
      <Grid container spacing={2} direction="column" flexDirection="column" justifyContent="center" alignItems="center">
        <Grid item maxWidth="1000px">
          <Box direction="column" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <div style={{fontSize: '1.3rem', fontWeight:'bold', color: 'black', padding: '20px'} }>Device history</div>
            <MixedChart/>
            <BrushChart/>
          </Box>
        </Grid>
      </Grid>
    ); 
  }
}

export default DeviceHistory;