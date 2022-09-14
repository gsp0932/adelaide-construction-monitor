import React, {Component} from "react";
import ReactDOM from "react";
import Chart from 'react-apexcharts';

class AChart extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  
		options: {
			chart: {
				id: "basic-bar"
				},
				toolbar: {
				show: false
				},
				zoom: {
				enabled: false
				},
				xaxis: {
					// type: 'datetime',
					// range: XAXISRANGE,
					categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
				},
			},
		series: [{
			//   data: data.slice()
			name: "series-1",
			data: [30,40,56,60,49,50,70,91]
		}],	
	  };
	}
	
	componentDidMount(){
		this.timerID = setInterval(()=>this.updateChart(),5000)
	}
	
			
	updateChart(){
		const newSeries = [];
		this.state.series.forEach((s)=>{
			const data = s.data.map(()=>{
				return Math.floor(Math.random() * (70 - 30 + 1) + 30);
			})
			newSeries.push({data: data})
		});
		
		this.setState({
			series: newSeries
		})
	}

  

	render() {
		return (
		<div id="chart">
			{/* <ApexChart options={this.state.options} series={this.state.series} type="line" height={350} /> */}
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="line"
				width="500"
			/>
		</div>


	  );
	}
  }

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);

export default AChart;