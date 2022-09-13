import './App.css';

import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import React from 'react';

Amplify.configure({
    Auth: {
    identityPoolId: 'us-west-1:0fea59b2-656a-4402-be98-25c06ce8f4f2',
    region: 'us-west-1',
    userPoolId: 'us-west-1_yO01IjJzY',
    userPoolWebClientId: '2f43dl9mnnju6oqiota4qeln9'
  }
  });

// // Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-west-1',
  aws_pubsub_endpoint: 'wss://a2zztnkycni9kh-ats.iot.us-west-1.amazonaws.com/mqtt',
}));



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      IoT_payload: ''
    }
  }
  
  tick(){
    this.timer = setInterval(
      ()=>this.setState({date: new Date()}),1000
    )
  }
  componentDidMount(){
    this.tick();
    
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
            <p>{this.state.date.toLocaleTimeString()}</p>
            <a>IoT Payload: {this.state.IoT_payload}</a>
        </div>
      ); 
    }
}

export default App;
