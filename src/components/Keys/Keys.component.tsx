import { Component } from 'react';

class Keys extends Component<null, any> {
	keys: string[];
	modes: string[];
	
	constructor(props: null) {
		super(props);
		
		this.keys = ['A','B♭','B','C','C♯','D','E','E♭','F','F♯','G','G♯'];
		this.modes = ['major','minor'];
		
		this.state = {
			key: Math.floor(Math.random() * (this.keys.length)),
			mode: Math.floor(Math.random() * (this.modes.length))
		}
	}
	
	reroll = () => {
		this.setState({
			key: Math.floor(Math.random() * (this.keys.length)),
			mode: Math.floor(Math.random() * (this.modes.length))
		});
	}
	
	render() {
		let { key, mode } = this.state;
		return (
			<div className="Keys">
				<div className="Keys-display">
					{this.keys[key]} {this.modes[mode]}
				</div>
				<button onClick={this.reroll}>Reroll</button>
			</div>
		)
	}
}

export default Keys;