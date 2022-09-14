import './App.css';

import { PubSub } from 'aws-amplify';
import React from 'react';
// import ApexChart from './components/LineCharts';
import AChart from './components/LineCharts';
import {AwsIoT_connect} from './utils/connection';

import Clock from './components/Clock';

// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();

// Main App
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
  }
  
    render(){
      return (
        <div className="App">
          {/* <header className="App-header"></header> */}
            <h1>Construction monitor</h1>
            <Clock />
            <a>IoT Payload: {this.state.IoT_payload}</a>
            <AChart />
        </div>
      ); 
    }
}

export default App;
