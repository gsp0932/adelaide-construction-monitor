import React from "react";
import Chart from 'react-apexcharts';

class RealtimeLineChart extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			options: {
				chart: {
					zoom: {
						enabled: true
					},
					animation:{
						easing: "linear",
						dynamicAnimation: {
							speed: 500
						}
					}
				},
				tooltip:{
					x: {
						format: "yyyy/MM/dd HH:mm:ss.f"
					}
				},
				xaxis: {
					type: "datetime",
					range: props.range
				},
				yaxis: {
					labels:{
						formatter: val => val.toFixed(0)
					},
					title: {text: "Temperature"}
				}
			}
		}
	}

	render() {
		return (
		<div id="chart" >
			<Chart
				type="line"
				height="120"
				width="270"
				options={this.state.options}
				series={this.props.dataList}
			/>
		</div>
	  );
	}
  }

export default RealtimeLineChart;