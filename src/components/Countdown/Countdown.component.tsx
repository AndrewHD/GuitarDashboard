import { Component } from 'react';
import './Countdown.component.css';

var classNames = require('classnames');

class Countdown extends Component<CountdownProps, any> {
	audio: HTMLAudioElement;
	timer: any;

	constructor(props: CountdownProps) {
		super(props);
		
		this.state = {
			timerOn: false,
			alarmOn: false,
			timerStart: 0,
			timerTime: 0,
			timerDead: 0
		}
		
		this.audio = new Audio("audio/wind-chimes.mp3");
		this.audio.loop = true;
	}
	
	startTimer = () => {
		this.audio.play();
		this.audio.pause();
		this.setState({
			timerOn: true,
			timerDead: Date.now() + this.state.timerTime
		});
		this.timer = setInterval(() => {
			const newTime = this.state.timerDead - Date.now();
			if (newTime >= 0) {
				this.setState({
					timerTime: newTime
				});
			} else {
				clearInterval(this.timer);
				this.setState({
					timerOn: false,
					alarmOn: true,
					timerTime: 0
				});
				this.audio.play();
			}
		}, 10)
	};
	
	stopTimer = () => {
		if (this.state.alarmOn) { 
			this.audio.pause();
			this.audio.currentTime = 0;
		}
		this.setState({
			timerOn: false,
			alarmOn: false
		});
		clearInterval(this.timer);
	};
	
	clearTimer = () => {
		if (this.state.timerOn === false) {
			this.setState({ timerTime: 0 });
		}
	};
	
	adjustTimer = (input: string) => {
		const { timerOn } = this.state;
		let adjustment;
		if (!timerOn) {
			if (input === "5min") {adjustment = 300000; }
			else if (input === "3min") { adjustment = 180000; }
			else if (input === "10sec") { adjustment = 10000; }
			this.setState({
				timerTime: adjustment,
				timerStart: adjustment
			});
		}
	};

	render() {
		const { timerOn, alarmOn, timerTime, timerStart } = this.state;
		let sec = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
		let min = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
		let hr = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
		let displayClass = classNames({
			'Countdown': true,
			"AlarmRing": alarmOn
		});
		return (
			<div className={displayClass}>
				<div className="Countdown-header">Countdown</div>
				<div className="Countdown-display">
					<div className="Countdown-timer">
						{hr} : {min} : {sec}
					</div>
					<button onClick={() => this.adjustTimer("10sec")}>10 seconds</button>
					<button onClick={() => this.adjustTimer("3min")}>3 minutes</button>
					<button onClick={() => this.adjustTimer("5min")}>5 minutes</button>
				</div>
				{timerOn === false && timerTime === timerStart && (
					<button onClick={this.startTimer}>Start</button>
				)}
				{(timerOn === true || alarmOn === true) && (
					<button onClick={this.stopTimer}>Stop</button>
				)}
				{timerOn === false && timerTime !== 0 && timerTime !== timerStart && (
					<button onClick={this.startTimer}>Resume</button>
				)}
				{timerOn === false && timerTime > 0 && (
					<button onClick={this.clearTimer}>Clear</button>
				)}
			</div>
		);
	}
}

type CountdownProps = {}

export default Countdown;