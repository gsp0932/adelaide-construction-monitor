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
		labels: ['Celcius'],
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
	labels: ['Percent'],
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
	labels: ['mm'],
}

export var soundRadialStroke =
{
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
						return val + "db";
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
	labels: ['Decibel'],
}

export var vibrationRadialStroke =
{
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
						return val + "hz";
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
	labels: ['Hertz'],
}


