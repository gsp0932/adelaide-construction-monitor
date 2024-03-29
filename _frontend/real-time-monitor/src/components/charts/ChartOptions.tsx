import { ApexOptions } from "apexcharts";
import moment from "moment";

// ------------------ DEVICE CARD CHARTS OPTIONS ------------------
// Time range real-time chart
const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;

export var tempRadialChartOption : ApexOptions =
{
	plotOptions: {
		radialBar: {
			startAngle: 0,
			endAngle: 360,
				hollow: {
				margin: 0,
				size: '80%',
				background: '#fff',
				image: undefined,
				imageOffsetX: 0,
				imageOffsetY: 0,
				position: 'front',
			},
			track: {
				background: '#f2f2f2',
				strokeWidth: '150%',
				margin: 0, // margin is in pixels
			},
			dataLabels: {
				show: true,
				name: {
					offsetY: -9,
					show: true,
					color: '#888',
					fontSize: '12px'
				},
				value: {
					formatter: function(val) {
						return val.toFixed(2);
					},
					offsetY:0,
					color: '#111',
					fontSize: '20px',
					show: true,
					
				}
			}
		}
	},
	fill: {
		type: 'linear',
		colors: ['#ff5e62']
	},

	labels: [String.fromCodePoint(8451)],
}

export var tempRealtimeLinechartOption : ApexOptions =
{
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		},
		animations:{
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
		range: TIME_RANGE_IN_MILLISECONDS,
		labels: {
			datetimeUTC: false											// ! IMPORTANT: default is true
		}
	},
	yaxis: {
		labels:{
			formatter: (val: any) => val.toFixed(2)
		},
	},
	colors: ['#ff5e62']
}

export var humRadialChartOption : ApexOptions =
{
	plotOptions: {
		radialBar: {
			startAngle: 0,
			endAngle: 360,
				hollow: {
				margin: 0,
				size: '80%',
				background: '#fff',
				image: undefined,
				imageOffsetX: 0,
				imageOffsetY: 0,
				position: 'front',
			},
			track: {
				background: '#f2f2f2',
				strokeWidth: '150%',
				margin: 0, // margin is in pixels
			},
	
			dataLabels: {
				show: true,
				name: {
					offsetY: -9,
					show: true,
					color: '#888',
					fontSize: '12px'
				},
				value: {
					formatter: function(val) {
						return val.toFixed(2);
					},
					offsetY:0,
					color: '#111',
					fontSize: '20px',
					show: true,
				}
			}
		}
	},
	fill: {
		type: 'linear',
	},

	labels: ['%'],
}

export var humRealtimeLinechartOption : ApexOptions =
{
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		},
		animations:{
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
		range: TIME_RANGE_IN_MILLISECONDS,
		labels: {
			datetimeUTC: false											// ! IMPORTANT: default is true
		}
	},
	yaxis: {
		labels:{
			formatter: (val: any) => val.toFixed(2)
		},
	}
}

export var soundRadialChartOption : ApexOptions =
{
	plotOptions: {
		radialBar: {
			startAngle: 0,
			endAngle: 360,
				hollow: {
				margin: 0,
				size: '80%',
				background: '#fff',
				image: undefined,
				imageOffsetX: 0,
				imageOffsetY: 0,
				position: 'front',
			},
			track: {
				background: '#f2f2f2',
				strokeWidth: '150%',
				margin: 0, // margin is in pixels
			},
	
			dataLabels: {
				show: true,
				name: {
					offsetY: -9,
					show: true,
					color: '#888',
					fontSize: '11px'
				},
				value: {
					formatter: function(val) {
						return val.toFixed(2);
					},
					offsetY:0,
					color: '#111',
					fontSize: '20px',
					show: true,
				}
			}
		}
	},
	fill: {
		type: 'linear',
	},
	
	colors: ['#FFFF00'],

	labels: ['dB(SPL)'],
}

export var soundRealtimeLinechartOption : ApexOptions =
{
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		},
		animations:{
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
		range: TIME_RANGE_IN_MILLISECONDS,
		labels: {
			datetimeUTC: false											// ! IMPORTANT: default is true
		}
	},
	yaxis: {
		labels:{
			formatter: (val: any) => val.toFixed(2)
		},
	},
	colors: ['#FFFF00']
}

