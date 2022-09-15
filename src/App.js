import './App.css';
import React from 'react';

import { PubSub } from 'aws-amplify';
import {AwsIoT_connect} from './utils/connection';

import Clock from './components/Clock';
import RealtimeLineChart from './components/RealtimeLineChart';

// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();

// Data for testing real-time charts
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const ADDING_DATA_RATIO = 0.8;

const nameList = ["Temperature", "Humidity"]
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
      IoT_payload: ''
    }
  }
  
  
  componentDidMount(){
    // Handle MQTT payload and trigger rerendering with setstate
    let message = '';
    PubSub.subscribe('real-time-monitor').subscribe({
      next: data => 
      {console.log('Message received', data);
      message = JSON.stringify(data);
      // Comment the line below to view the full payload
      message = message.substring(message.indexOf('value')+7).slice(0,-1)
      this.setState({IoT_payload:message})
      },
      error: error => console.error(error),
      close: () => console.log('Done'),
    });
    
    // Generate testing data for Realtime Linechart    
    this.setDataTimer = setInterval(
      ()=>{this.setDataList()}, ADDING_DATA_INTERVAL_IN_MILLISECONDS
    )

  }
  
  addDataRandomly(data){
    if (Math.random() < 1 - ADDING_DATA_RATIO){
      return data;
    }

    return[
      ...data,
      {
        x: new Date(),
        y: data.length * Math.random()
      }
    ]
  }
  
  setDataList(){
    let newDatalist = []
    this.state.dataList.forEach((e)=>{
      let latestData = e.data;
      latestData = this.addDataRandomly(latestData);
      newDatalist.push({name: e.name, data: latestData})
    })
    this.setState({dataList: newDatalist})
  }
      
  
  
  
  render(){
    return (
      <div className="App">
        {/* <header className="App-header"></header> */}
          <h1>Real-time Construction Environment monitor</h1>
          <Clock />
          <a>IoT Payload: {this.state.IoT_payload}</a>
          
          <h1>Sensor 1</h1>
          <div class="linechart">
            <RealtimeLineChart
              dataList={this.state.dataList}
              range={TIME_RANGE_IN_MILLISECONDS}
              />
          </div>
          
          <h1>Sensor 2</h1>
          <div class="linechart">
            <RealtimeLineChart
              dataList={this.state.dataList}
              range={TIME_RANGE_IN_MILLISECONDS}
              />
          </div>
          
          <h1>Sensor 3</h1>
          <div class="linechart">
            <RealtimeLineChart
              dataList={this.state.dataList}
              range={TIME_RANGE_IN_MILLISECONDS}
              />
          </div>
          
      </div>
    ); 
  }
}



export default App;
