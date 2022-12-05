import moment from "moment";

// ------------------ DEVICE CARD CHARTS OPTIONS ------------------
export var tempRadialChartOption =
	{
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
						offsetY: -9,
						show: true,
						color: '#888',
						fontSize: '12px'
					},
					value: {
						formatter: function(val) {
							return parseInt(val);
						},
						offsetY:0,
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
		stroke: {
			lineCap: 'round'
		},
		labels: [String.fromCodePoint(8451)],
}

export var humRadialChartOption =
{
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
					offsetY: -9,
					show: true,
					color: '#888',
					fontSize: '12px'
				},
				value: {
					formatter: function(val) {
						return parseInt(val);
					},
					offsetY:0,
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
	stroke: {
		lineCap: 'round'
	},
	labels: ['%'],
}

export var pmRadialChartOption =
{
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
					offsetY: -9,
					show: true,
					color: '#888',
					fontSize: '11px'
				},
				value: {
					formatter: function(val) {
						return parseInt(val);
					},
					offsetY:0,
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
	stroke: {
		lineCap: 'round'
	},
	labels: ['\xB5g/m\xB3'],
}

export var soundRadialStroke =
{
	grid: {
		padding: {
		 top: -25,
		 bottom: 0
		}
	},
	sparkline: {
		enabled: true
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
					formatter: function (val) {
						return val;
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

export var vibrationRadialStroke =
{
	grid: {
		padding: {
		 top: -25,
		 bottom: 0
		}
	},
	sparkline: {
		enabled: true
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
					formatter: function (val) {
						return val;
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