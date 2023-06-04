import * as ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {HashRouter} from 'react-router-dom';
import {Routes, Route} from  'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Devices from './pages/AllDevices';
import DeviceHistory from './pages/DeviceHistory';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLFormElement);
root.render(
  // <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<SignIn/>}/> */}
        <Route path="/" element={<Devices/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        {/* <Route path="/Devices" element={<Devices/>}/> */}
        <Route path="/DeviceHistory/:deviceID" element={<DeviceHistory/>}/>
      </Routes>
    </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
