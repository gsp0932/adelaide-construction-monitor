import React from 'react';
import ReactApexChart from 'react-apexcharts';
function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
};

var acoustic_data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
  min: 30,
  max: 90
});

var vibration_data = generateDayWiseTimeSeries(new Date("22 Apr 2017").getTime(), 115, {
  min: 30,
  max: 90
});

class BrushChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		
			series: [{
				name: 'Acoustic',
				data: acoustic_data,
				color: '#00FFFF'
			}, {
				name: 'Vibration',
				data: vibration_data,
				color: '#A020F0'
			}],
			options: {
				chart: {
					id: 'chart2',
					type: 'line',
					height: 230,
					toolbar: {
						autoSelected: 'pan',
						show: false
					}
				},
				colors: ['#546E7A'],
				stroke: {
					width: 3
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					opacity: 1,
				},
				markers: {
					size: 0
				},
				xaxis: {
					type: 'datetime'
				}
			},
		
			seriesLine: [{
				data: acoustic_data
			}],
			optionsLine: {
				chart: {
					id: 'chart1',
					height: 130,
					type: 'area',
					brush:{
						target: 'chart2',
						enabled: true
					},
					selection: {
						enabled: true,
						xaxis: {
							min: new Date('19 Jun 2017').getTime(),
							max: new Date('14 Aug 2017').getTime()
						}
					},
				},
				colors: ['#008FFB'],
				fill: {
					type: 'gradient',
					gradient: {
						opacityFrom: 0.91,
						opacityTo: 0.1,
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
			},
		
		
		};
	}



	render() {
		return (
			

<div id="wrapper">
<div id="chart-line2">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={230} width={400}/>
</div>
<div id="chart-line">
<ReactApexChart options={this.state.optionsLine} series={this.state.seriesLine} type="area" height={130} width={400}/>
</div>
</div>


		);
	}
}


      


export default BrushChart;
