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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
// import MixedChart from '../components/MixedChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BrushChart from '../components/BrushChart';
import { BackButton } from '../components/BackButton';
import * as moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import Select from '@mui/material/Select';
// import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { vibAndSoundBrushOption, tempHumPMBrushOption } from '../components/ChartOptions';
import { useParams } from "react-router";
var DeviceHistory = /** @class */ (function (_super) {
    __extends(DeviceHistory, _super);
    function DeviceHistory(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            datetime_from: moment().unix(),
            datetime_to: moment().unix(),
            display_by: "Date-time",
            deviceid: _this.props.params.deviceid,
            dynamo_history_api_request: "https://8tuqawfgv0.execute-api.us-west-1.amazonaws.com/history/"
                +
                    _this.props.params.deviceid
                // + "/" 
                // + "1670220412"
                // + "/" 
                // + "1670221447"
                // All use millisecond
                + "/"
                + (moment().unix() - 14 * 24 * 60 * 60) // Back to 2 weeks
                + "/"
                + moment().unix(),
            error: null,
            isLoaded: false,
            testCounter: 0,
            propsTempHumPM: {
                series: [{
                        name: 'Temperature (C)',
                        data: [],
                    },
                    {
                        name: 'Humidity (%)',
                        data: [],
                    },
                    {
                        name: 'PM25 (mm)',
                        data: [],
                    }],
                seriesLine: [{
                        data: [],
                    }],
                options: tempHumPMBrushOption.options,
                optionsLine: tempHumPMBrushOption.optionsLine
            },
            propsVibAndSound: {
                series: [{
                        name: 'Acoustic (-dB)',
                        data: [],
                    },
                    {
                        name: 'Vibration (hz)',
                        data: [],
                    }],
                seriesLine: [{
                        data: [],
                    }],
                options: vibAndSoundBrushOption.options,
                optionsLine: vibAndSoundBrushOption.optionsLine
            }
        };
        _this.handleChangeFrom = _this.handleChangeFrom.bind(_this);
        _this.handleChangeTo = _this.handleChangeTo.bind(_this);
        return _this;
    }
    DeviceHistory.prototype.handleChangeFrom = function (new_datetime_from) {
        this.setState({ datetime_from: new_datetime_from });
    };
    DeviceHistory.prototype.handleChangeTo = function (new_datetime_to) {
        this.setState({ datetime_to: new_datetime_to });
    };
    // handleChangeDisplayBy(event){
    //   this.setState({display_by: event.target.value})
    // }
    DeviceHistory.prototype.setAttributeSeries = function (history_data_items) {
        var temp_series = [];
        var humid_series = [];
        var pm25_series = [];
        var vib_series = [];
        var sound_series = [];
        var max_timestamp = 0;
        var min_timestamp = 0;
        history_data_items.forEach(function (e) {
            var timestamp = new Date(parseInt(JSON.stringify(e.sample_time).slice(6, -2)) * 1000).getTime();
            if (timestamp > max_timestamp) {
                max_timestamp = timestamp;
            }
            if (min_timestamp === 0 || timestamp < min_timestamp) {
                min_timestamp = timestamp;
            }
            temp_series.push([timestamp, parseInt(JSON.stringify(e.data_temp).slice(6, -2))]);
            humid_series.push([timestamp, parseInt(JSON.stringify(e.data_humid).slice(6, -2))]);
            pm25_series.push([timestamp, parseInt(JSON.stringify(e.data_pm25).slice(6, -2))]);
            vib_series.push([timestamp, parseInt(JSON.stringify(e.data_vib).slice(6, -2))]);
            sound_series.push([timestamp, parseInt(JSON.stringify(e.data_vib).slice(6, -2))]);
        });
        this.setState({
            datetime_from: min_timestamp / 1000,
            datetime_to: max_timestamp / 1000,
            propsTempHumPM: {
                series: [{
                        name: 'Temperature (C)',
                        data: temp_series,
                        type: 'column'
                    },
                    {
                        name: 'Humidity (%)',
                        data: humid_series,
                        // type: 'column'
                    },
                    {
                        name: 'PM25 (mm)',
                        data: pm25_series,
                    }],
                seriesLine: [{
                        data: temp_series,
                    }],
                options: tempHumPMBrushOption.options,
                optionsLine: {
                    chart: {
                        id: 'chart1',
                        height: 130,
                        type: 'area',
                        brush: {
                            target: 'chart2',
                            enabled: true
                        },
                        selection: {
                            enabled: true,
                            xaxis: {
                                // The apexchart use milliseconds format
                                // THE SELECTED ZONE HAVE TO BE INSIDE THE RETURNED DATA TIMEFRAME TO PREVENT UNDESIRED DISPLAY
                                min: min_timestamp,
                                max: max_timestamp
                            }
                        },
                    },
                    colors: ['#FF5349'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            opacityFrom: 0.91,
                            opacityTo: 0.1
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        tooltip: {
                            enabled: false
                        }
                    },
                    yaxis: {
                        tickAmount: 2
                    }
                }
            },
            propsVibAndSound: {
                series: [{
                        name: 'Acoustic (-dB)',
                        data: vib_series,
                        type: 'column'
                    },
                    {
                        name: 'Vibration (hz)',
                        data: sound_series,
                    }],
                seriesLine: [{
                        data: vib_series,
                    }],
                options: vibAndSoundBrushOption.options,
                optionsLine: {
                    chart: {
                        id: 'chart3',
                        height: 130,
                        type: 'area',
                        brush: {
                            target: 'chart4',
                            enabled: true
                        },
                        selection: {
                            enabled: true,
                            xaxis: {
                                min: min_timestamp,
                                max: max_timestamp
                            }
                        },
                    },
                    colors: ['#00FFFF'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                            opacityFrom: 0.91,
                            opacityTo: 0.1
                        }
                    },
                    xaxis: {
                        type: 'datetime',
                        tooltip: {
                            enabled: false
                        }
                    },
                    yaxis: {
                        tickAmount: 2
                    }
                }
            },
        });
    };
    DeviceHistory.prototype.componentDidMount = function () {
        var _this = this;
        fetch(this.state.dynamo_history_api_request)
            .then(function (response) { return response.json(); })
            .then(function (result) {
            _this.setAttributeSeries(result.Items);
        }, function (error) {
            _this.setState({
                isLoaded: true,
                error: error
            });
            console.log(error);
        });
    };
    DeviceHistory.prototype.render = function () {
        return (React.createElement(Grid, { container: true, spacing: 2, direction: "column", flexDirection: "column", justifyContent: "center", alignItems: "center" },
            React.createElement(Grid, { item: true, maxWidth: "1000px" },
                React.createElement(Box, { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
                    React.createElement(Box, { display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "400px", margin: "10px" },
                        React.createElement(BackButton, null),
                        React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: 'black', padding: '15px', marginLeft: '5px' } }, this.state.deviceid),
                        React.createElement("div", { style: { fontSize: '17px', color: 'black', padding: '15px' } }, "Building 21")),
                    React.createElement(Box, { display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
                        React.createElement(Box, { maxWidth: 180 },
                            React.createElement(LocalizationProvider, { dateAdapter: AdapterMoment },
                                React.createElement(DateTimePicker, { label: "From", value: moment.unix(this.state.datetime_from).format(), onChange: this.handleChangeFrom, renderInput: function (params) { return React.createElement(TextField, __assign({}, params)); }, ampm: false }))),
                        React.createElement(Box, { maxWidth: 180 },
                            React.createElement(LocalizationProvider, { dateAdapter: AdapterMoment },
                                React.createElement(DateTimePicker, { label: "To", value: moment.unix(this.state.datetime_to).format(), onChange: this.handleChangeTo, renderInput: function (params) { return React.createElement(TextField, __assign({}, params)); }, ampm: false })))),
                    React.createElement(Box, null,
                        React.createElement(BrushChart, __assign({}, this.state.propsTempHumPM))),
                    React.createElement(Box, null,
                        React.createElement(BrushChart, __assign({}, this.state.propsVibAndSound)))))));
    };
    return DeviceHistory;
}(React.Component));
export default (function (props) { return ( // ?
React.createElement(DeviceHistory, __assign({}, props, { params: useParams() }))); });
//# sourceMappingURL=DeviceHistory.js.map