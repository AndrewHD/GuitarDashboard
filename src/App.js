import { Component } from 'react';
import './App.css';

import Stopwatch from './components/Stopwatch/Stopwatch.component';
import Countdown from './components/Countdown/Countdown.component';
import Metronome from './components/Metronome/Metronome.component';
import ReactModal from 'react-modal';

class App extends Component {
	state = {
		showModal: false
	};
	
	handleOpenModal = () => {this.setState({ showModal: true });}
	handleCloseModal = () => {this.setState({ showModal: false });}
	
  render() {
	  return (
		<div className="App">
			<div className="CircleFifths">
				<a title="Just plain Bill, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Circle_of_fifths_deluxe_4.svg"><img width="512" alt="Circle of fifths deluxe 4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Circle_of_fifths_deluxe_4.svg/512px-Circle_of_fifths_deluxe_4.svg.png"></img></a>
			</div>
			<button id="showAbout" onClick={this.handleOpenModal}>?</button>
			<Metronome />
			<div className="Timers">
				<Stopwatch />
				<Countdown />
			</div>
			<ReactModal 
				isOpen={this.state.showModal}
				onRequestClose={this.handleCloseModal}
			>
				<h1>Guitar Dashboard</h1>
				<p>Made by <a href="https://andrewhd.net">Andy Hanson-Dvoracek</a></p>
				<h2>Sounds used</h2>
				<ul>
					<li>“Wind Chimes, A.wav” by InspectorJ (<a href="https://www.jshaw.co.uk">www.jshaw.co.uk</a>) of <a href="https://freesound.org">Freesound.org</a></li>
					<li>“Perc_MetronomeQuartz_Io” by LudwigMueller of <a href="https://freesound.org">Freesound.org</a></li>
				</ul>
				<button onClick={this.handleCloseModal}>Close</button>
			</ReactModal>
		</div>
	  );
  }
}

export default App;
