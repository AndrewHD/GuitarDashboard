import { Component } from 'react';

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
			drone: false
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

	startDrone = () => {
		const { key, mode } = this.state;
		const third = [5/4, 6/5]
		const freqs = [0.5,1,third[mode],1.5,2,2 * third[mode],3];
		for (var i=0;i<freqs.length;i++) {
			let o = this.audioCtx.createOscillator();
			let g = this.audioCtx.createGain();
			o.frequency.value = freqs[i] * this.fund[key];
			o.connect(g);
			g.gain.value = 1/freqs.length
			g.connect(this.audioCtx.destination);
			o.start(0);
			this.oscs.push(o);
		}
		this.setState({ drone: true });
	}

	stopDrone = () => {
		for (var i=0;i<this.oscs.length;i++) {
			this.oscs[i].stop(0);
		}
		this.oscs = [];
		this.setState({ drone: false });
	}
	
	render() {
		let { key, mode, drone } = this.state;
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
			</div>
		)
	}
}

export default Keys;