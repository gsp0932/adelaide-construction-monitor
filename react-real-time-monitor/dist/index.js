import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import DeviceHistory from './pages/DeviceHistory';
import { Routes, Route } from 'react-router-dom';
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// <React.StrictMode>
React.createElement(HashRouter, null,
    React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(App, null) }),
        React.createElement(Route, { path: "/DeviceHistory/:deviceid", element: React.createElement(DeviceHistory, null) })))
// </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//# sourceMappingURL=index.js.map