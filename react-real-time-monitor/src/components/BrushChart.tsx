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


class BrushChart extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {};
	}


	render() {
		return (
			<div id="wrapper">
				<div id="chart-line2">
					<ReactApexChart options={this.props.options} series={this.props.series} type="line" height={230} width={400}/>
				</div>
				<div id="chart-line">
					<ReactApexChart options={this.props.optionsLine} series={this.props.seriesLine} type="area" height={130} width={400}/>
				</div>
			</div>
		);
	}
}


export default BrushChart;
