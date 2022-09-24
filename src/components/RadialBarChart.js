import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class RadialBarChart extends Component{
	constructor(props) {
	super(props);
	this.state ={
			options: {
				plotOptions: {
					radialBar: {
						startAngle: 0,
						endAngle: 360,
							hollow: {
							margin: 0,
							size: '70%',
							background: '#fff',
							image: undefined,
							imageOffsetX: 0,
							imageOffsetY: 0,
							position: 'front',
							dropShadow: {
								enabled: true,
								top: 3,
								left: 0,
								blur: 4,
								opacity: 0.24
							}
						},
						track: {
							background: '#fff',
							strokeWidth: '67%',
							margin: 0, // margin is in pixels
							dropShadow: {
								enabled: true,
								top: -3,
								left: 0,
								blur: 4,
								opacity: 0.35
							}
						},
				
						dataLabels: {
							show: true,
							name: {
								offsetY: -5,
								show: true,
								color: '#888',
								fontSize: '10px'
							},
							value: {
								formatter: function(val) {
									return parseInt(val);
								},
								offsetY:5,
								color: '#111',
								fontSize: '25px',
								show: true,
							}
						}
					}
				},
				fill: {
					type: 'gradient',
					gradient: {
						shade: 'dark',
						type: 'horizontal',
						shadeIntensity: 0.5,
						gradientToColors: ['#ABE5A1'],
						inverseColors: true,
						opacityFrom: 1,
						opacityTo: 1,
						stops: [-10, 80]
					}
				},
				stroke: {
					lineCap: 'round'
				},
				labels: ['Celcius'],
			},
		}
	}
		
	render(){
		return(
			<div id="chart">
				<ReactApexChart
					options={this.state.options}
					series={this.props.series}
					type="radialBar"
					height={120}
					width={80}
				/>
			</div>
		);
	}
}

export default RadialBarChart;