export var multiPMsRadialChartOption : ApexOptions =
{
	grid: {
		padding: {
		 top: -10,
		 bottom: 0
		}
	},
	chart: {
		height: 350,
		type: 'radialBar',
	},
	plotOptions: {
		radialBar: {
			track:{
				strokeWidth: '130',
				margin: 0,
				
			},
			
			dataLabels: {
			name: {
				offsetY: -9,
				fontSize: '20px',
			},
			
			value: {
				offsetY: 0,
				fontSize: '17px',
				fontWeight: 'bold',
				formatter: function (val) {
					return val.toFixed(1);
				}
			},
			
			
			total: {
				show: true,
				label: '\xB5g/m\xB3',
				fontSize: '11px',
				formatter: function (w) {
				// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
				return w.config.series[0] + ' / ' + w.config.series[1] + ' / ' + w.config.series[2]
				},
				color: '#808080'
			},
			}
		}
	},
		labels: ['PM1', 'PM2.5', 'PM10'],
		
		// colors:[ '#db3f36', '#ff8b3d', '#FFAA33']
		
}
export var multiPMsRealtimeLinechartOption : ApexOptions =
{
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		},
		animations:{
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
		range: TIME_RANGE_IN_MILLISECONDS,
		labels: {
			datetimeUTC: false											// ! IMPORTANT: default is true
		}
	},
	yaxis: {
		labels:{
			formatter: (val: any) => val.toFixed(2)
		},
	},
	// colors: ['#db3f36', '#ff8b3d', '#FFAA33']
}

export var multiVibrationsRadialChartOption : ApexOptions =
{
	grid: {
		padding: {
		 top: -10,
		 bottom: 0
		}
	},
	chart: {
		height: 350,
		type: 'radialBar',
		},
		plotOptions: {
			radialBar: {
				track:{
					strokeWidth: '120',
					margin: 0
				},
				dataLabels: {
				name: {
					offsetY: -9,
					fontSize: '20px',
				},
				value: {
					offsetY: 0,
					fontSize: '17px',
					fontWeight: 'bold',
					formatter: function (val) {
						return val.toFixed(1);
					}
				},
				total: {
					show: true,
					label: 'g',
					fontSize: '12px',
					formatter: function (w) {
					// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
					return w.config.series[0] + ' / ' + w.config.series[1]
					},
					color: '#808080'
				}
				}
			},
		},

		labels: ['Horizontal', 'Vertical'],
		
		colors: ['#A020F0', '#00FFFF']
	
}

export var multiVibrationsRealtimeLinechartOption : ApexOptions =
{
	chart: {
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		},
		animations:{
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
		range: TIME_RANGE_IN_MILLISECONDS,
		labels: {
			datetimeUTC: false											// ! IMPORTANT: default is true
		}
	},
	yaxis: {
		labels:{
			formatter: (val: any) => val.toFixed(2)
		},
	},
	colors: ['#00FFFF', '#A020F0']
}


// ------------------ DEVICE HISTORY CHARTS OPTIONS ------------------

export var tempHumPMBrushOption = {
	options: {
		chart: {
			id: 'chart1',
			type: 'column',
			height: 230,
			toolbar: {
				autoSelected: 'pan',
				show: false
			}
		},
		colors: ['#FF5349','#008FFB', '#FFA500'],
		stroke: {
			width: 3
		},
		dataLabels: {
			enabled: false
		},
		fill: {
			opacity: 1
		},
		markers: {
			size: 0
		},
		xaxis: {
			type: 'datetime'
		}
	},
	
	optionsLine: {
		chart: {
			id: 'chart2',
			height: 130,
			type: 'area',
			brush: {
				target: 'chart1',
				enabled: true
			},
			selection: {
				enabled: true,
				xaxis: {
					min:(moment().unix() - 60*1000),
					max: moment().unix()
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
	
}

export var vibAndSoundBrushOption = {
	options: {
		chart: {
			id: 'chart4',
			type: 'column',
			height: 30,
			toolbar: {
				autoSelected: 'pan',
				show: false
			}
		},
		colors: ['#00FFFF','#A020F0'],
		stroke: {
			width: 3
		},
		dataLabels: {
			enabled: false
		},
		fill: {
			opacity: 1
		},
		markers: {
			size: 0
		},
		xaxis: {
			type: 'datetime'
		}
	},
	
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
					min:(moment().unix() - 60*1000),
					max: moment().unix()
				}
			},
		},
		colors: ['#008FFB'],
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
	
}