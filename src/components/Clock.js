import React from "react";
import { ReactDOM  } from "react";

class Clock extends React.Component{
	constructor(props){
		super(props)
		this.state={
			date: new Date
		}
	}

	
	componentDidMount(){
		this.timer = setInterval(
			() => this.tick(),1000)
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	  
	tick(){
		this.setState({date: new Date()})
	}
	

	render(){
		return (
		<div>
			<p>{this.state.date.toLocaleTimeString()}</p>
		</div>
		
	);}
}

export default Clock;
