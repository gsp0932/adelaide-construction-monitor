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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { PubSub } from 'aws-amplify';
import RealtimeLineChart from './RealtimeLineChart';
import { tempRadialChartOption, humRadialChartOption, pmRadialChartOption, soundRadialStroke, vibrationRadialStroke } from './ChartOptions';
import ReactApexChart from "react-apexcharts";
import Box from '@mui/material/Box';
import { 
// Button, 
// Collapse, 
// ToggleButton ,
Divider, IconButton, } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import {styled} from '@mui/material/styles';
import { HistoryButton } from './HistoryButton';
import Grid from '@mui/material/Grid';
// import {flushSync} from 'react-dom';
// Time range real-time chart
var TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
;
;
var DeviceCard = /** @class */ (function (_super) {
    __extends(DeviceCard, _super);
    function DeviceCard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            deviceID: props.deviceID,
            currentTemp: [0],
            tempDatalist: [{ name: "Temperature", data: [] }],
            currentHum: [0],
            humDatalist: [{ name: "Humidity", data: [] }],
            currentPM25: [0],
            pmDatalist: [{ name: "PM2.5", data: [] }],
            currentSound: [0],
            currentVibration: [0],
            IoT_payload_object: {}, IoT_device_data: {},
            TempExpanded: true, HumExpanded: true, PM25Expanded: true, SoundExpanded: true
        };
        // this.handleTempExpandClick = this.handleTempExpandClick.bind(this);
        // this.handleHumExpandClick = this.handleHumExpandClick.bind(this);
        // this.handlePMExpandClick = this.handlePMExpandClick.bind(this);
        // this.handleSoundExpandClick = this.handleSoundExpandClick.bind(this);
        _this.handlePowerOffClick = _this.handlePowerOffClick.bind(_this);
        return _this;
    }
    DeviceCard.prototype.componentDidMount = function () {
        var _this = this;
        // Handle MQTT payload and trigger rerendering with setstate
        // let device_data_publish = "aws/things/" +  "construction_esp32" + "/shadow/update" + "/"+ this.state.deviceID
        var device_data_publish = "aws/things/" + "construction_esp32" + "/shadow/update";
        PubSub.subscribe(device_data_publish).subscribe({
            next: function (data) {
                // Convert packet to string
                var message = '';
                message = JSON.stringify(data);
                // Grep message content and convert to object
                var message_object = JSON.parse(message.substring(message.indexOf('value') + 7).slice(0, -1));
                // Loop through data array
                // Has to be nested inside subscribe as an asynchronous call, otherwise, won't trigger rerendering chart.
                // Push device data to each type of charts
                _this.setState({ IoT_payload_object: message_object });
                if (message_object.state.reported.data[0].deviceId === _this.state.deviceID) // !
                 {
                    var _loop_1 = function (i) {
                        _this.setState({ IoT_device_data: message_object.state.reported.data[i] });
                        setTimeout(function () {
                            _this.setState({ deviceID: message_object.state.reported.data[0].deviceId });
                            _this.setState({ currentTemp: [message_object.state.reported.data[i].temp] });
                            _this.setState({ currentHum: [message_object.state.reported.data[i].humid] });
                            _this.setState({ currentPM25: [message_object.state.reported.data[i].pm25] });
                            _this.setState({ currentSound: [message_object.state.reported.data[i].sound] });
                            _this.setState({ currentVibration: [message_object.state.reported.data[i].vib] });
                            _this.setState({ tempDatalist: _this.setDataList(_this.state.tempDatalist, message_object.state.reported.data[i].temp) });
                            _this.setState({ humDatalist: _this.setDataList(_this.state.humDatalist, message_object.state.reported.data[i].humid) });
                            _this.setState({ pmDatalist: _this.setDataList(_this.state.pmDatalist, message_object.state.reported.data[i].pm25) });
                            // The line below is really important. setTimeout is a non-blocking.
                            // }, i*1000);
                        }, i * 900);
                    };
                    for (var i = 0; i < message_object.state.reported.data.length; i++) {
                        _loop_1(i);
                    }
                    console.log(message_object);
                }
            },
            error: function (error) { return console.error(error); },
            // close:() => console.log('Done'),			// 'close' is not declared in definition
        });
    };
    DeviceCard.prototype.setDataList = function (attributeDatalist, payloadAtrributeData) {
        var _this = this;
        var newDatalist = [];
        attributeDatalist.forEach(function (e) {
            var currentData = e.data;
            currentData = _this.addData(currentData, payloadAtrributeData);
            newDatalist.push({ name: e.name, data: currentData });
        });
        return newDatalist;
    };
    DeviceCard.prototype.addData = function (currentData, payloadAttributeData) {
        return __spreadArray(__spreadArray([], currentData, true), [{ x: new Date(), y: payloadAttributeData }], false);
    };
    DeviceCard.prototype.handlePowerOffClick = function () {
        PubSub.publish('aws/things/construction_esp32/command/' + this.state.deviceID, { msg: 'OFF' });
    };
    // handleTempExpandClick(){this.setState(prevState => ({TempExpanded: !prevState.TempExpanded}));}
    // handleHumExpandClick(){this.setState(prevState => ({HumExpanded: !prevState.HumExpanded}));}
    // handlePMExpandClick(){this.setState(prevState => ({PM25Expanded: !prevState.PM25Expanded}));}
    // handleSoundExpandClick(){this.setState(prevState => ({SoundExpanded: !prevState.SoundExpanded}));}
    DeviceCard.prototype.render = function () {
        return (React.createElement(Grid, { item: true, xs: 6, md: 8 },
            React.createElement(Box, { className: "DeviceCard", sx: { maxWidth: 350 } },
                React.createElement(Box, { style: { backgroundColor: '#172153',
                        width: '340px', height: '45px',
                        display: 'flex', flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center', gap: '95px', padding: '5px' } },
                    React.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                        React.createElement("div", { style: { color: "white", fontWeight: "bold" } },
                            "  ",
                            this.state.deviceID,
                            " "),
                        React.createElement("div", { style: { color: "white", fontSize: "14px" } }, " Building 21 ")),
                    React.createElement("div", { style: { color: "lime", fontWeight: "bold" } }, " Normal ")),
                React.createElement(Divider, { style: { width: '100%' } }),
                React.createElement(Box, { className: "tempCharts", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", marginBottom: "5px" },
                    React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
                        React.createElement("div", { style: { fontWeight: "bold", color: "#454545", marginTop: "7px", marginBottom: "2px" } }, " Temperature"),
                        React.createElement(ReactApexChart, { options: tempRadialChartOption, series: this.state.currentTemp, type: "radialBar", height: 120, width: 80 })),
                    React.createElement("div", { className: "LineChart" },
                        React.createElement(RealtimeLineChart, { dataList: this.state.tempDatalist, range: TIME_RANGE_IN_MILLISECONDS }))),
                React.createElement(Divider, { style: { width: '100%' } }),
                React.createElement(Box, { className: "humCharts", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", marginBottom: "5px" },
                    React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
                        React.createElement("div", { style: { fontWeight: "bold", color: "#454545", marginTop: "7px", marginBottom: "2px" } }, " Humidity"),
                        React.createElement(ReactApexChart, { options: humRadialChartOption, series: this.state.currentHum, type: "radialBar", height: 120, width: 80 })),
                    React.createElement("div", { className: "LineChart" },
                        React.createElement(RealtimeLineChart, { dataList: this.state.humDatalist, range: TIME_RANGE_IN_MILLISECONDS }))),
                React.createElement(Divider, { style: { width: '100%' } }),
                React.createElement(Box, { className: "pm25Charts", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", marginBottom: "5px" },
                    React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
                        React.createElement("div", { style: { fontWeight: "bold", color: "#454545", marginTop: "7px", marginBottom: "2px" } }, "PM2.5"),
                        React.createElement(ReactApexChart, { options: pmRadialChartOption, series: this.state.currentPM25, type: "radialBar", height: 120, width: 80 })),
                    React.createElement("div", { className: "LineChart" },
                        React.createElement(RealtimeLineChart, { dataList: this.state.pmDatalist, range: TIME_RANGE_IN_MILLISECONDS }))),
                React.createElement(Divider, { style: { width: '100%' } }),
                React.createElement(Box, { className: "soundAndVibChart", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", gap: "15px" },
                    React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" },
                        React.createElement("div", { style: { fontWeight: "bold", color: "#454545", marginTop: "7px" } }, "Acoustic"),
                        React.createElement(Box, { maxHeight: "90px", overflow: "hidden" },
                            React.createElement(ReactApexChart, { options: soundRadialStroke, series: this.state.currentSound, type: "radialBar", height: 220, width: 150 }))),
                    React.createElement(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" },
                        React.createElement("div", { style: { fontWeight: "bold", color: "#454545", marginTop: "7px" } }, "Vibration"),
                        React.createElement(Box, { maxHeight: "90px", overflow: "hidden" },
                            React.createElement(ReactApexChart, { options: vibrationRadialStroke, series: this.state.currentVibration, type: "radialBar", height: 220, width: 150 })))),
                React.createElement(Divider, { style: { width: '100%' } }),
                React.createElement(Box, { className: "deviceControl", style: { backgroundColor: 'white', width: '300px',
                        height: '45px', display: 'flex', flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center', gap: '90px' } },
                    React.createElement(IconButton, null,
                        React.createElement(SettingsIcon, null)),
                    React.createElement(HistoryButton, { deviceID: this.state.deviceID }),
                    React.createElement(Box, { style: { border: "1px solid #000", borderColor: "gray", borderRadius: 30, overflow: "hidden", height: 30, width: 30, display: "flex", alignItems: "center", justifyContent: "center" } },
                        React.createElement(IconButton, { onClick: this.handlePowerOffClick },
                            React.createElement(PowerSettingsNewIcon, null)))))));
    };
    return DeviceCard;
}(React.Component));
export default DeviceCard;
//# sourceMappingURL=DeviceCard.js.map