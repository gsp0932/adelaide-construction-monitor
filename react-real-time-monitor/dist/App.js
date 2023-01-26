var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-nocheck
import './App.css';
import * as React from 'react';
import { AwsIoT_connect } from './utils/connection';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DeviceCard from './components/DeviceCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogContentText, DialogTitle, TextField, DialogActions } from '@mui/material';
// Authenticate and connect with AWS MQTT broker
AwsIoT_connect();
;
;
// Main App - Homepage
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            add_device_open: false,
            add_device_textfield_value: "",
            device_id_list: ['demo-01', 'demo_1', 'demo_2', 'demo_3']
        };
        _this.handleClickAddDevice = _this.handleClickAddDevice.bind(_this);
        _this.handleAddDeviceClose = _this.handleAddDeviceClose.bind(_this);
        _this.handleAddDeviceAdd = _this.handleAddDeviceAdd.bind(_this);
        _this.handleTextfieldChange = _this.handleTextfieldChange.bind(_this);
        return _this;
    }
    App.prototype.handleClickAddDevice = function () {
        this.setState({ add_device_open: true });
    };
    // setNewDeviceID(event){
    //   const {value} = event.target;
    //   this.setState({add_device_textfield_value: value})
    //   console.log(event.target);
    // }
    App.prototype.handleTextfieldChange = function (event) {
        this.setState({ add_device_textfield_value: event.target.value });
    };
    App.prototype.handleAddDeviceAdd = function () {
        var newList = this.state.device_id_list;
        newList.push(this.state.add_device_textfield_value);
        this.setState({
            device_id_list: newList,
            add_device_open: false
        });
        console.log(this.state.add_device_textfield_value);
    };
    App.prototype.handleAddDeviceClose = function () {
        this.setState({ add_device_open: false });
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "App" },
            React.createElement(Grid, { container: true },
                React.createElement(Box, { flexDirection: "column", justifyContent: "center", alignItems: "center" },
                    React.createElement(Box, { display: "flex", flexDirection: "row", "justify-content": "space-between", alignItems: "stretch", gap: "150px", marginTop: 5, marginBottom: 3, marginLeft: 2 },
                        React.createElement("div", { style: { fontSize: '1.3rem', fontWeight: 'bold', color: 'white', marginLeft: '20px' } }, "Device"),
                        React.createElement("div", null,
                            React.createElement(Button, { onClick: this.handleClickAddDevice, variant: 'contained', style: { backgroundColor: '#71797E', color: 'white' } }, "Add device"),
                            React.createElement(Dialog, { open: this.state.add_device_open, onClose: this.handleAddDeviceClose },
                                React.createElement(DialogTitle, null, "Add device"),
                                React.createElement(DialogContent, null,
                                    React.createElement(DialogContentText, null, "Device ID:"),
                                    React.createElement(TextField, { autoFocus: true, margin: "dense", 
                                        // label="Device ID"
                                        type: "string", variant: "standard", value: this.state.add_device_textfield_value, onChange: this.handleTextfieldChange })),
                                React.createElement(DialogActions, null,
                                    React.createElement(Button, { onClick: this.handleAddDeviceClose }, " Close "),
                                    React.createElement(Button, { onClick: this.handleAddDeviceAdd }, " Add ")))))),
                React.createElement(Grid, { container: true, spacing: 2, marginLeft: 0.5, marginBottom: 2 }, this.state.device_id_list.map(function (deviceID) {
                    return React.createElement(Grid, { item: true, key: deviceID },
                        React.createElement(Grid, { container: true, direction: "column" },
                            React.createElement(DeviceCard, { deviceID: deviceID })));
                })))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map