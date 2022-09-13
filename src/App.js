import logo from './logo.svg';
import './App.css';

import { Amplify, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';

// Amplify.configure({
//   Auth: {
//   identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
//   region: process.env.REACT_APP_REGION,
//   userPoolId: process.env.REACT_APP_USER_POOL_ID,
//   userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
// }
// });

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

PubSub.subscribe('real-time-monitor').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done'),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
