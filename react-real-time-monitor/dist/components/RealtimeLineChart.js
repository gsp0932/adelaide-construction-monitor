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
import * as React from "react";
import Chart from 'react-apexcharts';
var RealtimeLineChart = /** @class */ (function (_super) {
    __extends(RealtimeLineChart, _super);
    function RealtimeLineChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: {
                chart: {
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                    animation: {
                        easing: "linear",
                        dynamicAnimation: {
                            speed: 500
                        }
                    },
                },
                tooltip: {
                    x: {
                        format: "yyyy/MM/dd HH:mm:ss.f"
                    }
                },
                xaxis: {
                    type: "datetime",
                    range: props.range,
                    labels: {
                        datetimeUTC: false // ! IMPORTANT: default is true
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val) { return val.toFixed(0); }
                    },
                }
            }
        };
        return _this;
    }
    RealtimeLineChart.prototype.render = function () {
        return (React.createElement("div", { id: "chart" },
            React.createElement(Chart, { type: "line", height: "120", width: "220", options: this.state.options, series: this.props.dataList })));
    };
    return RealtimeLineChart;
}(React.Component));
export default RealtimeLineChart;
//# sourceMappingURL=RealtimeLineChart.js.map