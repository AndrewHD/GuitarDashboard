import { Component } from 'react';
import ReactSlider from 'react-slider';
import './Metronome.component.css';

class Metronome extends Component<MetronomeProps, any> {
	tempos: number[];	
	click: AudioBuffer;
	timer: any;
	audioCtx: AudioContext;
	nextNoteTime: number;
	
	constructor (props: MetronomeProps) {
		super(props);
		
		this.state = {
			position: 15,
			isActive: false,
			gain: 2
		}
		
		this.tempos = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60,
									 63, 66, 69, 72, 80, 84, 88, 92, 96, 100, 104,
									 108, 112, 116, 120, 126, 132, 138, 144, 152,
									 160, 168, 176, 184, 192, 200, 208]
		
		this.audioCtx = new AudioContext();
		this.click = this.audioCtx.createBuffer(2, 8640, 48000);
		fetch('audio/metronome.wav')
			.then(res => res.arrayBuffer())
			.then(data => this.audioCtx.decodeAudioData(data))
			.then(buffer => this.click = buffer);
		
		this.nextNoteTime = 0.0;
	}
		
	scheduleNote = (time: number) => {
		let clk = this.audioCtx.createBufferSource();
		let gain = this.audioCtx.createGain();
		clk.buffer = this.click;
		clk.connect(gain);
		gain.connect(this.audioCtx.destination);
		gain.gain.setValueAtTime(this.state.gain, time);
		clk.start(time);
		clk.stop(time + 0.05);
	};
		
	startMetronome = () => {
		this.setState({ isActive: true });
		this.nextNoteTime = this.audioCtx.currentTime;
		this.timer = setInterval(this.scheduler, 25);
	};
	
	stopMetronome = () => {
		this.setState({ isActive: false});
		clearInterval(this.timer);
	};
	
	slower = () => {
		if (this.state.position > 0) {
			this.setState({ position: this.state.position - 1 });
		}
	}
	
	faster = () => {
		if (this.state.position < this.tempos.length - 1) {
			this.setState({ position: this.state.position + 1 });
		}
	}
	
	lowerGain = () => {
		if (this.state.gain > 0) {
			this.setState({ gain: this.state.gain - 1 });
		}
	}
	
	raiseGain = () => {
		//if (this.state.gain < 1) {
			this.setState({ gain: this.state.gain + 1 })
		//}
	}
	
	scheduler = () => {
		while (this.nextNoteTime < this.audioCtx.currentTime + 0.1) {
			this.scheduleNote(this.nextNoteTime);
			const secPerBeat = 60.0 / this.tempos[this.state.position];
			this.nextNoteTime += secPerBeat;
		}
	}
	
	render() {
		let { position, isActive, gain } = this.state;
		let tempo = this.tempos[position];
		return (
			<div className="Metronome">
				<div className="Metronome-header">Metronome</div>
				<div className="Metronome-display">
					<div className="Metronome-field">
						<button onClick={this.slower}>&larr;</button>
						<span className="current-tempo">{tempo}</span>
						<button onClick={this.faster}>&rarr;</button>
					</div>
					{!isActive && (<button onClick={this.startMetronome}>Start</button>)}
					{isActive && (<button onClick={this.stopMetronome}>Stop</button>)}
					<ReactSlider
						value={gain}
						className="horizontal-slider"
						thumbClassName="slider-thumb"
						trackClassName="slider-track"
						max={10}
						step={0.1}
						onChange={(v,i) => this.setState({gain: v})}
					/>
				</div>
			</div>
		);
	}
}

type MetronomeProps = {
	tempos: number[];
}

export default Metronome;