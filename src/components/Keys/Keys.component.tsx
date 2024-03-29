import { Component } from 'react';
import ReactSlider from 'react-slider';

class Keys extends Component<null, any> {
	keys: string[];
	modes: string[];
	fund: number[];
	audioCtx: AudioContext;
	oscs: OscillatorNode[];
	
	constructor(props: null) {
		super(props);
		
		this.keys = ['A','B♭','B','C','C♯','D','E','E♭','F','F♯','G','G♯'];
		this.modes = ['major','minor'];
		this.fund = [220.0, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30];
		
		this.state = {
			key: Math.floor(Math.random() * (this.keys.length)),
			mode: Math.floor(Math.random() * (this.modes.length)),
			drone: false,
			gain: 0.5
		}

		this.audioCtx = new AudioContext();
		this.oscs = [];
	}
	
	reroll = () => {
		this.setState({
			key: Math.floor(Math.random() * (this.keys.length)),
			mode: Math.floor(Math.random() * (this.modes.length))
		});
		this.stopDrone();
	}

	makeOscs = () => {
		const { key, mode } = this.state;
		const third = [5/4, 6/5]
		const freqs = [0.5,1,third[mode],1.5,2,2 * third[mode],3];
		let m = this.audioCtx.createGain();
		m.gain.value = this.state.gain;
		for (var i=0;i<freqs.length;i++) {
			let o = this.audioCtx.createOscillator();
			let g = this.audioCtx.createGain();
			o.frequency.value = freqs[i] * this.fund[key];
			o.connect(g);
			g.gain.value = 1/freqs.length
			g.connect(m);
			o.start(0);
			this.oscs.push(o);
		}
		m.connect(this.audioCtx.destination);
	}
	
	killOscs = () => {
		for (var i=0;i<this.oscs.length;i++) {
			this.oscs[i].stop(0);
		}
		this.oscs = [];
	}
	
	startDrone = () => {
		this.setState({ drone: true });
	}

	stopDrone = () => {
		this.killOscs();
		this.setState({ drone: false });
	}
	
	lowerGain = () => {
		this.killOscs();
		if (this.state.gain > 0) {
			this.setState({ gain: (this.state.gain - 0.1).toFixed(1) });
		}
	}
	
	raiseGain = () => {
		if (this.state.gain < 1) {
			this.killOscs();
			let newGain = (parseFloat(this.state.gain) + 0.1).toFixed(1);
			this.setState({ gain: newGain });
		}
	}
	
	changeGain = (newGain: number) => {
		this.killOscs();
		this.setState({ gain: newGain });
	}
	
	render() {
		let { key, mode, drone, gain } = this.state;
		if (drone) { this.makeOscs(); }
		return (
			<div className="Keys">
				<div className="Keys-display">
					{this.keys[key]} {this.modes[mode]}
				</div>
				<button onClick={this.reroll}>Reroll</button>
				<div className="Drone-buttons">
					{!drone && (<button onClick={this.startDrone}>Start Drone</button>)}
					{drone && (<button onClick={this.stopDrone}>Stop Drone</button>)}
				</div>
				<ReactSlider
					value={gain}
					className="horizontal-slider"
					thumbClassName="slider-thumb"
					trackClassName="slider-track"
					max={0.7}
					step={0.1}
					onChange={(v,i) => this.changeGain(v)}
				/>
			</div>
		)
	}
}

export default Keys;