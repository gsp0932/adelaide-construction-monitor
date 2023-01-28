import * as React from "react";
import Chart from 'react-apexcharts';

class RealtimeLineChart extends React.Component <any, any>{
	constructor(props: any) {
	  super(props);
	  this.state = {
			options: {
				chart: {
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					},
					animation:{
						easing: "linear",
						dynamicAnimation: {
							speed: 500
						}
					},
				},
				tooltip:{
					x: {
						format: "yyyy/MM/dd HH:mm:ss.f"
					}
				},
				xaxis: {
					type: "datetime",
					range: props.range,
					labels: {
						datetimeUTC: false											// ! IMPORTANT: default is true
					}
				},
				yaxis: {
					labels:{
						formatter: (val: any) => val.toFixed(0)
					},
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
				width="220"
				options={this.state.options}
				series={this.props.dataList}
			/>
		</div>
	  );
	}
  }

export default RealtimeLineChart;