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
import * as React from 'react';
import ReactApexChart from 'react-apexcharts';
// function generateDayWiseTimeSeries(baseval, count, yrange) {
//   var i = 0;
//   let series: any = [];
//   while (i < count) {
//     var x = baseval;
//     var y =
//       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
//     series.push([x, y]);
//     baseval += 86400000;
//     i++;
//   }
//   return series;
// };
// var acoustic_data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
//   min: 30,
//   max: 90
// });
// var vibration_data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
//   min: 30,
//   max: 90
// });
var BrushChart = /** @class */ (function (_super) {
    __extends(BrushChart, _super);
    function BrushChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    BrushChart.prototype.render = function () {
        return (React.createElement("div", { id: "wrapper" },
            React.createElement("div", { id: "chart-line2" },
                React.createElement(ReactApexChart, { options: this.props.options, series: this.props.series, type: "line", height: 230, width: 400 })),
            React.createElement("div", { id: "chart-line" },
                React.createElement(ReactApexChart, { options: this.props.optionsLine, series: this.props.seriesLine, type: "area", height: 130, width: 400 }))));
    };
    return BrushChart;
}(React.Component));
export default BrushChart;
//# sourceMappingURL=BrushChart.js.map