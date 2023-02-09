import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';
import DeviceHistory from './pages/DeviceHistory';
import {Routes, Route} from  'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLFormElement);
root.render(
  // <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/DeviceHistory/:deviceID" element={<DeviceHistory/>}/>
      </Routes>
    </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();