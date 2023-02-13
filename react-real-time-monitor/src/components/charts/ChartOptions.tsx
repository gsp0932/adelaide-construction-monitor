import { ApexOptions } from "apexcharts";
import moment from "moment";

// ------------------ DEVICE CARD CHARTS OPTIONS ------------------
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
							return val.toFixed(1).toString();
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
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#ff5e62'],
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},

		labels: [String.fromCodePoint(8451)],
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
						return val.toFixed(1).toString();
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
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'horizontal',
			shadeIntensity: 0.5,
			gradientToColors: ['#ABE5A1'],
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100]
		}
	},

	labels: ['%'],
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
						return val.toFixed(1).toString();
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
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'horizontal',
			shadeIntensity: 0.5,
			gradientToColors: ['#6B6B6B'],
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100]
		}
	},

	labels: ['dB(SPL)'],
}

export var multiPMsCustomAngleRadialChartOption : ApexOptions =
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
				fontSize: '15px',
			},
			
			
			total: {
				show: true,
				label: '\xB5g/m\xB3',
				fontSize: '11px',
				formatter: function (w) {
				// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
				return w.config.series[0] + ' / ' + w.config.series[1] + ' / ' + w.config.series[2]
				}
			}
			}
		}
		},
		labels: ['PM1', 'PM2.5', 'PM10'],
		
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'horizontal',
				shadeIntensity: 0.5,
				gradientToColors: ['#ff5e62'],
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
			}
		},
	
}

export var multiVibrationCustomAngleRadialChartOption : ApexOptions =
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
					fontSize: '15px',
				},
				total: {
					show: true,
					label: 'g',
					fontSize: '12px',
					formatter: function (w) {
					// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
					return w.config.series[0] + ' / ' + w.config.series[1]
					}
				}
				}
			},
		},

		labels: ['Horizontal', 'Vertical'],
	
}


export var soundRadialStroke : ApexOptions =
{
	grid: {
		padding: {
		 top: -25,
		 bottom: 0
		}
	},
	plotOptions: {
		radialBar: {
			startAngle: -90,
			endAngle: 90,
			dataLabels: {
				name: {
					fontSize: '12px',
					color: undefined,
					offsetY: 12
				},
				value: {
					offsetY: -20,
					fontSize: '22px',
					color: undefined,
					formatter: function(val) {
						return val.toString();
					}
				}
			}
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
				shade: 'dark',
				shadeIntensity: 0.15,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 65, 91]
		},
	},
	stroke: {
		dashArray: 4
	},
	labels: ['dB (SPL)'],
}

export var vibrationRadialStroke : ApexOptions =
{
	grid: {
		padding: {
		 top: -25,
		 bottom: 0
		}
	},
	plotOptions: {
		radialBar: {
			startAngle: -90,
			endAngle: 90,
			dataLabels: {
				name: {
					fontSize: '12px',
					color: undefined,
					offsetY: 12
				},
				value: {
					offsetY: -20,
					fontSize: '22px',
					color: undefined,
					formatter: function(val) {
						return val.toString();
					}
				}
			}
		}
	},
	fill: {
		type: 'gradient',
		gradient: {
				shade: 'dark',
				shadeIntensity: 0.15,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 65, 91]
		},
	},
	stroke: {
		dashArray: 4
	},
	labels: ['g'],
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