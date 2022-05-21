import { Component } from 'react';
import './App.css';

import Stopwatch from './components/Stopwatch/Stopwatch.component';
import Countdown from './components/Countdown/Countdown.component';
import Metronome from './components/Metronome/Metronome.component';

class App extends Component {
  render() {
	  return (
		<div className="App">
			<div className="CircleFifths">
				<a title="Just plain Bill, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Circle_of_fifths_deluxe_4.svg"><img width="512" alt="Circle of fifths deluxe 4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Circle_of_fifths_deluxe_4.svg/512px-Circle_of_fifths_deluxe_4.svg.png"></img></a>
			</div>
			<Metronome />
			<div className="Timers">
				<Stopwatch />
				<Countdown />
			</div>
		</div>
	  );
  }
}

export default App;
