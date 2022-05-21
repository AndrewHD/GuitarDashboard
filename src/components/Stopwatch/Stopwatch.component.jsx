import { Component } from 'react';

//import './Stopwatch.component.css';

class Stopwatch extends Component {
	state = {
		timerOn: false,
		timerStart: 0,
		timerTime: 0
	};
	
	startTimer = () => {
		this.setState({
			timerOn: true,
			timerTime: this.state.timerTime,
			timerStart: Date.now() - this.state.timerTime
		});
		this.timer = setInterval(() => {
			this.setState({
				timerTime: Date.now() - this.state.timerStart
			});
		}, 10)
	};
	
	stopTimer = () => {
		this.setState({ timerOn: false });
		clearInterval(this.timer);
	};
	
	resetTimer = () => {
		this.setState({
			timerStart: 0,
			timerTime: 0
		});
	};
	
	render() {
		const { timerTime } = this.state;
		let cs = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
		let sec = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
		let min = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
		let hr = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
		return (
			<div className="Stopwatch">
				<div className="Stopwatch-header">Stopwatch</div>
				<div className="Stopwatch-display">
					{hr} : {min} : {sec} : {cs}
				</div>
				{this.state.timerOn === false && this.state.timerTime === 0 && (
					<button onClick={this.startTimer}>Start</button>
				)}
				{this.state.timerOn === true && (
					<button onClick={this.stopTimer}>Stop</button>
				)}
				{this.state.timerOn === false && this.state.timerTime > 0 && (
					<button onClick={this.startTimer}>Resume</button>
				)}
				{this.state.timerOn === false && this.state.timerTime > 0 && (
					<button onClick={this.resetTimer}>Reset</button>
				)}
			</div>
		);
	}
}

export default Stopwatch;