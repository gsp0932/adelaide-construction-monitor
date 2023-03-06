import * as React from 'react';
import ReactApexChart from 'react-apexcharts';

class BrushChart extends React.Component<any, any> {
	constructor(props: any) {
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
