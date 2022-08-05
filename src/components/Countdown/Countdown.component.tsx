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
			mins: null,
			secs: null,
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
			alarmOn: false,
			timerStart: 0
		});
		clearInterval(this.timer);
	};
	
	handleChange = (event: any) => {
		let { mins, secs } = this.state;
		if (event.target.name === "mins") { mins = event.target.value; }
		if (event.target.name === "secs") { secs = event.target.value; }
		const newTime = (mins * 60000) + (secs * 1000);
		this.setState({
			mins: mins,
			secs: secs,
			timerTime: newTime,
			timerStart: newTime
		})
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
		const { timerOn, alarmOn, timerTime, timerStart, mins, secs } = this.state;
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
					{(timerOn === true || timerTime !== timerStart) && (
					<div className="Countdown-timer">
						{hr} : {min} : {sec}
					</div>
					)}
					{timerOn === false && alarmOn === false && (
					<div className="Countdown-btns">
						<input type="number" name="mins" min="0" onChange={this.handleChange} className="Countdown-input" placeholder="mm" id="mins" value={mins}/> :
						<input type="number" name="secs" min="0" max="59" onChange={this.handleChange} className="Countdown-input" placeholder="ss" id="secs" value={secs} /><br />
					</div>
					)}
				</div>
				{timerOn === false && alarmOn === false && (timerTime === timerStart || timerTime === 0) && (
					<button onClick={this.startTimer}>Start</button>
				)}
				{(timerOn === true || alarmOn === true) && (
					<button onClick={this.stopTimer}>Stop</button>
				)}
				{timerOn === false && timerTime !== 0 && timerTime !== timerStart && (
					<button onClick={this.startTimer}>Resume</button>
				)}
			</div>
		);
	}
}

type CountdownProps = {}

export default Countdown;