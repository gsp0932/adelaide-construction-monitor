// import * as React from "react";
// import { ReactDOM  } from "react";
// export interface MyProps{
// }
// export interface MyState{
// 	date: any,
// 	timer: any
// }
// class Clock extends React.Component<MyProps, MyState>{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			date: new Date,
// 			timer: setInterval(()=>{},1000),
// 		}
// 	}
// 	componentDidMount(){
// 		this.timer = setInterval(
// 			() => this.tick(),1000)
// 	}
// 	componentWillUnmount() {
// 		clearInterval(this.timerID);
// 	}
// 	tick(){
// 		this.setState({date: new Date()})
// 	}
// 	render(){
// 		return (
// 		<div>
// 			<p>{this.state.date.toLocaleTimeString()}</p>
// 		</div>
// 	);}
// }
// export default Clock;
//# sourceMappingURL=Clock.js.map